import { RootState } from 'store/store';

import { createSelector } from '@reduxjs/toolkit';

import { selectIsSettingsInitialized } from './settingsSelectors';
import { selectIsStatusInitialized } from './statusSelectors';

export const selectDeviceName = createSelector(
    (state: RootState) => state.goproBluetoothReducer.deviceName,
    (deviceName) => deviceName
);

export const selectIsConnectedAndInitialized = createSelector(
    selectIsStatusInitialized,
    selectIsSettingsInitialized,
    (state: RootState) => state.goproBluetoothReducer.isGattConnected,
    (isStatusInitialized, isSettingsInitialized, isGattConnected) => isStatusInitialized && isSettingsInitialized && isGattConnected
);
