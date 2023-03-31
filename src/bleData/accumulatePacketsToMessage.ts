import {
	filter,
	fromEvent,
	map,
	mergeMap,
	type Observable,
	pipe,
	scan,
	type UnaryFunction,
} from 'rxjs';

const startPacketHeaderTypes = {
	general: 0b00,
	extended13bit: 0b01,
	extended16bit: 0b10,
	reserved: 0b11,
} as const;

type StartPacketHeader = {
	isStart: true;
	headerSizeBytes: number;
	messageLength: number;
};

type ContinuationPacketHeader = {
	isStart: false;
	headerSizeBytes: 1;
	continuationIndex: number;
};

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

function filterNullish<T>(): UnaryFunction<
	Observable<T | undefined>,
	Observable<T>
> {
	return pipe(
		filter((x) => x !== undefined),
		map((x) => x as NonNullable<typeof x>),
	);
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
type ProcessingMessage =
	| ProcessingMessageInProgress
	| ProcessingMessageCompleted;

export function accumulatePacketsToMessage() {
	return pipe(
		map((data: DataView) => {
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
			// Remove already completed messages, they will be already sent through the pipe
			acc = acc.filter((x) => !x.isCompleted);

			if (curr.header.isStart) {
				if (curr.header.messageLength === curr.data.length) {
					acc.push({isCompleted: true, data: curr.data});
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
				if (
					x.nextContinuationIndex !== continuationPacketHeader.continuationIndex
				)
					return false;
				if (x.incompleteData.length + curr.data.length > x.expectedDataSize)
					return false;
				return true;
			});

			// TODO what to do with rogue packets? Currently just ignore them
			if (existingEntryIndex === -1) return acc;
			const existingEntry = acc[existingEntryIndex];
			if (!existingEntry) return acc;
			if (existingEntry.isCompleted) return acc;

			const mergedArray = new Uint8Array(
				existingEntry.incompleteData.length + curr.data.length,
			);
			mergedArray.set(existingEntry.incompleteData);
			mergedArray.set(curr.data, existingEntry.incompleteData.length);

			if (mergedArray.length === existingEntry.expectedDataSize) {
				acc.splice(existingEntryIndex, 1);
				acc.push({isCompleted: true, data: mergedArray});
				return acc;
			}

			existingEntry.incompleteData = mergedArray;
			existingEntry.nextContinuationIndex =
				(existingEntry.nextContinuationIndex + 1) % 16;
			return acc;
		}, [] as ProcessingMessage[]),
		map((v) =>
			v.filter((x): x is typeof x & {isCompleted: true} => x.isCompleted),
		),
		mergeMap((v) => v),
	);
}

export function fromCharacteristicEvent(
	characteristic: BluetoothRemoteGATTCharacteristic,
) {
	fromEvent(characteristic, 'characteristicvaluechanged').pipe(
		map((ev) => {
			const {value} = ev.target as BluetoothRemoteGATTCharacteristic;
			return value;
		}),
		filterNullish(),
	);
}
