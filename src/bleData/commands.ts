import {of, pipe, switchMap} from 'rxjs';
import {parseAsSettings} from '~/utilities/definitions/goproTypes/settingsJson';
import {type CommandResponse} from './parseMessageToCommandResponse';
import {type Command, sendCommand} from './sendCommand';

function sendQueryCommand(command: Command) {
	return of(command).pipe(sendCommand());
}

export function querySettingsJson() {
	return sendQueryCommand({commandId: 3, commandData: []}).pipe(
		parseSettingsJsonResponse(),
	);
}

export function parseSettingsJsonResponse() {
	return pipe(
		switchMap(async (x: CommandResponse) => {
			const pako = await import('pako');
			const settingsJsonRaw = pako.inflate(Uint8Array.from(x.data));
			const settingsJson = String.fromCharCode(...settingsJsonRaw);
			return parseAsSettings(settingsJson);
		}),
	);
}
