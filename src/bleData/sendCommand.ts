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
} from 'rxjs';
import {bluetoothDeviceState} from '~/store/goproBleServiceState';
import {convertMessageToPackets} from './convertMessageToPackets';
import {
	accumulatePacketsToMessage,
	fromCharacteristicEvent,
} from './accumulatePacketsToMessage';
import {parseMessageToCommandResponse} from './parseMessageToCommandResponse';

export type Command = {
	commandId: number;
	commandData: Uint8Array | number[];
};

// In theory this might work, not tested
export function sendCommand() {
	// TODO get command characteristic
	const {characteristics} = bluetoothDeviceState;
	if (!characteristics) throw new Error('no characteristics');
	const {commandCharacteristic, commandResponseCharacteristic} =
		characteristics;

	return pipe(
		map((x: Command) => ({
			packetData$: from([x.commandId, ...x.commandData]).pipe(
				convertMessageToPackets(),
			),
			response$: fromCharacteristicEvent(commandResponseCharacteristic).pipe(
				accumulatePacketsToMessage(),
				parseMessageToCommandResponse(),
				first((y) => y.commandId === x.commandId),
			),
		})),
		switchMap(async (x) => {
			// TODO retry send packet, if network error occurs...
			await firstValueFrom(
				x.packetData$.pipe(sendPacket(commandCharacteristic)),
			);
			return x.response$;
		}),
		switchAll(),
	);
}

function sendPacket(characteristic: BluetoothRemoteGATTCharacteristic) {
	return pipe(
		mergeMap(async (x: Uint8Array) => {
			await characteristic.writeValueWithoutResponse(x);
			return x;
		}),
	);
}
