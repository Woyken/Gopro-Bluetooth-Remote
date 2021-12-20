import { RootState } from 'store/store';

import { createSelector } from '@reduxjs/toolkit';

export const selectDeviceName = createSelector(
    (state: RootState) => state.goproBluetoothReducer.deviceName,
    (deviceName) => deviceName
);
