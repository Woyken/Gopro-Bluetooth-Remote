import {
	first,
	firstValueFrom,
	mergeMap,
	of,
	pipe,
	map,
	from,
	switchMap,
} from 'rxjs';
import {bluetoothDeviceState} from '~/store/goproBleServiceState';
import {convertMessageToPackets} from './convertMessageToPackets';
import {
	accumulatePacketsToMessage,
	fromCharacteristicEvent,
} from './accumulatePacketsToMessage';
import {parseMessageToCommandResponse} from './parseMessageToCommandResponse';

type Command = {
	commandId: number;
	commandData: Uint8Array | number[];
};

// In theory this might work, not tested
async function sendCommand(command: Command) {
	// TODO get command characteristic
	const {characteristics} = bluetoothDeviceState;
	if (!characteristics) throw new Error('no characteristics');
	const {commandCharacteristic, commandResponseCharacteristic} =
		characteristics;
	const response = await firstValueFrom(
		of(command).pipe(
			map((x) => ({
				packetData$: from([x.commandId, ...x.commandData]).pipe(
					convertMessageToPackets(),
				),
				response$: fromCharacteristicEvent(commandResponseCharacteristic).pipe(
					accumulatePacketsToMessage(),
					parseMessageToCommandResponse(),
					first((y) => y.commandId === command.commandId),
				),
			})),
			switchMap(async (x) => {
				// TODO retry send packet, if network error occurs...
				await firstValueFrom(x.packetData$.pipe(sendPacket(commandCharacteristic)));
				return x.response$;
			}),
		),
	);

	return response;
}

async function sendCommand0(command: Command) {
	// TODO get command characteristic
	const {characteristics} = bluetoothDeviceState;
	if (!characteristics) throw new Error('no characteristics');
	const {commandCharacteristic, commandResponseCharacteristic} =
		characteristics;
	//
	const responsePromise = firstValueFrom(
		fromCharacteristicEvent(commandResponseCharacteristic).pipe(
			accumulatePacketsToMessage(),
			parseMessageToCommandResponse(),
			first((y) => y.commandId === command.commandId),
		),
	);
	await firstValueFrom(
		of(command).pipe(
			switchMap((x) => [x.commandId, ...x.commandData]),
			convertMessageToPackets(),
			sendPacket(commandCharacteristic),
		),
	);

	return responsePromise;
}

function sendPacket(characteristic: BluetoothRemoteGATTCharacteristic) {
	return pipe(
		mergeMap(async (x: Uint8Array) => {
			await characteristic.writeValueWithoutResponse(x);
			return x;
		}),
	);
}
