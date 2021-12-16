import { statusInternalBatteryLevel2, statusInternalBatteryPercentage70 } from 'store/goproBluetoothServiceActions/goproStatusMetadata';
import { StatusValue } from 'store/goproSettingsSlice';
import { RootState } from 'store/store';

import { createSelector } from '@reduxjs/toolkit';

export const selectIsBatteryCharging = createSelector(
    (state: RootState) => state.goproSettingsReducer.statuses[statusInternalBatteryLevel2.id],
    (batteryLevelStatus) => batteryLevelStatus === 4
);

function statusAsNumber(value: StatusValue): number {
    if (typeof value === 'number') return value;
    throw new Error('Status is not number, did API change?');
}

export const selectBatteryPercentage = createSelector(
    (state: RootState) => state.goproSettingsReducer.statuses[statusInternalBatteryPercentage70.id],
    (batteryPercentage) => statusAsNumber(batteryPercentage)
);
