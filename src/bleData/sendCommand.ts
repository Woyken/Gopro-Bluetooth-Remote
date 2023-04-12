import {
	mergeMap,
	of,
	pipe,
	map,
	from,
	switchMap,
	type Observable,
	isObservable,
	tap,
} from 'rxjs';
import {convertMessageToPackets} from './convertMessageToPackets';
import {createLogger} from '~/logging/createLogger';

export type Command = {
	commandId: number;
	commandData: Uint8Array | number[];
	key?: string;
};

// In theory this might work, not tested
export function sendCommand(command: Command) {
	const logger = createLogger('[sendCommand]', command);
	const packetData$ = from([command.commandId, ...command.commandData]).pipe(
		convertMessageToPackets(),
		tap((x) => {
			logger.log('[Packet]', x);
		}),
	);

	return pipe(
		(sendCharacteristic$: Observable<BluetoothRemoteGATTCharacteristic>) =>
			sendCharacteristic$.pipe(sendPacket(packetData$)),
		// Map((sendCharacteristic: BluetoothRemoteGATTCharacteristic) => {
		// 	logger.log('[Before actual send map]', sendCharacteristic);
		// 	return {
		// 		response$: of(sendCharacteristic.responseCharacteristic).pipe(
		// 			commandResponseById(command.commandId),
		// 		),
		// 		sendCharacteristic: sendCharacteristic.sendCharacteristic,
		// 	};
		// }),
		// (x) =>
		// 	new Observable((subs) => {
		// 		const s = x.subscribe({
		// 			next(value) {
		// 				value.response$.subscribe((r) => {
		// 					logger.log('value.response$', r);
		// 					subs.next(r);
		// 				});
		// 				of(value.sendCharacteristic)
		// 					.pipe(sendPacket(packetData$))
		// 					.subscribe();
		// 			},
		// 			complete() {
		// 				subs.complete();
		// 			},
		// 			error(err) {
		// 				subs.error(err);
		// 			},
		// 		});
		// 		return () => {
		// 			//
		// 			s.unsubscribe();
		// 		};
		// 	}),
		// switchMap(async (x) => {
		// 	logger.log('[Before actual send]', x);
		// 	x.response$.subscribe((i) => {
		// 		logger.log('ssssssssssuuuuuuuuuuuuubbbbbbbb', i);
		// 	});
		// 	// TODO retry send packet, if network error occurs...
		// 	await firstValueFrom(
		// 		of(x.sendCharacteristic).pipe(sendPacket(packetData$)),
		// 	);
		// 	return x.response$;
		// }),
		// switchAll(),
		tap((x) => {
			logger.log('[tap after send]', x);
		}),
	);
}

type MaybeObservable<T> = Observable<T> | T;
function toObservable<T>(maybeObs: MaybeObservable<T>) {
	if (isObservable(maybeObs)) return maybeObs;
	return of(maybeObs);
}

function sendPacket(data: MaybeObservable<Uint8Array>) {
	const logger = createLogger('[sendPacket]', data);
	const data$ = toObservable(data);
	return pipe(
		tap((x: BluetoothRemoteGATTCharacteristic) => {
			logger.log('[init]', x);
		}),
		mergeMap((characteristic: BluetoothRemoteGATTCharacteristic) =>
			data$.pipe(
				switchMap(async (x) => {
					logger.log('before writeValueWithoutResponse', x);
					try {
						await characteristic.writeValue(x);
					} catch (error) {
						debugger;
						throw error;
					}

					logger.log('after writeValueWithoutResponse', x);
				}),
				tap((x) => {
					logger.log('[after switchMap]', x);
				}),
				map(() => undefined),
			),
		),
	);
}
