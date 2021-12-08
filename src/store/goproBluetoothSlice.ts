import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { gattConnect, requestDevice } from './goproBluetoothServiceActions/goproBluetoothServiceActions';
import { bluetoothDeviceState } from './goproBleServiceState';

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

interface GoproBluetoothDeviceState {
    isRequestingDevice: boolean;
    isDeviceSelected: boolean;
    deviceName: string;
    error?: string;
    isGattConnecting: boolean;
    gattConnected: boolean;
    goproBluetoothDeviceCommandsState: GoproBluetoothDeviceCommandsState;
}

export const initialState: GoproBluetoothDeviceState = {
    isRequestingDevice: false,
    isDeviceSelected: false,
    gattConnected: false,
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
            state.gattConnected = false;
            state.error = action.payload;
        },
        getHardwareInfoResponse: (state, action: PayloadAction<GetHardwareInfoState>) => {
            state.goproBluetoothDeviceCommandsState.getHardwareInfo = action.payload;
            // Let's override device name when we know wifi ssid
            state.deviceName = action.payload.apSsid;
        },
        openGoProGetVersionResponse: (state, action: PayloadAction<OpenGoProVersionState>) => {
            state.goproBluetoothDeviceCommandsState.openGoProVersion = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(requestDevice.pending, (state) => {
            bluetoothDeviceState.device = undefined;
            state.isRequestingDevice = true;
            state.isDeviceSelected = false;
            state.error = undefined;
        });
        builder.addCase(requestDevice.fulfilled, (state, action) => {
            state.isRequestingDevice = false;
            state.isDeviceSelected = true;
            state.error = undefined;
            state.deviceName = action.payload.deviceName;
        });
        builder.addCase(requestDevice.rejected, (state, action) => {
            bluetoothDeviceState.device = undefined;
            state.isRequestingDevice = false;
            state.isDeviceSelected = false;
            state.error = action.error.message ?? 'unknown error';
        });
        builder.addCase(gattConnect.pending, (state) => {
            state.isGattConnecting = true;
            state.gattConnected = false;
        });
        builder.addCase(gattConnect.fulfilled, (state) => {
            state.isGattConnecting = false;
            state.gattConnected = true;
        });
        builder.addCase(gattConnect.rejected, (state, action) => {
            state.isGattConnecting = false;
            state.gattConnected = false;
            state.error = action.error.message ?? 'unknown error';
        });
    },
});

export const goproBluetoothReducer = goproBluetoothSlice.reducer;
