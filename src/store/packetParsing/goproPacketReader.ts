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

    let timeoutHandle: number | undefined;

    function rescheduleTimeout() {
        cancelTimeout();
        timeoutHandle = window.setTimeout(() => {
            events.onError?.(new Error('Timeout'));
        }, 5000);
    }

    function cancelTimeout() {
        clearTimeout(timeoutHandle);
        timeoutHandle = undefined;
    }

    function sendEventIfReady() {
        if (packetDataAccumulated.length > expectedMessageLength)
            events.onError?.(new Error(`Did response messages get out of sync? Current length: ${packetDataAccumulated.length}, expected: ${expectedMessageLength}`));
        if (packetDataAccumulated.length === expectedMessageLength) {
            cancelTimeout();
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
        rescheduleTimeout();
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
    onExpectedPacketReceived?: (mergedPacketData: PacketData) => void;
    onExpectedPacketError?: (error: Error) => void;
}

function getStartPacketId(packet: Packet<StartPacketHeader>) {
    return packet.data[0] || throwExpression("Start packet doesn't have id as first byte");
}

function createPacketAccumulatorQueue(expectedId: number) {
    const accumulatorsQueue: ReturnType<typeof createPacketAccumulator>[] = [];
    const events: AccumulatorStoreEvents = {};

    function consumePacket(packet: Packet) {
        if (packet.header.isStart) {
            console.log('consume packet is start', expectedId, packet);
            const packetId = getStartPacketId(packet as Packet<StartPacketHeader>);
            console.log('consume packet packet id', packetId);
            if (accumulatorsQueue.length === 0) {
                console.log('consume packet queue is empty');
                // We're expecting initial packet with the expectedId
                if (packetId === expectedId) {
                    console.log('consume packet expected id');
                    // Our starting packet, add first accumulator to list
                    const accumulator = createPacketAccumulator(packet as Packet<StartPacketHeader>);
                    accumulatorsQueue.unshift(accumulator);
                    console.log('consume packet queue is empty, added accumulator');
                    accumulator.events.onPacketsAccumulated = (packetData) => {
                        console.log('expected packet accumulator, onPacketsAccumulated', packetData);
                        const i = accumulatorsQueue.findIndex((acc) => acc === accumulator);
                        if (i === -1) throw new Error('Accumulator got lost?');
                        accumulatorsQueue.splice(i, 1);
                        accumulator.events.onPacketsAccumulated = undefined;
                        accumulator.events.onError = undefined;
                        events.onExpectedPacketReceived?.(packetData);
                    };
                    accumulator.events.onError = (error) => {
                        console.log('expected packet accumulator, onError', error);
                        const i = accumulatorsQueue.findIndex((acc) => acc === accumulator);
                        if (i === -1) throw new Error('Accumulator got lost?');
                        accumulatorsQueue.splice(i, 1);
                        accumulator.events.onPacketsAccumulated = undefined;
                        accumulator.events.onError = undefined;
                        events.onExpectedPacketError?.(error);
                    };
                    return true;
                }
                // Not our starting packet, ignore
                return false;
            }
            // This is initial packet of some other command, it is the one for whom we'll be receiving events now, until it's finished.
            const accumulator = createPacketAccumulator(packet as Packet<StartPacketHeader>);
            accumulatorsQueue.unshift(accumulator);

            accumulator.events.onPacketsAccumulated = () => {
                // some other command response finished, remove it from the queue
                const i = accumulatorsQueue.findIndex((acc) => acc === accumulator);
                if (i === -1) throw new Error('Accumulator got lost?');
                accumulatorsQueue.splice(i, 1);
                accumulator.events.onPacketsAccumulated = undefined;
                accumulator.events.onError = undefined;
            };
            accumulator.events.onError = () => {
                // some other command response failed, this might have corrupted the response
                // remove it from the queue anyway... Let's hope for the best...
                const i = accumulatorsQueue.findIndex((acc) => acc === accumulator);
                if (i === -1) throw new Error('Accumulator got lost?');
                accumulatorsQueue.splice(i, 1);
                accumulator.events.onPacketsAccumulated = undefined;
                accumulator.events.onError = undefined;
            };
            return true;
        }
        return accumulatorsQueue[0]?.accumulatePacket(packet as Packet<ContinuationPacketHeader>) || false;
    }
    return {
        consumePacket,
        events,
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
            console.log('got expected packet, resolving', id, packetData);
            resolve(packetData);
            packetAccumulatorQueue.events.onExpectedPacketReceived = undefined;
            packetAccumulatorQueue.events.onExpectedPacketError = undefined;
        };
        packetAccumulatorQueue.events.onExpectedPacketError = (error) => {
            console.log('got expected packet error, rejecting', id, error);
            reject(error);
            packetAccumulatorQueue.events.onExpectedPacketReceived = undefined;
            packetAccumulatorQueue.events.onExpectedPacketError = undefined;
        };
    }).finally(() => {
        characteristicToListen.removeEventListener('characteristicvaluechanged', onEvent);
    });
}

// TODO
// currently there's no way to detect which command response timed out, since in theory we can be receiving multiple responses at the same time
// need a way to track if command has gotten a start packet at least.
// from a bunch of testing looks like they are using some sort of queue/stack system
// After start packet received, we'll receive all it's responses, previous one will wait until current one is processed
// Ex.
// send get settings json command
// receive "get settings json" start packet
// receive "get settings json" continuation packet x8
// send get device info command
// receive "get settings json" continuation packet x2
// receive "get device info" start packet
// receive "get device info" continuation packet x4 DONE
// receive "get settings json" continuation packet x2
// send get device info command
// receive "get settings json" continuation packet x2
// receive "get device info" start packet
// receive "get device info" continuation packet x4 DONE
// receive "get settings json" continuation packet x500 DONE
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
