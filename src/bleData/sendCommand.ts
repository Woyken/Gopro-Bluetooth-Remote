import {
	first,
	firstValueFrom,
	mergeMap,
	of,
	pipe,
	map,
	from,
	switchMap,
	switchAll,
	type Observable,
	isObservable,
	ObservedValueOf,
} from 'rxjs';
import {convertMessageToPackets} from './convertMessageToPackets';
import {
	accumulatePacketsToMessage,
	filterNullish,
	fromCharacteristicEvent,
} from './accumulatePacketsToMessage';
import {parseMessageToCommandResponse} from './parseMessageToCommandResponse';
import {
	type CommandSendResponseCharacteristics,
	useCommandSendAndResponseCharacteristics,
	useCommandResponseCharacteristic,
} from '~/bleCharacteristicsProvider';

export type Command = {
	commandId: number;
	commandData: Uint8Array | number[];
};

function commandResponseById(id: number) {
	return pipe(
		filterNullish(),
		fromCharacteristicEvent(),
		accumulatePacketsToMessage(),
		parseMessageToCommandResponse(),
		first((y) => y.commandId === id),
	);
}

// In theory this might work, not tested
export function sendCommand(command: Command) {
	const packetData$ = from([command.commandId, ...command.commandData]).pipe(
		convertMessageToPackets(),
	);

	return pipe(
		map((characteristics: CommandSendResponseCharacteristics) => ({
			response$: of(characteristics.responseCharacteristic).pipe(
				commandResponseById(command.commandId),
			),
			sendCharacteristic: characteristics.sendCharacteristic,
		})),
		switchMap(async (x) => {
			// TODO retry send packet, if network error occurs...
			await firstValueFrom(
				of(x.sendCharacteristic).pipe(sendPacket(packetData$)),
			);
			return x.response$;
		}),
		switchAll(),
	);
}

type MaybeObservable<T> = Observable<T> | T;
function toObservable<T>(maybeObs: MaybeObservable<T>) {
	if (isObservable(maybeObs)) return maybeObs;
	return of(maybeObs);
}

function sendPacket(data: MaybeObservable<Uint8Array>) {
	const data$ = toObservable(data);
	return pipe(
		mergeMap((characteristic: BluetoothRemoteGATTCharacteristic) =>
			data$.pipe(
				switchMap(async (x) => characteristic.writeValueWithoutResponse(x)),
				map(() => undefined),
			),
		),
	);
}
