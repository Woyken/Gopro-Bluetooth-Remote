import { getSettingsJsonCommand } from 'store/goproBluetoothServiceActions/commands/commands';
import { fetchSettingsJsonBleCommand, getSettingsJsonCachedCommand } from 'store/goproBluetoothServiceActions/goproBluetoothServiceActions';
import { SettingsJson } from 'utilities/definitions/goproTypes/settingsJson';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
        setSettingsJson: (state, action: PayloadAction<SettingsJson>) => {
            state.isFetching = false;
            state.settingsJson = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSettingsJsonBleCommand.fulfilled, (state, action) => {
            state.isFetching = false;
            state.settingsJson = action.payload;
        });
        builder.addCase(getSettingsJsonCachedCommand.pending, (state) => {
            state.isFetching = true;
        });
        builder.addCase(getSettingsJsonCachedCommand.fulfilled, (state, action) => {
            if (action.payload) {
                state.isFetching = false;
                state.settingsJson = action.payload;
            }
        });
    },
});

export const goproSettingsMetadataReducer = goproSettingsMetadataSlice.reducer;
