import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { gattConnect, requestDevice, writeGoProPacketData } from './goproBluetoothServiceActions/goproBluetoothServiceActions';
import { statusSystemReady82 } from './goproBluetoothServiceActions/goproStatusMetadata';
import { bluetoothDeviceState } from './goproBleServiceState';
import { RootState, store } from './store';

export const tempSettingsDump = createAsyncThunk('bluetoothDevice/tempSettingsDump', async () => {
    const { characteristics } = bluetoothDeviceState;
    if (!characteristics) throw new Error('no characteristics');
    const { queryCharacteristic } = characteristics;
    await queryCharacteristic.writeValue(new Uint8Array([0x01, 0x12]));
});

export const tempStatusesDump = createAsyncThunk('bluetoothDevice/tempStatusesDump', async () => {
    const { characteristics } = bluetoothDeviceState;
    if (!characteristics) throw new Error('no characteristics');
    const { queryCharacteristic } = characteristics;
    await queryCharacteristic.writeValue(new Uint8Array([0x01, 0x13]));
});

// async function listenForResponse(characteristic: BluetoothRemoteGATTCharacteristic) {
//     let resolvePromise: (value: PacketResponse | PromiseLike<PacketResponse>) => void;
//     let rejectPromise: (reason: Error) => void;
//     const promise = new Promise<PacketResponse>((resolve, reject) => {
//         resolvePromise = resolve;
//         rejectPromise = reject;
//     });
//     const timeoutHandle = setTimeout(() => {
//         rejectPromise(new Error('Timeout'));
//     }, 1000);
//     let responseDataAccumulator: number[] = [];
//     let messageLengthLeft = 0;
//     const onCharacteristicValueChanged = async () => {
//         const { value } = characteristic;
//         if (!value) {
//             // Should not be possible...
//             rejectPromise(new Error('This should not be possible, empty response value'));
//             return;
//         }
//         const packetHeader = parsePacketHeader(value);
//         if (packetHeader.isStart) {
//             responseDataAccumulator = Array.from(new Uint8Array(value.buffer)).slice(packetHeader.headerSizeBytes);
//             messageLengthLeft = packetHeader.messageLength;
//             messageLengthLeft -= responseDataAccumulator.length;
//         } else {
//             // TODO consider using continuationIndex
//             const continuationData = Array.from(new Uint8Array(value.buffer)).slice(packetHeader.headerSizeBytes);
//             messageLengthLeft -= continuationData.length;
//             responseDataAccumulator.push(...continuationData);
//         }
//         if (messageLengthLeft === 0) {
//             resolvePromise(responseDataAccumulator);
//         }
//         if (messageLengthLeft < 0) rejectPromise(new Error('Did response messages get out of sync?'));
//     };
//     promise.finally(() => {
//         characteristic.removeEventListener('characteristicvaluechanged', onCharacteristicValueChanged);
//         clearTimeout(timeoutHandle);
//     });
//     characteristic.addEventListener('characteristicvaluechanged', onCharacteristicValueChanged);
//     return promise;
// }

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
