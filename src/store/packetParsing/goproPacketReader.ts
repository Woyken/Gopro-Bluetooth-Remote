import { toast } from 'react-toastify';

export type PacketData = number[];

type PacketDataReceiver = (response: PacketData) => void;

export function goproBlePacketDataReaderProvider(onPacket: PacketDataReceiver) {
    let packetDataAccumulator: number[] = [];
    let messageLength = 0;
    return (ev: Event) => {
        const characteristic = ev.target as BluetoothRemoteGATTCharacteristic;
        async function tryParsingSinglePacket(): Promise<PacketData | undefined> {
            const { value } = characteristic;
            if (!value) {
                throw new Error('This should not be possible, empty response value');
            }
            const packet = readSinglePacket(value);
            if (packet.header.isStart) {
                messageLength = packet.header.messageLength;
                packetDataAccumulator = packet.data;
            } else {
                // TODO consider using continuationIndex
                packetDataAccumulator.push(...packet.data);
            }
            if (packetDataAccumulator.length === messageLength) {
                // Message complete, last packet, return concatenated data
                return packetDataAccumulator;
            }
            if (packetDataAccumulator.length > messageLength) throw new Error('Did response messages get out of sync?');
            return undefined;
        }
        tryParsingSinglePacket()
            .then((packetData) => {
                if (!packetData) return;
                onPacket(packetData);
                console.log('packet dump', packetData);
            })
            .catch((error) => {
                // dispatch()
                toast(`Error while parsing response message ${error}`);
            });
    };
}

function readSinglePacket(value: DataView) {
    const packetHeader = parsePacketHeader(value);
    const data = Array.from(new Uint8Array(value.buffer)).slice(packetHeader.headerSizeBytes);
    return { header: packetHeader, data };
}

function parsePacketHeader(data: DataView) {
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
