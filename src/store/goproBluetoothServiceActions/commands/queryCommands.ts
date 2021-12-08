import { bluetoothDeviceState } from 'store/goproBleServiceState';
import { RootState } from 'store/store';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { writeGoProPacketData } from '../goproBluetoothServiceActions';

export const subscribeToSettingsChangesCommand = createAsyncThunk<void, number[], { state: RootState }>('queryCommands/subscribeToSettingsChangesCommand', async (settingsIds) => {
    const { characteristics } = bluetoothDeviceState;
    if (!characteristics) throw new Error('no characteristics');
    const { queryCharacteristic } = characteristics;
    await writeGoProPacketData(queryCharacteristic, [0x52, ...settingsIds]);
});

export const subscribeToStatusChangesCommand = createAsyncThunk<void, number[], { state: RootState }>('queryCommands/subscribeToStatusChangesCommand', async (statusIds) => {
    const { characteristics } = bluetoothDeviceState;
    if (!characteristics) throw new Error('no characteristics');
    const { queryCharacteristic } = characteristics;
    await writeGoProPacketData(queryCharacteristic, [0x53, ...statusIds]);
});

export const getSettingsCommand = createAsyncThunk('queryCommands/getSettingsCommand', async () => {
    const { characteristics } = bluetoothDeviceState;
    if (!characteristics) throw new Error('no characteristics');
    const { queryCharacteristic } = characteristics;
    await writeGoProPacketData(queryCharacteristic, [0x12]);
});

export const getStatusesCommand = createAsyncThunk('queryCommands/getStatusesCommand', async () => {
    const { characteristics } = bluetoothDeviceState;
    if (!characteristics) throw new Error('no characteristics');
    const { queryCharacteristic } = characteristics;
    await writeGoProPacketData(queryCharacteristic, [0x13]);
});
