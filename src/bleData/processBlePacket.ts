import { bufferCount, filter, from, fromEvent, map, merge, Observable, OperatorFunction, pipe, skip, startWith, take, tap, toArray, UnaryFunction } from 'rxjs';

function getPacketHeaderForChunkData(chunkIndex: number) {
    // Not the first chunk, header will be smaller
    // eslint-disable-next-line no-bitwise -- binary data manipulation
    return 0b10000000 + (chunkIndex & 0b00001111);
}

function getPacketHeaderForFirstChunkData(dataLength: number) {
    // First chunk, append header to the beginning
    // eslint-disable-next-line no-bitwise -- binary data manipulation
    if (dataLength <= 0x1f) return [dataLength & 0b00011111] as const;
    // eslint-disable-next-line no-bitwise -- binary data manipulation
    if (dataLength <= 0x1fff) return [0b00100000 + ((dataLength >> 8) & 0b00011111), dataLength & 0b11111111] as const;
    // eslint-disable-next-line no-bitwise -- binary data manipulation
    if (dataLength <= 0xffff) return [0b01000000, (dataLength >> 8) & 0b11111111, dataLength & 0b11111111] as const;

    throw new Error('data length too large');
}

export function processBleDataToPackets(data: number[]) {
    const dataWithInitialHeader = from(data).pipe(startWith(...getPacketHeaderForFirstChunkData(data.length)));
    const initialPacket = dataWithInitialHeader.pipe(take(20), toArray());
    const continuationPackets = dataWithInitialHeader.pipe(
        skip(20),
        bufferCount(19),
        map((chunkData, chunkIndex) => [getPacketHeaderForChunkData(chunkIndex), ...chunkData]) // check if need to increase chunk index by 1
    );
    return merge(initialPacket, continuationPackets);
}

const startPacketHeaderTypes = {
    general: 0b00,
    extended13bit: 0b01,
    extended16bit: 0b10,
    reserved: 0b11,
} as const;

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

export function parsePacketHeader(data: DataView): PacketHeader | undefined {
    if (data.byteLength < 1) return undefined;
    const byte1 = data.getUint8(0);
    let headerSizeBytes = 1;
    // eslint-disable-next-line no-bitwise -- binary data manipulation
    const isStart = (byte1 & 0b10000000) >> 7 === 0b0;
    if (!isStart) {
        // Continuation packet
        // eslint-disable-next-line no-bitwise -- binary data manipulation
        const continuationIndex = byte1 & 0b01111111;
        return {
            isStart: false,
            headerSizeBytes: 1,
            continuationIndex,
        } as const;
    }
    // eslint-disable-next-line no-bitwise -- binary data manipulation
    const startHeaderType = (byte1 & 0b01100000) >> 5;
    let messageLength: number;
    if (startHeaderType === startPacketHeaderTypes.general) {
        // eslint-disable-next-line no-bitwise -- binary data manipulation
        messageLength = byte1 & 0b00011111;
    } else if (startHeaderType === startPacketHeaderTypes.extended13bit) {
        headerSizeBytes = 2;
        if (data.byteLength < 2) return undefined;
        const byte2 = data.getUint8(1);
        // eslint-disable-next-line no-bitwise -- binary data manipulation
        messageLength = ((byte1 & 0b00011111) << 8) | byte2;
    } else if (startHeaderType === startPacketHeaderTypes.extended16bit) {
        headerSizeBytes = 3;
        if (data.byteLength < 3) return undefined;
        const byte2 = data.getUint8(1);
        const byte3 = data.getUint8(2);
        // eslint-disable-next-line no-bitwise -- binary data manipulation
        messageLength = (byte2 << 8) | byte3;
    } else if (startHeaderType === startPacketHeaderTypes.reserved) {
        // Reserved, not used, not sure what to do
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

function filterNullish<T>(): UnaryFunction<Observable<T | null | undefined>, Observable<T>> {
    return pipe(filter((x) => x != null) as OperatorFunction<T | null | undefined, T>);
}

function parseCharacteristicEvent(characteristic: BluetoothRemoteGATTCharacteristic) {
    fromEvent(characteristic, 'characteristicvaluechanged').pipe(
        map((ev) => {
            const { value } = ev.target as BluetoothRemoteGATTCharacteristic;
            return value;
        }),
        filterNullish(),
        map((data) => {
            if (data.byteLength < 1) return undefined;
            const header = parsePacketHeader(data);
            if (!header) return undefined;

            return {
                header,
                data: new Uint8Array(data.buffer).slice(header.headerSizeBytes),
            };
        })
    );
}
