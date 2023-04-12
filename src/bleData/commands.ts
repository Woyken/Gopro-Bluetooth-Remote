import {filter, map, of, pipe, Subject, switchMap, tap} from 'rxjs';
import {from} from 'solid-js';
import {
	useCommandResponseCharacteristic,
	useCommandSendCharacteristic,
} from '~/bleCharacteristicsProvider';
import {createLogger} from '~/logging/createLogger';
import {parseAsSettings} from '~/utilities/definitions/goproTypes/settingsJson';
import {
	accumulatePacketsToMessage,
	filterNullish,
	fromCharacteristicEvent,
} from './accumulatePacketsToMessage';
import {
	parseMessageToCommandResponse,
	type CommandResponse,
} from './parseMessageToCommandResponse';
import {type Command, sendCommand} from './sendCommand';

export function createCommandSender() {
	const characteristic$ = useCommandSendCharacteristic();
	const subj = new Subject<Command>();
	const characteristicOnSend$ = subj.pipe(
		switchMap((command) =>
			characteristic$.pipe(
				filterNullish(),
				map((characteristic) => ({command, characteristic})),
			),
		),
		switchMap(({characteristic, command}) =>
			of(characteristic).pipe(sendCommand(command)),
		),
	);

	// This should subscribe to the observable
	from(characteristicOnSend$);

	return {
		sendCommand(command: Command) {
			subj.next(command);
		},
	};
}

export function characteristicToCommandResponse() {
	const logger = createLogger('[characteristicToCommandResponse]');
	return pipe(
		tap((x: BluetoothRemoteGATTCharacteristic) => {
			logger.log('[pipe]', x);
		}),
		// Tap((x) => {
		// 	logger.log('[filterNullish]', x);
		// }),
		fromCharacteristicEvent(),
		tap((x) => {
			logger.log('[fromCharacteristicEvent]', x);
		}),
		accumulatePacketsToMessage(),
		parseMessageToCommandResponse(),
	);
}

export function receiveCommandResponse(id: number) {
	const characteristic$ = useCommandResponseCharacteristic();
	return characteristic$.pipe(
		filterNullish(),
		characteristicToCommandResponse(),
		filter((y) => y.commandId === id),
	);
}

function useSendQueryCommand(command: Command) {
	const characteristic$ = useCommandSendCharacteristic();
	return characteristic$.pipe(filterNullish(), sendCommand(command));
}

export const commandQuerySettingsJson = {
	commandId: 0x3b,
	commandData: [],
} satisfies Command;

export const commandSleep = {
	commandId: 0x05,
	commandData: [],
	key: 'GPCAMERA_SLEEP',
} satisfies Command;

// export function useQuerySettingsJson() {
// 	const sender = createCommandSender();
// 	return useSendQueryCommand().pipe(parseSettingsJsonResponse());
// }

export function parseSettingsJsonResponse() {
	const logger = createLogger('[parseSettingsJsonResponse]');
	return pipe(
		switchMap(async (x: CommandResponse) => {
			logger.log('commandResponse', x);
			const pako = await import('pako');
			const settingsJsonRaw = pako.inflate(Uint8Array.from(x.data));
			const settingsJson = String.fromCharCode(...settingsJsonRaw);
			logger.log('settings json', settingsJson);
			return parseAsSettings(settingsJson);
		}),
	);
}
