import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { bluetoothDeviceState } from './goproBleServiceState';

export interface SettingValue {
    value: number;
    /** Length in bytes */
    length: number;
}

interface Settings {
    [key: number]: SettingValue;
}

interface Statuses {
    [key: number]: number | string;
}

export interface GoproSettingsState {
    settings: Settings;
    statuses: Statuses;
    isFetching: boolean;
}

const initialState: GoproSettingsState = {
    settings: {},
    statuses: {},
    isFetching: false,
};

export const goproSettingsSlice = createSlice({
    name: 'goproSettings',
    initialState,
    reducers: {
        settingsReceived: (state, action: PayloadAction<Settings>) => {
            state.settings = { ...state.settings, ...action.payload };
        },
        settingsRequested: (state) => {
            state.isFetching = true;
        },
        settingsRequestFailed: (state) => {
            state.isFetching = false;
        },
        statusesReceived: (state, action: PayloadAction<Statuses>) => {
            state.statuses = { ...state.statuses, ...action.payload };
        },
    },
});

export const goproSettingsReducer = goproSettingsSlice.reducer;

export const fetchSettings = createAsyncThunk('goproSettings/fetchSettings', async () => {
    const { characteristics } = bluetoothDeviceState;
    if (!characteristics) throw new Error('no characteristics');
    const { queryCharacteristic } = characteristics;
    await queryCharacteristic.writeValue(new Uint8Array([0x01, 0x12]));
});
