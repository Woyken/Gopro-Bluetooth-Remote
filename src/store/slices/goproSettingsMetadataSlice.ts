import { getSettingsJsonCommand } from 'store/goproBluetoothServiceActions/commands/commands';
import { SettingsJson } from 'utilities/definitions/goproTypes/settingsJson';

import { createSlice } from '@reduxjs/toolkit';

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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSettingsJsonCommand.pending, (state, action) => {
            state.isFetching = true;
            state.settingsJson = action.payload;
        });
        builder.addCase(getSettingsJsonCommand.fulfilled, (state, action) => {
            state.isFetching = false;
            state.settingsJson = action.payload;
        });
    },
});

export const goproSettingsMetadataReducer = goproSettingsMetadataSlice.reducer;
