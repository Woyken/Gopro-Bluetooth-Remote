import { bluetoothDeviceState } from 'store/goproBleServiceState';
import { RootState } from 'store/store';
import { functionQueueProvider } from 'utilities/functionQueue';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { allKnownSettings } from '../goproSettingsMetadata';

type CommandData = number[];
const functionQueue = functionQueueProvider();
export async function sendSettingCommand(commandData: CommandData) {
    await functionQueue(async () => {
        const { characteristics } = bluetoothDeviceState;
        if (!characteristics) throw new Error('no characteristics');
        const { settingsCharacteristic } = characteristics;
        await settingsCharacteristic.writeValue(new Uint8Array(commandData));
    }, sendSettingCommand);
}

function getByteLength(data: number) {
    let i = 0;
    while (data > 0) {
        i++;
        data /= 0x100;
    }
    return i;
}

export const setSettingValueCommand = createAsyncThunk<void, { settingId: number; valueId: number }, { state: RootState }>('settingsCommands/setSettingValue', async (props) => {
    const settingLength = allKnownSettings.find((setting) => setting.id === props.settingId)?.length ?? getByteLength(props.valueId);
    const commandData: number[] = [];
    commandData.push(settingLength + 2);
    commandData.push(props.settingId);
    commandData.push(settingLength);
    for (let i = 0; i < settingLength; i++) {
        // eslint-disable-next-line no-bitwise
        commandData.push((props.valueId >> (i * 8)) & 0xff);
    }
    await sendSettingCommand(commandData);
});
