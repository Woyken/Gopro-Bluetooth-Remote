import { statusInternalBatteryLevel2 } from 'store/goproBluetoothServiceActions/goproStatusMetadata';
import { RootState } from 'store/store';

import { createSelector } from '@reduxjs/toolkit';

export const selectIsBatteryCharging = createSelector(
    (state: RootState) => state.goproSettingsReducer.statuses[statusInternalBatteryLevel2.id],
    (batteryLevelStatus) => batteryLevelStatus === 4
);
