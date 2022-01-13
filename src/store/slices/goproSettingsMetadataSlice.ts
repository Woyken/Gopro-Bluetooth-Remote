import { getSettingsJsonCommand } from 'store/goproBluetoothServiceActions/commands/commands';
import { RootState } from 'store/store';
import { SettingsJson } from 'utilities/definitions/goproTypes/settingsJson';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GoproSettingsMetadataState {
    settingsJson?: SettingsJson;
    isFetching: boolean;
}

const initialState: GoproSettingsMetadataState = {
    isFetching: false,
};

export const goproSettingsMetadataSlice = createSlice({
    name: 'goproSettingsMetadata',
    initialState,
    reducers: {
        settingsMetadataReceived: (state, action: PayloadAction<SettingsJson>) => {
            state.settingsJson = { ...state.settingsJson, ...action.payload };
        },
        settingsMetadataRequested: (state) => {
            state.isFetching = true;
            state.settingsJson = undefined;
        },
        settingsMetadataRequestFailed: (state) => {
            state.isFetching = false;
        },
    },
});

export const goproSettingsMetadataReducer = goproSettingsMetadataSlice.reducer;

export const fetchSettingsMetadata = createAsyncThunk<void, void, { state: RootState }>(`${goproSettingsMetadataSlice.name}/fetchSettingsMetadata`, async (_, { dispatch }) => {
    dispatch(getSettingsJsonCommand());
});
