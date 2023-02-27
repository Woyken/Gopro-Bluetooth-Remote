import { bufferCount, from, map, merge, skip, startWith, take, toArray } from 'rxjs';

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
