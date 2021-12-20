/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    statusAccMicStatus74,
    statusActivePhotoPresets94,
    statusActivePreset97,
    statusActivePresetsGroup96,
    statusActiveTimelapsePresets95,
    statusActiveVideoPresets93,
    statusActualOrientation86,
    statusAppCount31,
    statusApSsid30,
    statusApState69,
    statusBand5ghzAvail81,
    statusBattOkayForOta83,
    statusCameraLensType105,
    statusCameraLocateActive45,
    statusCaptureDelayActive101,
    statusCreatingPreset109,
    statusCurrentMode89,
    statusCurrentTimeMsec57,
    statusDateTime40,
    statusDigitalZoom75,
    statusDigitalZoomActive77,
    statusDownloadCancelRequestPending42,
    statusEnable17,
    statusEnable32,
    statusEncodingActive10,
    statusExposureSelectType65,
    statusExposureSelectX66,
    statusExposureSelectY67,
    statusExternalBatteryLevel4,
    statusExternalBatteryPresent3,
    statusFirstTimeUse79,
    statusGpsStatus68,
    statusInContextualMenu63,
    statusInternalBatteryLevel2,
    statusInternalBatteryPercentage70,
    statusInternalCameraPresent1,
    statusLastHilightTimeMsec59,
    statusLcdLockActive11,
    statusLegacyCurrentPresetGroup43,
    statusLegacyCurrentPresetGroupChild44,
    statusLegacyLastPhotoMode72,
    statusLegacyLastTimelapseMode73,
    statusLegacyLastVideoMode71,
    statusLinuxCoreActive104,
    statusLogsReady91,
    statusMediaModMicStatus102,
    statusMediaModStatus110,
    StatusMetadata,
    statusMobileFriendlyVideo78,
    statusMultiShotCountDown49,
    statusNextPollMsec60,
    statusNumGroupPhotos36,
    statusNumGroupVideos37,
    statusNumHilights58,
    statusNumTotalLiveBursts100,
    statusNumTotalPhotos38,
    statusNumTotalVideos39,
    statusOtaStatus41,
    statusPairing28,
    statusPairTime21,
    statusPresetModified98,
    statusProvisionStatus24,
    statusQuickCaptureActive9,
    statusRemainingLiveBursts99,
    statusRemainingPhotos34,
    statusRemainingSpace54,
    statusRemainingTimelapseTime64,
    statusRemainingVideoTime35,
    statusRemoteControlConnected27,
    statusRemoteControlVersion26,
    statusScanTimeMsec23,
    statusScheduledEnabled108,
    statusScheduledPreset107,
    statusSdStatus33,
    statusState19,
    statusState22,
    statusSupported55,
    statusSystemBusy8,
    statusSystemHot6,
    statusSystemReady82,
    statusThermalMitigationMode87,
    statusTimewarp1xActive92,
    statusTimewarpSpeedRampActive103,
    statusTurboTransfer113,
    statusType20,
    statusVideoHindsightCaptureActive106,
    statusVideoLowTempAlert85,
    statusVideoProgressCounter13,
    statusWifiBars56,
    statusWirelessBand76,
    statusWlanSsid29,
    statusZoomWhileEncoding88,
} from 'store/goproBluetoothServiceActions/goproStatusMetadata';
import { StatusValue } from 'store/goproSettingsSlice';
import { RootState } from 'store/store';

import { createSelector } from '@reduxjs/toolkit';

import { selectCurrentModeGroup, SettingsModesGroups } from './settingsSelectors';

const makeStatusSelector = (statusMetadata: StatusMetadata) =>
    createSelector(
        (state: RootState) => state.goproSettingsReducer.statuses[statusMetadata.id],
        (statusValue) => {
            if (statusValue === undefined) return undefined;
            const valueMetadata = statusMetadata.values.find((valueMeta) => valueMeta.id === statusValue);
            return { settingId: statusMetadata.id, settingLabel: statusMetadata.label, statusValue, valueLabel: valueMetadata?.label, possibleValues: statusMetadata.values };
        }
    );

const selectStatusInternalCameraPresent1 = makeStatusSelector(statusInternalCameraPresent1);
const selectStatusInternalBatteryLevel2 = makeStatusSelector(statusInternalBatteryLevel2);
const selectStatusExternalBatteryPresent3 = makeStatusSelector(statusExternalBatteryPresent3);
const selectStatusExternalBatteryLevel4 = makeStatusSelector(statusExternalBatteryLevel4);
const selectStatusSystemHot6 = makeStatusSelector(statusSystemHot6);
const selectStatusSystemBusy8 = makeStatusSelector(statusSystemBusy8);
const selectStatusQuickCaptureActive9 = makeStatusSelector(statusQuickCaptureActive9);
const selectStatusEncodingActive10 = makeStatusSelector(statusEncodingActive10);
const selectStatusLcdLockActive11 = makeStatusSelector(statusLcdLockActive11);
const selectStatusVideoProgressCounter13 = makeStatusSelector(statusVideoProgressCounter13);
const selectStatusEnable17 = makeStatusSelector(statusEnable17);
const selectStatusState19 = makeStatusSelector(statusState19);
const selectStatusType20 = makeStatusSelector(statusType20);
const selectStatusPairTime21 = makeStatusSelector(statusPairTime21);
const selectStatusState22 = makeStatusSelector(statusState22);
const selectStatusScanTimeMsec23 = makeStatusSelector(statusScanTimeMsec23);
const selectStatusProvisionStatus24 = makeStatusSelector(statusProvisionStatus24);
const selectStatusRemoteControlVersion26 = makeStatusSelector(statusRemoteControlVersion26);
const selectStatusRemoteControlConnected27 = makeStatusSelector(statusRemoteControlConnected27);
const selectStatusPairing28 = makeStatusSelector(statusPairing28);
const selectStatusWlanSsid29 = makeStatusSelector(statusWlanSsid29);
const selectStatusApSsid30 = makeStatusSelector(statusApSsid30);
const selectStatusAppCount31 = makeStatusSelector(statusAppCount31);
const selectStatusEnable32 = makeStatusSelector(statusEnable32);
const selectStatusSdStatus33 = makeStatusSelector(statusSdStatus33);
const selectStatusRemainingPhotos34 = makeStatusSelector(statusRemainingPhotos34);
const selectStatusRemainingVideoTime35 = makeStatusSelector(statusRemainingVideoTime35);
const selectStatusNumGroupPhotos36 = makeStatusSelector(statusNumGroupPhotos36);
const selectStatusNumGroupVideos37 = makeStatusSelector(statusNumGroupVideos37);
const selectStatusNumTotalPhotos38 = makeStatusSelector(statusNumTotalPhotos38);
const selectStatusNumTotalVideos39 = makeStatusSelector(statusNumTotalVideos39);
const selectStatusDateTime40 = makeStatusSelector(statusDateTime40);
const selectStatusOtaStatus41 = makeStatusSelector(statusOtaStatus41);
const selectStatusDownloadCancelRequestPending42 = makeStatusSelector(statusDownloadCancelRequestPending42);
const selectStatusLegacyCurrentPresetGroup43 = makeStatusSelector(statusLegacyCurrentPresetGroup43);
const selectStatusLegacyCurrentPresetGroupChild44 = makeStatusSelector(statusLegacyCurrentPresetGroupChild44);
const selectStatusCameraLocateActive45 = makeStatusSelector(statusCameraLocateActive45);
const selectStatusMultiShotCountDown49 = makeStatusSelector(statusMultiShotCountDown49);
const selectStatusRemainingSpace54 = makeStatusSelector(statusRemainingSpace54);
const selectStatusSupported55 = makeStatusSelector(statusSupported55);
const selectStatusWifiBars56 = makeStatusSelector(statusWifiBars56);
const selectStatusCurrentTimeMsec57 = makeStatusSelector(statusCurrentTimeMsec57);
const selectStatusNumHilights58 = makeStatusSelector(statusNumHilights58);
const selectStatusLastHilightTimeMsec59 = makeStatusSelector(statusLastHilightTimeMsec59);
const selectStatusNextPollMsec60 = makeStatusSelector(statusNextPollMsec60);
const selectStatusInContextualMenu63 = makeStatusSelector(statusInContextualMenu63);
const selectStatusRemainingTimelapseTime64 = makeStatusSelector(statusRemainingTimelapseTime64);
const selectStatusExposureSelectType65 = makeStatusSelector(statusExposureSelectType65);
const selectStatusExposureSelectX66 = makeStatusSelector(statusExposureSelectX66);
const selectStatusExposureSelectY67 = makeStatusSelector(statusExposureSelectY67);
const selectStatusGpsStatus68 = makeStatusSelector(statusGpsStatus68);
const selectStatusApState69 = makeStatusSelector(statusApState69);
const selectStatusInternalBatteryPercentage70 = makeStatusSelector(statusInternalBatteryPercentage70);
const selectStatusLegacyLastPhotoMode72 = makeStatusSelector(statusLegacyLastPhotoMode72);
const selectStatusLegacyLastVideoMode71 = makeStatusSelector(statusLegacyLastVideoMode71);
const selectStatusLegacyLastTimelapseMode73 = makeStatusSelector(statusLegacyLastTimelapseMode73);
const selectStatusAccMicStatus74 = makeStatusSelector(statusAccMicStatus74);
const selectStatusDigitalZoom75 = makeStatusSelector(statusDigitalZoom75);
const selectStatusWirelessBand76 = makeStatusSelector(statusWirelessBand76);
const selectStatusDigitalZoomActive77 = makeStatusSelector(statusDigitalZoomActive77);
const selectStatusMobileFriendlyVideo78 = makeStatusSelector(statusMobileFriendlyVideo78);
const selectStatusFirstTimeUse79 = makeStatusSelector(statusFirstTimeUse79);
const selectStatusBand5ghzAvail81 = makeStatusSelector(statusBand5ghzAvail81);
const selectStatusSystemReady82 = makeStatusSelector(statusSystemReady82);
const selectStatusBattOkayForOta83 = makeStatusSelector(statusBattOkayForOta83);
const selectStatusVideoLowTempAlert85 = makeStatusSelector(statusVideoLowTempAlert85);
const selectStatusActualOrientation86 = makeStatusSelector(statusActualOrientation86);
const selectStatusThermalMitigationMode87 = makeStatusSelector(statusThermalMitigationMode87);
const selectStatusZoomWhileEncoding88 = makeStatusSelector(statusZoomWhileEncoding88);
const selectStatusCurrentMode89 = makeStatusSelector(statusCurrentMode89);
const selectStatusLogsReady91 = makeStatusSelector(statusLogsReady91);
const selectStatusTimewarp1xActive92 = makeStatusSelector(statusTimewarp1xActive92);
const selectStatusActiveVideoPresets93 = makeStatusSelector(statusActiveVideoPresets93);
const selectStatusActivePhotoPresets94 = makeStatusSelector(statusActivePhotoPresets94);
const selectStatusActiveTimelapsePresets95 = makeStatusSelector(statusActiveTimelapsePresets95);
const selectStatusActivePresetsGroup96 = makeStatusSelector(statusActivePresetsGroup96);
const selectStatusActivePreset97 = makeStatusSelector(statusActivePreset97);
const selectStatusPresetModified98 = makeStatusSelector(statusPresetModified98);
const selectStatusRemainingLiveBursts99 = makeStatusSelector(statusRemainingLiveBursts99);
const selectStatusNumTotalLiveBursts100 = makeStatusSelector(statusNumTotalLiveBursts100);
const selectStatusCaptureDelayActive101 = makeStatusSelector(statusCaptureDelayActive101);
const selectStatusMediaModMicStatus102 = makeStatusSelector(statusMediaModMicStatus102);
const selectStatusTimewarpSpeedRampActive103 = makeStatusSelector(statusTimewarpSpeedRampActive103);
const selectStatusLinuxCoreActive104 = makeStatusSelector(statusLinuxCoreActive104);
const selectStatusCameraLensType105 = makeStatusSelector(statusCameraLensType105);
const selectStatusVideoHindsightCaptureActive106 = makeStatusSelector(statusVideoHindsightCaptureActive106);
const selectStatusScheduledPreset107 = makeStatusSelector(statusScheduledPreset107);
const selectStatusScheduledEnabled108 = makeStatusSelector(statusScheduledEnabled108);
const selectStatusCreatingPreset109 = makeStatusSelector(statusCreatingPreset109);
const selectStatusMediaModStatus110 = makeStatusSelector(statusMediaModStatus110);
const selectStatusTurboTransfer113 = makeStatusSelector(statusTurboTransfer113);

export const selectIsBatteryCharging = createSelector(selectStatusInternalBatteryLevel2, (batteryLevelStatus) => batteryLevelStatus?.statusValue === 4);

function statusAsNumber(value: StatusValue): number {
    if (typeof value === 'number') return value;
    throw new Error('Status is not number, did API change?');
}

export const selectBatteryPercentage = createSelector(selectStatusInternalBatteryPercentage70, (batteryPercentage) => statusAsNumber(batteryPercentage?.statusValue));

export const selectStorageRemainingTimeText = createSelector(
    selectStatusRemainingVideoTime35,
    selectStatusRemainingPhotos34,
    selectCurrentModeGroup,
    (videoRemainingTime, photosRemaining, currentModeGroup) => {
        const isVideoMode = currentModeGroup !== SettingsModesGroups.photo;
        if (isVideoMode) {
            const videoRemainingSeconds = statusAsNumber(videoRemainingTime?.statusValue);
            const videoRemainingMinutes = Math.floor(videoRemainingSeconds / 60) % 60;
            const videoRemainingHours = Math.floor(videoRemainingSeconds / 60 / 60);
            return `${videoRemainingHours.toString().padStart(2, '0')}:${videoRemainingMinutes.toString().padStart(2, '0')}`;
        }
        const photos = statusAsNumber(photosRemaining?.statusValue);
        const storageRemainingTimeText = `${photos <= 999 ? photos.toString().padStart(3, '0') : '999+'}`;
        return storageRemainingTimeText;
    }
);
