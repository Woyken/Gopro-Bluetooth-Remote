import { getHardwareInfoCommand, openGoProGetVersionCommand } from 'store/goproBluetoothServiceActions/commands/commands';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { bluetoothDeviceState } from '../goproBleServiceState';
import { gattConnect, getKnownDevice, requestDevice } from '../goproBluetoothServiceActions/goproBluetoothServiceActions';

export interface OpenGoProVersionState {
    majorVersion: number;
    minorVersion: number;
}

export interface GetHardwareInfoState {
    modelNumber: number[];
    modelName: string;
    boardType: string;
    firmwareVersion: string;
    serialNumber: string;
    apSsid: string;
    apMacAddress: string;
}

interface GoproBluetoothDeviceCommandsState {
    isCommandInAction: boolean;
    getHardwareInfo?: GetHardwareInfoState;
    openGoProVersion?: OpenGoProVersionState;
}

export enum BluetoothDeviceAvailability {
    None,
    BeingRequested,
    SavedAndWaitingForAdvertisement,
    Ready,
}

interface GoproBluetoothDeviceState {
    deviceAvailability: BluetoothDeviceAvailability;
    deviceName: string;
    error?: string;
    isGattConnecting: boolean;
    isGattConnected: boolean;
    goproBluetoothDeviceCommandsState: GoproBluetoothDeviceCommandsState;
}

export const initialState: GoproBluetoothDeviceState = {
    deviceAvailability: BluetoothDeviceAvailability.None,
    isGattConnected: false,
    isGattConnecting: false,
    deviceName: 'unknown',
    goproBluetoothDeviceCommandsState: {
        isCommandInAction: false,
    },
};

export const goproBluetoothSlice = createSlice({
    name: 'bluetoothDevice',
    initialState,
    reducers: {
        gattDisconnected: (state, action: PayloadAction<string | undefined>) => {
            state.isGattConnected = false;
            state.error = action.payload;
        },
        savedDeviceAvailable: (state, action: PayloadAction<string>) => {
            state.deviceAvailability = BluetoothDeviceAvailability.Ready;
            state.error = undefined;
            state.deviceName = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(openGoProGetVersionCommand.fulfilled, (state, action) => {
            state.goproBluetoothDeviceCommandsState.openGoProVersion = action.payload;
        });
        builder.addCase(getHardwareInfoCommand.fulfilled, (state, action) => {
            state.goproBluetoothDeviceCommandsState.getHardwareInfo = action.payload;
            // Let's override device name when we know wifi ssid
            state.deviceName = action.payload.apSsid;
        });
        builder.addCase(requestDevice.pending, (state) => {
            bluetoothDeviceState.device = undefined;
            state.deviceAvailability = BluetoothDeviceAvailability.BeingRequested;
            state.error = undefined;
        });
        builder.addCase(requestDevice.fulfilled, (state, action) => {
            state.deviceAvailability = BluetoothDeviceAvailability.Ready;
            state.error = undefined;
            state.deviceName = action.payload.deviceName;
        });
        builder.addCase(requestDevice.rejected, (state, action) => {
            bluetoothDeviceState.device = undefined;
            state.deviceAvailability = BluetoothDeviceAvailability.None;
            state.error = action.error.message ?? 'unknown error';
        });
        builder.addCase(getKnownDevice.pending, (state) => {
            state.error = undefined;
        });
        builder.addCase(getKnownDevice.rejected, (state) => {
            state.deviceName = 'unknown';
            state.deviceAvailability = BluetoothDeviceAvailability.None;
        });
        builder.addCase(getKnownDevice.fulfilled, (state, action) => {
            state.deviceName = action.payload.deviceName;
            state.deviceAvailability = BluetoothDeviceAvailability.SavedAndWaitingForAdvertisement;
        });
        builder.addCase(gattConnect.pending, (state) => {
            state.isGattConnecting = true;
            state.isGattConnected = false;
        });
        builder.addCase(gattConnect.fulfilled, (state) => {
            state.isGattConnecting = false;
            state.isGattConnected = true;
        });
        builder.addCase(gattConnect.rejected, (state, action) => {
            state.isGattConnecting = false;
            state.isGattConnected = false;
            state.error = action.error.message ?? 'unknown error';
        });
    },
});

export const goproBluetoothReducer = goproBluetoothSlice.reducer;
