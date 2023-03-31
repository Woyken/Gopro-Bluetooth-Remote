import {
	bufferCount,
	from,
	map,
	merge,
	type Observable,
	pipe,
	skip,
	take,
	toArray,
	type UnaryFunction,
	switchMap,
} from 'rxjs';

function getPacketHeaderForChunkData(chunkIndex: number) {
	// Not the first chunk, header will be smaller
	// eslint-disable-next-line no-bitwise -- binary data manipulation
	return 0b10000000 + (chunkIndex & 0b00001111);
}

function getPacketHeaderForFirstChunkData(dataLength: number) {
	// First chunk, append header to the beginning
	// eslint-disable-next-line no-bitwise -- binary data manipulation
	if (dataLength <= 0x1f) return [dataLength & 0b00011111] as const;
	if (dataLength <= 0x1fff)
		return [
			// eslint-disable-next-line no-bitwise -- binary data manipulation
			0b00100000 + ((dataLength >> 8) & 0b00011111),
			// eslint-disable-next-line no-bitwise -- binary data manipulation
			dataLength & 0b11111111,
		] as const;

	if (dataLength <= 0xffff)
		return [
			0b01000000,
			// eslint-disable-next-line no-bitwise -- binary data manipulation
			(dataLength >> 8) & 0b11111111,
			// eslint-disable-next-line no-bitwise -- binary data manipulation
			dataLength & 0b11111111,
		] as const;

	throw new Error('data length too large');
}

export function convertMessageToPackets(): UnaryFunction<
	Observable<number>,
	Observable<Uint8Array>
> {
	return pipe(
		map((x: number) => x),
		toArray(),
		map((x) => [...getPacketHeaderForFirstChunkData(x.length), ...x]),
		switchMap((x) =>
			merge(
				from(x).pipe(take(20), toArray()),
				from(x).pipe(
					skip(20),
					bufferCount(19),
					map((chunkData, chunkIndex) => [
						getPacketHeaderForChunkData(chunkIndex),
						...chunkData,
					]), // Check if need to increase chunk index by 1
				),
			),
		),
		map((x) => new Uint8Array(x)),
	);
}
