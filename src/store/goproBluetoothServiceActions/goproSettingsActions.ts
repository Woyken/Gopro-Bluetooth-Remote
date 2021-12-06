import { bluetoothDeviceState } from 'store/goproBleServiceState';
import { functionQueue } from 'store/goproBluetoothSlice';
import { RootState } from 'store/store';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { SettingMetadata } from './goproSettingsMetadata';

type CommandData = number[];
export async function sendSettingCommand(commandData: CommandData) {
    await functionQueue(async () => {
        const { characteristics } = bluetoothDeviceState;
        if (!characteristics) throw new Error('no characteristics');
        const { settingsCharacteristic } = characteristics;
        await settingsCharacteristic.writeValue(new Uint8Array(commandData));
    }, sendSettingCommand);
}

export const setSettingValue = createAsyncThunk<void, { setting: SettingMetadata; valueId: number }, { state: RootState }>('goproSettings/setSettingValue', async (props) => {
    const commandData: number[] = [];
    commandData.push(props.setting.length + 2);
    commandData.push(props.setting.id);
    commandData.push(props.setting.length);
    for (let i = 0; i < props.setting.length; i++) {
        // eslint-disable-next-line no-bitwise
        commandData.push((props.valueId >> (i * 8)) & 0xff);
    }
    await sendSettingCommand(commandData);
});
