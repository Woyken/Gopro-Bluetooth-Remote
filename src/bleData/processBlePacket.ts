import { bufferCount, filter, from, fromEvent, map, merge, mergeMap, Observable, OperatorFunction, pipe, scan, skip, startWith, take, tap, toArray, UnaryFunction } from 'rxjs';

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

type ProcessingMessageCompleted = {
    isCompleted: true;
    data: Uint8Array;
};
type ProcessingMessageInProgress = {
    isCompleted: false;
    expectedDataSize: number;
    nextContinuationIndex: number;
    incompleteData: Uint8Array;
};
type ProcessingMessage = ProcessingMessageInProgress | ProcessingMessageCompleted;

function parseCharacteristicEvent(characteristic: BluetoothRemoteGATTCharacteristic) {
    fromEvent(characteristic, 'characteristicvaluechanged').pipe(
        map((ev) => {
            const { value } = ev.target as BluetoothRemoteGATTCharacteristic;
            return value;
        }),
        filterNullish(),
        map((data) => {
            const header = parsePacketHeader(data);
            if (!header) return undefined;

            return {
                header,
                data: new Uint8Array(data.buffer).slice(header.headerSizeBytes),
            } as const;
        }),
        filterNullish(),
        // There must be a better way to accumulate packets into complete message than this
        scan((acc, curr) => {
            // remove already completed messages, they will be already sent through the pipe
            acc = acc.filter((x) => !x.isCompleted);

            if (curr.header.isStart) {
                if (curr.header.messageLength === curr.data.length) {
                    acc.push({ isCompleted: true, data: curr.data });
                    return acc;
                }
                acc.push({
                    isCompleted: false,
                    incompleteData: curr.data,
                    expectedDataSize: curr.header.messageLength,
                    nextContinuationIndex: 0,
                });
                return acc;
            }
            const continuationPacketHeader = curr.header;
            const existingEntryIndex = acc.findIndex((x) => {
                if (x.isCompleted) return false;
                if (x.nextContinuationIndex !== continuationPacketHeader.continuationIndex) return false;
                if (x.incompleteData.length + curr.data.length > x.expectedDataSize) return false;
                return true;
            });

            // TODO what to do with rogue packets? Currently just ignore them
            if (existingEntryIndex === -1) return acc;
            const existingEntry = acc[existingEntryIndex];
            if (!existingEntry) return acc;
            if (existingEntry.isCompleted) return acc;

            const mergedArray = new Uint8Array(existingEntry.incompleteData.length + curr.data.length);
            mergedArray.set(existingEntry.incompleteData);
            mergedArray.set(curr.data, existingEntry.incompleteData.length);

            if (mergedArray.length === existingEntry.expectedDataSize) {
                acc.splice(existingEntryIndex, 1);
                acc.push({ isCompleted: true, data: mergedArray });
                return acc;
            }

            existingEntry.incompleteData = mergedArray;
            existingEntry.nextContinuationIndex = (existingEntry.nextContinuationIndex + 1) % 16;
            return acc;
        }, [] as ProcessingMessage[]),
        map((v) => v.filter((x) => x.isCompleted).map((x) => x as ProcessingMessageCompleted)),
        mergeMap((v) => v)
    );
}
