import {
	filter,
	first,
	firstValueFrom,
	mergeMap,
	of,
	pipe,
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

function sendCommand(command: Command) {
	// TODO get command characteristic
	const {characteristics} = bluetoothDeviceState;
	if (!characteristics) throw new Error('no characteristics');
	const {commandCharacteristic, commandResponseCharacteristic} =
		characteristics;
	//
	void firstValueFrom(
		of(command).pipe(
			mergeMap((x) => {
                // TODO, how to split this command, start listening, and send request, then await the listening first response?
				fromCharacteristicEvent(commandResponseCharacteristic).pipe(
					accumulatePacketsToMessage(),
					parseMessageToCommandResponse(),
					first((y) => y.commandId === x.commandId),
				);
				const temp = 45; //
				return [x];
			}),
			switchMap((x) => [x.commandId, ...x.commandData]),
			convertMessageToPackets(),
			sendPacket(commandCharacteristic),
		),
	);
}

function sendPacket(characteristic: BluetoothRemoteGATTCharacteristic) {
	return pipe(
		mergeMap(async (x: Uint8Array) =>
			characteristic.writeValueWithoutResponse(x),
		),
	);
}
