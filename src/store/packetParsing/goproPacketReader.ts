import { toast } from 'react-toastify';
import { throwExpression } from 'utilities/throwExpression';

export type PacketData = number[];

type PacketDataReceiver = (response: PacketData) => void;

interface AccumulatorEvents {
    onPacketsAccumulated?: (mergedPacketData: PacketData) => void;
    onError?: (error: Error) => void;
}

function createPacketAccumulator(startPacket: Packet<StartPacketHeader>) {
    let packetDataAccumulated: number[] = startPacket.data;
    const expectedMessageLength = startPacket.header.messageLength;
    let nextExpectedContinuationIndex = 0;
    const events: AccumulatorEvents = {};

    function sendEventIfReady() {
        if (packetDataAccumulated.length > expectedMessageLength) {
            events.onError?.(new Error(`Did response messages get out of sync? Current length: ${packetDataAccumulated.length}, expected: ${expectedMessageLength}`));
            throw new Error('Did response messages get out of sync?');
        }
        if (packetDataAccumulated.length === expectedMessageLength) {
            if (!events.onPacketsAccumulated) throw new Error('Packet accumulator event not registered?');
            events.onPacketsAccumulated(packetDataAccumulated);
        }
    }

    Promise.resolve().then(() => {
        // Give consumer opportunity to register event handler
        sendEventIfReady();
    });

    function checkIfPacketIsExpected(packet: Packet<ContinuationPacketHeader>) {
        return packet.header.continuationIndex === nextExpectedContinuationIndex;
    }

    function accumulatePacket(packet: Packet<ContinuationPacketHeader>) {
        if (!checkIfPacketIsExpected(packet)) return false;
        packetDataAccumulated = packetDataAccumulated.concat(packet.data);
        sendEventIfReady();
        nextExpectedContinuationIndex++;
        if (nextExpectedContinuationIndex > 15) nextExpectedContinuationIndex = 0;
        return true;
    }

    return {
        accumulatePacket,
        events,
    };
}

interface AccumulatorStoreEvents {
    // onExpectedPacketStartReceived?: (packetData: PacketData) => void;
    onExpectedPacketReceived?: (mergedPacketData: PacketData) => void;
    onExpectedPacketError?: (error: Error) => void;
}

function getStartPacketId(packet: Packet<StartPacketHeader>) {
    return packet.data[0] || throwExpression("Start packet doesn't have id as first byte");
}

/**
 * This queue only starts acting when it received start packet with expected id
 * Stops and emits event when it receives finished expected packet
 */
function createPacketAccumulatorQueue(expectedId: number) {
    const accumulatorsQueue: ReturnType<typeof createPacketAccumulator>[] = [];
    const events: AccumulatorStoreEvents = {};

    function cleanupAccumulatorEvents(acc: ReturnType<typeof createPacketAccumulator>) {
        acc.events.onPacketsAccumulated = undefined;
        acc.events.onError = undefined;
    }

    function removeAccumulator(acc: ReturnType<typeof createPacketAccumulator>) {
        cleanupAccumulatorEvents(acc);
        const i = accumulatorsQueue.findIndex((a) => a === acc);
        if (i === -1) throw new Error('Accumulator got lost?');
        accumulatorsQueue.splice(i, 1);
    }

    function dispatchSuccessEvent(packetData: PacketData) {
        events.onExpectedPacketReceived?.(packetData);
        cancelPacketFlowTimeout();
    }

    function dispatchErrorEvent(error: Error) {
        events.onExpectedPacketError?.(error);
    }

    // If we don't receive starting packet within 10 seconds, consider command lost
    const startPacketTimeoutHandle: number | undefined = window.setTimeout(() => {
        dispose();
    }, 10000);

    // If packets stop flowing at all, probably connection dropped or something like that
    let packetFlowTimeoutHandle: number | undefined;

    function reschedulePacketFlowTimeout() {
        cancelPacketFlowTimeout();
        // Will be reset after each received packet, if packets are flowing, we expect to receive our expected one
        packetFlowTimeoutHandle = window.setTimeout(() => {
            events.onExpectedPacketError?.(new Error('Timeout, did not receive any more packets for a while'));
        }, 5000);
    }

    function cancelPacketFlowTimeout() {
        window.clearTimeout(packetFlowTimeoutHandle);
        packetFlowTimeoutHandle = undefined;
    }

    function consumePacket(packet: Packet) {
        reschedulePacketFlowTimeout();
        if (packet.header.isStart) {
            const packetId = getStartPacketId(packet as Packet<StartPacketHeader>);
            if (accumulatorsQueue.length === 0) {
                // We're expecting initial packet with the expectedId
                if (packetId === expectedId) {
                    // Start packet received, clear timeout
                    window.clearTimeout(startPacketTimeoutHandle);

                    // Our starting packet, add first accumulator to list
                    const accumulator = createPacketAccumulator(packet as Packet<StartPacketHeader>);
                    accumulatorsQueue.unshift(accumulator);
                    accumulator.events.onPacketsAccumulated = (packetData) => {
                        removeAccumulator(accumulator);
                        dispatchSuccessEvent(packetData);
                    };
                    accumulator.events.onError = (error) => {
                        removeAccumulator(accumulator);
                        dispatchErrorEvent(error);
                    };
                    return true;
                }
                // Not our starting packet, ignore
                return false;
            }
            // This is initial packet of some other command, it is the one for whom we'll be receiving events from now on till it's finished.
            const accumulator = createPacketAccumulator(packet as Packet<StartPacketHeader>);
            accumulatorsQueue.unshift(accumulator);

            accumulator.events.onPacketsAccumulated = () => {
                // some other command response finished, remove it from the queue
                removeAccumulator(accumulator);
            };
            accumulator.events.onError = () => {
                // some other command response failed, this might have corrupted the response
                // remove it from the queue anyway... Let's hope for the best...
                removeAccumulator(accumulator);
            };
            return true;
        }
        if (accumulatorsQueue.length === 0) return false;
        return accumulatorsQueue[0]?.accumulatePacket(packet as Packet<ContinuationPacketHeader>) || false;
    }

    function dispose() {
        accumulatorsQueue.forEach(cleanupAccumulatorEvents);
        accumulatorsQueue.length = 0;
        events.onExpectedPacketError?.(new Error('Disposed'));
    }

    return {
        consumePacket,
        events,
        dispose,
    };
}

export async function waitForPacketById(characteristicToListen: BluetoothRemoteGATTCharacteristic, id: number) {
    // Create a packet accumulator queue, where latest one is active
    const packetAccumulatorQueue = createPacketAccumulatorQueue(id);

    const onEvent = (ev: Event) => {
        const characteristic = ev.target as BluetoothRemoteGATTCharacteristic;
        const { value } = characteristic;
        if (!value) {
            toast.error('This should not be possible, empty response value');
            return;
        }
        try {
            const packet = readSinglePacket(value);
            packetAccumulatorQueue.consumePacket(packet);
        } catch (error) {
            toast.error(`Error while parsing response message ${error}`);
        }
    };
    characteristicToListen.addEventListener('characteristicvaluechanged', onEvent);
    console.log('registering listener for characteristic, waiting for packet with id', id);
    return new Promise<PacketData>((resolve, reject) => {
        packetAccumulatorQueue.events.onExpectedPacketReceived = (packetData) => {
            console.log('got expected packet, resolving id ', id, ' with data ', packetData);
            resolve(packetData);
            packetAccumulatorQueue.events.onExpectedPacketReceived = undefined;
            packetAccumulatorQueue.events.onExpectedPacketError = undefined;
        };
        packetAccumulatorQueue.events.onExpectedPacketError = (error) => {
            console.error('got expected packet error, rejecting id ', id, ' error ', error);
            reject(error);
            packetAccumulatorQueue.events.onExpectedPacketReceived = undefined;
            packetAccumulatorQueue.events.onExpectedPacketError = undefined;
        };
    }).finally(() => {
        characteristicToListen.removeEventListener('characteristicvaluechanged', onEvent);
    });
}

function createPacketAccumulatorStore() {
    const events: AccumulatorStoreEvents = {};
    const activePacketAccumulators: ReturnType<typeof createPacketAccumulator>[] = [];

    function consumePacket(packet: Packet) {
        if (packet.header.isStart) {
            const accumulator = createPacketAccumulator(packet as Packet<StartPacketHeader>);
            accumulator.events.onPacketsAccumulated = (packetData) => {
                events.onExpectedPacketReceived?.(packetData);
                const i = activePacketAccumulators.findIndex((acc) => acc === accumulator);
                if (i === -1) throw new Error('Accumulator got lost?');
                activePacketAccumulators.splice(i, 1);
                accumulator.events.onPacketsAccumulated = undefined;
                accumulator.events.onError = undefined;
            };
            accumulator.events.onError = (_) => {
                accumulator.events.onPacketsAccumulated = undefined;
                accumulator.events.onError = undefined;
            };
            activePacketAccumulators.push(accumulator);
            return true;
        }
        return activePacketAccumulators.map((accumulator) => accumulator.accumulatePacket(packet as Packet<ContinuationPacketHeader>)).some((acc) => acc);
    }

    return {
        events,
        consumePacket,
    };
}

export function packetReaderProvider(onPacket: PacketDataReceiver) {
    const accumulators = createPacketAccumulatorStore();
    accumulators.events.onExpectedPacketReceived = (mergedPacketData) => {
        onPacket(mergedPacketData);
        console.log('packet dump', mergedPacketData);
    };

    return (ev: Event) => {
        const characteristic = ev.target as BluetoothRemoteGATTCharacteristic;
        const { value } = characteristic;
        if (!value) {
            toast.error('This should not be possible, empty response value');
            return;
        }
        try {
            const packet = readSinglePacket(value);
            if (!accumulators.consumePacket(packet)) {
                toast.error('Failed to consume packet :(');
            }
        } catch (error) {
            toast.error(`Error while parsing response message ${error}`);
        }
    };
}

interface Packet<T extends PacketHeader = PacketHeader> {
    header: T;
    data: number[];
}

function readSinglePacket(value: DataView): Packet {
    const packetHeader = parsePacketHeader(value);
    const data = Array.from(new Uint8Array(value.buffer)).slice(packetHeader.headerSizeBytes);
    return { header: packetHeader, data } as const;
}

interface StartPacketHeader {
    isStart: true;
    headerSizeBytes: number;
    messageLength: number;
}

interface ContinuationPacketHeader {
    isStart: false;
    headerSizeBytes: 1;
    continuationIndex: number;
}

type PacketHeader = StartPacketHeader | ContinuationPacketHeader;

function parsePacketHeader(data: DataView): PacketHeader {
    const byte1 = data.getUint8(0);
    let headerSizeBytes = 1;
    // eslint-disable-next-line no-bitwise
    const isStart = (byte1 & 0b10000000) >> 7 === 0b0;
    if (!isStart) {
        // Continuation packet
        // eslint-disable-next-line no-bitwise
        const continuationIndex = byte1 & 0b01111111;
        return {
            isStart: false,
            headerSizeBytes: 1,
            continuationIndex,
        } as const;
    }
    // eslint-disable-next-line no-bitwise
    const startType = (byte1 & 0b01100000) >> 5;
    let messageLength: number;
    if (startType === 0b00) {
        // eslint-disable-next-line no-bitwise
        messageLength = byte1 & 0b00011111;
    } else if (startType === 0b01) {
        headerSizeBytes = 2;
        const byte2 = data.getUint8(1);
        // eslint-disable-next-line no-bitwise
        messageLength = ((byte1 & 0b00011111) << 8) | byte2;
    } else if (startType === 0b10) {
        headerSizeBytes = 3;
        const byte2 = data.getUint8(1);
        const byte3 = data.getUint8(2);
        // eslint-disable-next-line no-bitwise
        messageLength = (byte2 << 8) | byte3;
    } else if (startType === 0b11) {
        messageLength = 0;
    } else {
        throw new Error('IMPOSSIBLE');
    }
    return {
        isStart: true,
        headerSizeBytes,
        messageLength,
    } as const;
}
