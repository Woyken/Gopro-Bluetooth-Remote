import {
    settingGeneralBeeps87,
    settingGeneralDefaultMode89,
    settingGeneralLeds91,
    settingGeneralQuickCapture54,
    settingGeneralRegionalGps83,
    settingGeneralRegionalLanguage84,
    settingGeneralTouchDisplayBrightness88,
    settingGeneralTouchDisplayLandscapeLock112,
    settingGeneralTouchDisplayScreenSaver51,
    settingGeneralVideoCompression106,
    settingGeneralVoiceControl86,
    settingGeneralVoiceControlLanguage85,
    settingGeneralWakeOnVoice104,
    SettingMetadata,
    settingMultishotBurstRate29,
    settingMultishotColor36,
    settingMultishotEvComp39,
    settingMultishotFov28,
    settingMultishotInterval30,
    settingMultishotInterval32,
    settingMultishotIsoMax37,
    settingMultishotIsoMin76,
    settingMultishotProtune34,
    settingMultishotRaw99,
    settingMultishotSharpness38,
    settingMultishotShutter31,
    settingMultishotWhiteBalance35,
    settingPhotoColor23,
    settingPhotoEvComp26,
    settingPhotoFov17,
    settingPhotoIsoMax24,
    settingPhotoIsoMin75,
    settingPhotoProtune21,
    settingPhotoRaw98,
    settingPhotoSharpness25,
    settingPhotoShutter19,
    settingPhotoShutter97,
    settingPhotoSuperPhoto109,
    settingPhotoWhiteBalance22,
    settingsCurrentMode92,
    settingVideoColor12,
    settingVideoEvComp15,
    settingVideoFov4,
    settingVideoFps3,
    settingVideoInterval5,
    settingVideoInterval6,
    settingVideoIsoMax13,
    settingVideoIsoMin102,
    settingVideoLowLight8,
    settingVideoMicrophone80,
    settingVideoProtune10,
    settingVideoRawAudio81,
    settingVideoResolution2,
    settingVideoResolutionFormat108,
    settingVideoSharpness14,
    settingVideoShutter73,
    settingVideoSpeed111,
    settingVideoStabilization78,
    settingVideoVideoTimer107,
    settingVideoWhiteBalance11,
} from 'store/goproBluetoothServiceActions/goproSettingsMetadata';
import { RootState } from 'store/store';
import { SettingsModes, SettingsModesGroups } from 'utilities/modes/modeTypes';

import { createSelector } from '@reduxjs/toolkit';

// TODO use selectors to convert between stored state data to UI data

// select all settings for current mode, return list of settings
// select current mode sd card storage left string
// select battery percentage
// select is shutter active
// select current recording time string
// ...

const makeSettingSelector = (settingMetadata: SettingMetadata) =>
    createSelector(
        (state: RootState) => state.goproSettingsReducer.settings[settingMetadata.id],
        (settingValue) => {
            const value = settingValue?.value;
            if (value === undefined) return undefined;
            const valueMetadata = settingMetadata.values.find((valueMeta) => valueMeta.id === value);
            return { settingId: settingMetadata.id, settingLabel: settingMetadata.label, value, valueLabel: valueMetadata?.label, possibleValues: settingMetadata.values };
        }
    );

const selectSettingVideoResolution2 = makeSettingSelector(settingVideoResolution2);
const selectSettingVideoFps3 = makeSettingSelector(settingVideoFps3);
const selectSettingVideoFov4 = makeSettingSelector(settingVideoFov4);
const selectSettingInterval5 = makeSettingSelector(settingVideoInterval5);
const selectSettingVideoInterval6 = makeSettingSelector(settingVideoInterval6);
const selectSettingVideoLowLight8 = makeSettingSelector(settingVideoLowLight8);
const selectSettingVideoProtune10 = makeSettingSelector(settingVideoProtune10);
const selectSettingVideoWhiteBalance11 = makeSettingSelector(settingVideoWhiteBalance11);
const selectSettingVideoColor12 = makeSettingSelector(settingVideoColor12);
const selectSettingVideoIsoMax13 = makeSettingSelector(settingVideoIsoMax13);
const selectSettingVideoSharpness14 = makeSettingSelector(settingVideoSharpness14);
const selectSettingVideoEvComp15 = makeSettingSelector(settingVideoEvComp15);
const selectSettingPhotoFov17 = makeSettingSelector(settingPhotoFov17);
const selectSettingPhotoShutter19 = makeSettingSelector(settingPhotoShutter19);
const selectSettingPhotoProtune21 = makeSettingSelector(settingPhotoProtune21);
const selectSettingPhotoWhiteBalance22 = makeSettingSelector(settingPhotoWhiteBalance22);
const selectSettingPhotoColor23 = makeSettingSelector(settingPhotoColor23);
const selectSettingPhotoIsoMax24 = makeSettingSelector(settingPhotoIsoMax24);
const selectSettingPhotoSharpness25 = makeSettingSelector(settingPhotoSharpness25);
const selectSettingPhotoEvComp26 = makeSettingSelector(settingPhotoEvComp26);
const selectSettingMultishotFov28 = makeSettingSelector(settingMultishotFov28);
const selectSettingMultishotBurstRate29 = makeSettingSelector(settingMultishotBurstRate29);
const selectSettingMultishotInterval30 = makeSettingSelector(settingMultishotInterval30);
const selectSettingMultishotShutter31 = makeSettingSelector(settingMultishotShutter31);
const selectSettingMultishotInterval32 = makeSettingSelector(settingMultishotInterval32);
const selectSettingMultishotProtune34 = makeSettingSelector(settingMultishotProtune34);
const selectSettingMultishotWhiteBalance35 = makeSettingSelector(settingMultishotWhiteBalance35);
const selectSettingMultishotColor36 = makeSettingSelector(settingMultishotColor36);
const selectSettingMultishotIsoMax37 = makeSettingSelector(settingMultishotIsoMax37);
const selectSettingMultishotSharpness38 = makeSettingSelector(settingMultishotSharpness38);
const selectSettingMultishotEvComp39 = makeSettingSelector(settingMultishotEvComp39);
const selectSettingGeneralTouchDisplayScreenSaver51 = makeSettingSelector(settingGeneralTouchDisplayScreenSaver51);
const selectSettingGeneralQuickCapture54 = makeSettingSelector(settingGeneralQuickCapture54);
const selectSettingVideoShutter73 = makeSettingSelector(settingVideoShutter73);
const selectSettingPhotoIsoMin75 = makeSettingSelector(settingPhotoIsoMin75);
const selectSettingMultishotIsoMin76 = makeSettingSelector(settingMultishotIsoMin76);
const selectSettingVideoStabilization78 = makeSettingSelector(settingVideoStabilization78);
const selectSettingVideoMicrophone80 = makeSettingSelector(settingVideoMicrophone80);
const selectSettingVideoRawAudio81 = makeSettingSelector(settingVideoRawAudio81);
const selectSettingGeneralRegionalGps83 = makeSettingSelector(settingGeneralRegionalGps83);
const selectSettingGeneralRegionalLanguage84 = makeSettingSelector(settingGeneralRegionalLanguage84);
const selectSettingGeneralVoiceControlLanguage85 = makeSettingSelector(settingGeneralVoiceControlLanguage85);
const selectSettingGeneralVoiceControl86 = makeSettingSelector(settingGeneralVoiceControl86);
const selectSettingGeneralBeeps87 = makeSettingSelector(settingGeneralBeeps87);
const selectSettingGeneralTouchDisplayBrightness88 = makeSettingSelector(settingGeneralTouchDisplayBrightness88);
const selectSettingGeneralDefaultMode89 = makeSettingSelector(settingGeneralDefaultMode89);
const selectSettingGeneralLeds91 = makeSettingSelector(settingGeneralLeds91);
const selectSettingsCurrentMode92 = makeSettingSelector(settingsCurrentMode92);
const selectSettingPhotoShutter97 = makeSettingSelector(settingPhotoShutter97);
const selectSettingPhotoRaw98 = makeSettingSelector(settingPhotoRaw98);
const selectSettingMultishotRaw99 = makeSettingSelector(settingMultishotRaw99);
const selectSettingVideoIsoMin102 = makeSettingSelector(settingVideoIsoMin102);
const selectSettingGeneralWakeOnVoice104 = makeSettingSelector(settingGeneralWakeOnVoice104);
const selectSettingGeneralVideoCompression106 = makeSettingSelector(settingGeneralVideoCompression106);
const selectSettingVideoVideoTimer107 = makeSettingSelector(settingVideoVideoTimer107);
const selectSettingVideoResolutionFormat108 = makeSettingSelector(settingVideoResolutionFormat108);
const selectSettingPhotoSuperPhoto109 = makeSettingSelector(settingPhotoSuperPhoto109);
const selectSettingVideoSpeed111 = makeSettingSelector(settingVideoSpeed111);
const selectSettingGeneralTouchDisplayLandscapeLock112 = makeSettingSelector(settingGeneralTouchDisplayLandscapeLock112);

const selectVideoModeSettings = createSelector(
    selectSettingVideoResolution2,
    selectSettingVideoFps3,
    selectSettingVideoFov4,
    selectSettingVideoLowLight8,
    selectSettingVideoStabilization78,
    selectSettingVideoProtune10,
    selectSettingVideoShutter73,
    selectSettingVideoEvComp15,
    selectSettingVideoWhiteBalance11,
    selectSettingVideoIsoMin102,
    selectSettingVideoIsoMax13,
    selectSettingVideoSharpness14,
    selectSettingVideoColor12,
    selectSettingVideoRawAudio81,
    selectSettingVideoMicrophone80,
    selectSettingVideoVideoTimer107,
    selectSettingVideoResolutionFormat108,
    (
        settingResolution2Value,
        settingFps3Value,
        settingFov4Value,
        settingLowLight8Value,
        settingStabilization78Value,
        settingProtune10Value,
        settingShutter73Value,
        settingEvComp15Value,
        settingWhiteBalance11Value,
        settingIsoMin102Value,
        settingIsoMax13Value,
        settingSharpness14Value,
        settingColor12Value,
        settingRawAudio81Value,
        settingMicrophone80Value,
        settingVideoTimer107Value,
        settingResolutionFormat108Value
    ) => {
        const settings = [
            settingVideoTimer107Value,
            settingResolutionFormat108Value,
            settingResolution2Value,
            settingFps3Value,
            settingFov4Value,
            settingLowLight8Value,
            settingStabilization78Value,
            settingProtune10Value,
        ];
        if (settingProtune10Value?.value) {
            settings.push(
                ...[
                    settingShutter73Value,
                    settingEvComp15Value,
                    settingWhiteBalance11Value,
                    settingIsoMin102Value,
                    settingIsoMax13Value,
                    settingSharpness14Value,
                    settingColor12Value,
                    settingRawAudio81Value,
                    settingMicrophone80Value,
                ]
            );
        }

        return settings.filter((setting) => setting !== undefined).map((x) => x as NonNullable<typeof x>);
    }
);

const selectLoopingModeSettings = createSelector(
    selectSettingVideoResolution2,
    selectSettingVideoFps3,
    selectSettingVideoFov4,
    selectSettingVideoInterval6,
    selectSettingVideoLowLight8,
    selectSettingVideoStabilization78,
    (settingVideoResolution2Value, settingVideoFps3Value, settingVideoFov4Value, settingVideoInterval6Value, settingVideoLowLight8Value, settingVideoStabilization78Value) => {
        const settings = [settingVideoResolution2Value, settingVideoFps3Value, settingVideoFov4Value, settingVideoInterval6Value, settingVideoLowLight8Value, settingVideoStabilization78Value];
        return settings.filter((setting) => setting !== undefined).map((x) => x as NonNullable<typeof x>);
    }
);

const selectTimewarpModeSettings = createSelector(
    selectSettingVideoResolution2,
    selectSettingVideoFov4,
    selectSettingVideoSpeed111,
    (settingVideoResolution2Value, settingVideoFov4Value, settingVideoSpeed111Value) => {
        // TODO limit FOV to wide only
        const settings = [settingVideoResolution2Value, settingVideoFov4Value, settingVideoSpeed111Value];
        return settings.filter((setting) => setting !== undefined).map((x) => x as NonNullable<typeof x>);
    }
);

const selectTimelapseVideoModeSettings = createSelector(
    selectSettingVideoResolution2,
    selectSettingVideoFov4,
    selectSettingInterval5,
    (settingVideoResolution2Value, settingVideoFov4Value, settingInterval5Value) => {
        const settings = [settingVideoResolution2Value, settingVideoFov4Value, settingInterval5Value];
        return settings.filter((setting) => setting !== undefined).map((x) => x as NonNullable<typeof x>);
    }
);

const selectTimelapsePhotoModeSettings = createSelector(
    selectSettingMultishotInterval30,
    selectSettingMultishotFov28,
    selectSettingMultishotEvComp39,
    selectSettingMultishotWhiteBalance35,
    selectSettingMultishotIsoMin76,
    selectSettingMultishotIsoMax37,
    selectSettingMultishotSharpness38,
    selectSettingMultishotColor36,
    selectSettingMultishotProtune34,
    (
        settingMultishotInterval30Value,
        settingMultishotFov28Value,
        settingMultishotEvComp39Value,
        settingMultishotWhiteBalance35Value,
        settingMultishotIsoMin76Value,
        settingMultishotIsoMax37Value,
        settingMultishotSharpness38Value,
        settingMultishotColor36Value,
        settingMultishotProtune34Value
    ) => {
        const settings = [
            settingMultishotInterval30Value,
            settingMultishotFov28Value,
            // TODO add raw setting here
            settingMultishotProtune34Value,
        ];
        if (settingMultishotEvComp39Value?.value) {
            settings.push(
                ...[
                    settingMultishotEvComp39Value,
                    settingMultishotWhiteBalance35Value,
                    settingMultishotIsoMin76Value,
                    settingMultishotIsoMax37Value,
                    settingMultishotSharpness38Value,
                    settingMultishotColor36Value,
                ]
            );
        }
        return settings.filter((setting) => setting !== undefined).map((x) => x as NonNullable<typeof x>);
    }
);

const selectNightlapseModeSettings = createSelector(
    selectSettingMultishotFov28,
    selectSettingMultishotShutter31,
    selectSettingMultishotInterval32,
    selectSettingMultishotProtune34,
    selectSettingMultishotWhiteBalance35,
    selectSettingMultishotIsoMax37,
    selectSettingMultishotIsoMin76,
    selectSettingMultishotRaw99,
    (
        settingMultishotFov28Value,
        settingMultishotShutter31Value,
        settingMultishotInterval32Value,
        settingMultishotProtune34Value,
        settingMultishotWhiteBalance35Value,
        settingMultishotIsoMax37Value,
        settingMultishotIsoMin76Value,
        settingMultishotRaw99Value
    ) => {
        const settings = [settingMultishotShutter31Value, settingMultishotInterval32Value, settingMultishotFov28Value, settingMultishotRaw99Value, settingMultishotProtune34Value];
        if (settingMultishotProtune34Value?.value) {
            settings.push(
                ...[
                    // evcomp
                    settingMultishotWhiteBalance35Value,
                    settingMultishotIsoMin76Value,
                    settingMultishotIsoMax37Value,
                    // sharpness
                    // color
                ]
            );
        }
        return settings.filter((setting) => setting !== undefined).map((x) => x as NonNullable<typeof x>);
    }
);

const selectPhotoNightModeSettings = createSelector(
    selectSettingPhotoFov17,
    selectSettingPhotoShutter19,
    selectSettingPhotoProtune21,
    selectSettingPhotoWhiteBalance22,
    selectSettingPhotoColor23,
    selectSettingPhotoIsoMax24,
    selectSettingPhotoSharpness25,
    selectSettingPhotoEvComp26,
    selectSettingPhotoIsoMin75,
    selectSettingPhotoRaw98,
    (
        settingPhotoFov17Value,
        settingPhotoShutter19Value,
        settingPhotoProtune21Value,
        settingPhotoWhiteBalance22Value,
        settingPhotoColor23Value,
        settingPhotoIsoMax24Value,
        settingPhotoSharpness25Value,
        settingPhotoEvComp26Value,
        settingPhotoIsoMin75Value,
        settingPhotoRaw98Value
    ) => {
        const settings = [settingPhotoShutter19Value, settingPhotoFov17Value, settingPhotoRaw98Value, settingPhotoProtune21Value];
        if (settingPhotoProtune21Value?.value) {
            settings.push(
                ...[settingPhotoEvComp26Value, settingPhotoWhiteBalance22Value, settingPhotoIsoMin75Value, settingPhotoIsoMax24Value, settingPhotoSharpness25Value, settingPhotoColor23Value]
            );
        }
        return settings.filter((setting) => setting !== undefined).map((x) => x as NonNullable<typeof x>);
    }
);

const selectPhotoBurstModeSettings = createSelector(
    selectSettingMultishotFov28,
    selectSettingMultishotBurstRate29,
    selectSettingMultishotProtune34,
    selectSettingMultishotWhiteBalance35,
    selectSettingMultishotColor36,
    selectSettingMultishotIsoMax37,
    selectSettingMultishotSharpness38,
    selectSettingMultishotEvComp39,
    selectSettingMultishotIsoMin76,
    (
        settingMultishotFov28Value,
        settingMultishotBurstRate29Value,
        settingMultishotProtune34Value,
        settingMultishotWhiteBalance35Value,
        settingMultishotColor36Value,
        settingMultishotIsoMax37Value,
        settingMultishotSharpness38Value,
        settingMultishotEvComp39Value,
        settingMultishotIsoMin76Value
    ) => {
        const settings = [settingMultishotBurstRate29Value, settingMultishotFov28Value, settingMultishotProtune34Value];
        if (settingMultishotProtune34Value?.value) {
            settings.push(
                ...[
                    settingMultishotEvComp39Value,
                    settingMultishotWhiteBalance35Value,
                    settingMultishotIsoMin76Value,
                    settingMultishotIsoMax37Value,
                    settingMultishotSharpness38Value,
                    settingMultishotColor36Value,
                ]
            );
        }
        return settings.filter((setting) => setting !== undefined).map((x) => x as NonNullable<typeof x>);
    }
);

const selectPhotoSingleModeSettings = createSelector(
    selectSettingPhotoFov17,
    selectSettingPhotoProtune21,
    selectSettingPhotoWhiteBalance22,
    selectSettingPhotoColor23,
    selectSettingPhotoIsoMax24,
    selectSettingPhotoSharpness25,
    selectSettingPhotoEvComp26,
    selectSettingPhotoIsoMin75,
    selectSettingPhotoShutter97,
    selectSettingPhotoSuperPhoto109,
    (
        settingPhotoFov17Value,
        settingPhotoProtune21Value,
        settingPhotoWhiteBalance22Value,
        settingPhotoColor23Value,
        settingPhotoIsoMax24Value,
        settingPhotoSharpness25Value,
        settingPhotoEvComp26Value,
        settingPhotoIsoMin75Value,
        settingPhotoShutter97Value,
        settingPhotoSuperPhoto109Value
    ) => {
        const settings = [
            settingPhotoFov17Value,
            settingPhotoSuperPhoto109Value,
            // raw
            settingPhotoProtune21Value,
        ];
        if (settingPhotoProtune21Value?.value) {
            settings.push(
                ...[
                    settingPhotoShutter97Value,
                    settingPhotoEvComp26Value,
                    settingPhotoWhiteBalance22Value,
                    settingPhotoIsoMin75Value,
                    settingPhotoIsoMax24Value,
                    settingPhotoSharpness25Value,
                    settingPhotoColor23Value,
                ]
            );
        }
        return settings.filter((setting) => setting !== undefined).map((x) => x as NonNullable<typeof x>);
    }
);

export const selectCurrentModeSettings = createSelector(
    selectSettingsCurrentMode92,
    selectVideoModeSettings,
    selectLoopingModeSettings,
    selectPhotoSingleModeSettings,
    selectPhotoBurstModeSettings,
    selectPhotoNightModeSettings,
    selectTimewarpModeSettings,
    selectTimelapseVideoModeSettings,
    selectTimelapsePhotoModeSettings,
    selectNightlapseModeSettings,
    (
        currentMode,
        videoModeSettings,
        loopingModeSettings,
        photoSingleModeSettings,
        photoBurstModeSettings,
        photoNightModeSettings,
        timewarpModeSettings,
        timelapseVideoModeSettings,
        timelapsePhotoModeSettings,
        nightlapseModeSettings
    ) => {
        switch (currentMode?.value) {
            case SettingsModes.video:
                return videoModeSettings;
            case SettingsModes.videoLooping:
                return loopingModeSettings;
            case SettingsModes.photoSingle:
                return photoSingleModeSettings;
            case SettingsModes.photoNight:
                return photoNightModeSettings;
            case SettingsModes.photoBurst:
                return photoBurstModeSettings;
            case SettingsModes.timelapseTimewarp:
                return timewarpModeSettings;
            case SettingsModes.timelapseVideo:
                return timelapseVideoModeSettings;
            case SettingsModes.timelapsePhoto:
                return timelapsePhotoModeSettings;
            case SettingsModes.nightlapse:
                return nightlapseModeSettings;
            default:
                return [];
        }
    }
);

export const selectGeneralSettings = createSelector(
    selectSettingGeneralTouchDisplayScreenSaver51,
    selectSettingGeneralQuickCapture54,
    selectSettingGeneralRegionalGps83,
    selectSettingGeneralRegionalLanguage84,
    selectSettingGeneralVoiceControlLanguage85,
    selectSettingGeneralVoiceControl86,
    selectSettingGeneralBeeps87,
    selectSettingGeneralTouchDisplayBrightness88,
    selectSettingGeneralDefaultMode89,
    selectSettingGeneralLeds91,
    selectSettingGeneralWakeOnVoice104,
    selectSettingGeneralVideoCompression106,
    selectSettingGeneralTouchDisplayLandscapeLock112,
    (
        settingGeneralTouchDisplayScreenSaver51Value,
        settingGeneralQuickCapture54Value,
        settingGeneralRegionalGps83Value,
        settingGeneralRegionalLanguage84Value,
        settingGeneralVoiceControlLanguage85Value,
        settingGeneralVoiceControl86Value,
        settingGeneralBeeps87Value,
        settingGeneralTouchDisplayBrightness88Value,
        settingGeneralDefaultMode89Value,
        settingGeneralLeds91Value,
        settingGeneralWakeOnVoice104Value,
        settingGeneralVideoCompression106Value,
        settingGeneralTouchDisplayLandscapeLock112Value
    ) => {
        const settings = [
            settingGeneralTouchDisplayScreenSaver51Value,
            settingGeneralQuickCapture54Value,
            settingGeneralRegionalGps83Value,
            settingGeneralRegionalLanguage84Value,
            settingGeneralVoiceControlLanguage85Value,
            settingGeneralVoiceControl86Value,
            settingGeneralBeeps87Value,
            settingGeneralTouchDisplayBrightness88Value,
            settingGeneralDefaultMode89Value,
            settingGeneralLeds91Value,
            settingGeneralWakeOnVoice104Value,
            settingGeneralVideoCompression106Value,
            settingGeneralTouchDisplayLandscapeLock112Value,
        ];
        return settings.filter((setting) => setting !== undefined).map((x) => x as NonNullable<typeof x>);
    }
);

export const selectCurrentMode = createSelector(selectSettingsCurrentMode92, (currentMode) => {
    if (currentMode === undefined) return undefined;
    return {
        id: currentMode.value as SettingsModes,
        label: currentMode.valueLabel,
    };
});

export const selectCurrentModeGroup = createSelector(selectSettingsCurrentMode92, (currentMode) => {
    switch (currentMode?.value) {
        case SettingsModes.video:
            return SettingsModesGroups.video;
        case SettingsModes.videoLooping:
            return SettingsModesGroups.video;
        case SettingsModes.photoSingle:
            return SettingsModesGroups.photo;
        case SettingsModes.photoNight:
            return SettingsModesGroups.photo;
        case SettingsModes.photoBurst:
            return SettingsModesGroups.photo;
        case SettingsModes.timelapseTimewarp:
            return SettingsModesGroups.timelapse;
        case SettingsModes.timelapseVideo:
            return SettingsModesGroups.timelapse;
        case SettingsModes.timelapsePhoto:
            return SettingsModesGroups.timelapse;
        case SettingsModes.nightlapse:
            return SettingsModesGroups.timelapse;
        default:
            return SettingsModesGroups.video;
    }
});

const makeSettingsPreviewMainTexts = (mainSettings: typeof selectSettingVideoResolution2[]) =>
    createSelector(...mainSettings, (...selectors: ReturnType<typeof selectSettingVideoResolution2>[]) => {
        return selectors
            .map((selector) => selector?.valueLabel)
            .filter((x) => x !== undefined)
            .map((x) => x as NonNullable<typeof x>);
    });

const selectSettingsPreviewMainTextsVideo = makeSettingsPreviewMainTexts([selectSettingVideoResolution2, selectSettingVideoFps3, selectSettingVideoFov4]);
const selectSettingsPreviewMainTextsLooping = makeSettingsPreviewMainTexts([selectSettingVideoResolution2, selectSettingVideoFps3, selectSettingVideoFov4]);
const selectSettingsPreviewMainTextsPhotoSingle = makeSettingsPreviewMainTexts([selectSettingPhotoFov17]);
const selectSettingsPreviewMainTextsPhotoNight = makeSettingsPreviewMainTexts([selectSettingPhotoFov17]);
const selectSettingsPreviewMainTextsPhotoBurst = makeSettingsPreviewMainTexts([selectSettingPhotoFov17]);
const selectSettingsPreviewMainTextsTimelapseTimewarp = makeSettingsPreviewMainTexts([selectSettingVideoResolution2, selectSettingVideoFov4, selectSettingVideoSpeed111]);
const selectSettingsPreviewMainTextsTimelapseVideo = makeSettingsPreviewMainTexts([selectSettingVideoResolution2, selectSettingVideoFov4, selectSettingInterval5]);
const selectSettingsPreviewMainTextsTimelapsePhoto = makeSettingsPreviewMainTexts([selectSettingMultishotInterval30, selectSettingMultishotFov28]);
const selectSettingsPreviewMainTextsNightlapse = makeSettingsPreviewMainTexts([selectSettingMultishotFov28, selectSettingMultishotShutter31, selectSettingMultishotInterval32]);

export const selectCurrentModeSettingsPreviewMainTexts = createSelector(
    selectSettingsCurrentMode92,
    selectSettingsPreviewMainTextsVideo,
    selectSettingsPreviewMainTextsLooping,
    selectSettingsPreviewMainTextsPhotoSingle,
    selectSettingsPreviewMainTextsPhotoNight,
    selectSettingsPreviewMainTextsPhotoBurst,
    selectSettingsPreviewMainTextsTimelapseTimewarp,
    selectSettingsPreviewMainTextsTimelapseVideo,
    selectSettingsPreviewMainTextsTimelapsePhoto,
    selectSettingsPreviewMainTextsNightlapse,
    (
        currentMode,
        settingsPreviewMainTextsVideo,
        settingsPreviewMainTextsLooping,
        settingsPreviewMainTextsPhotoSingle,
        settingsPreviewMainTextsPhotoNight,
        settingsPreviewMainTextsPhotoBurst,
        settingsPreviewMainTextsTimelapseTimewarp,
        settingsPreviewMainTextsTimelapseVideo,
        settingsPreviewMainTextsTimelapsePhoto,
        settingsPreviewMainTextsNightlapse
    ) => {
        switch (currentMode?.value) {
            case SettingsModes.video:
                return settingsPreviewMainTextsVideo;
            case SettingsModes.videoLooping:
                return settingsPreviewMainTextsLooping;
            case SettingsModes.photoSingle:
                return settingsPreviewMainTextsPhotoSingle;
            case SettingsModes.photoNight:
                return settingsPreviewMainTextsPhotoNight;
            case SettingsModes.photoBurst:
                return settingsPreviewMainTextsPhotoBurst;
            case SettingsModes.timelapseTimewarp:
                return settingsPreviewMainTextsTimelapseTimewarp;
            case SettingsModes.timelapseVideo:
                return settingsPreviewMainTextsTimelapseVideo;
            case SettingsModes.timelapsePhoto:
                return settingsPreviewMainTextsTimelapsePhoto;
            case SettingsModes.nightlapse:
                return settingsPreviewMainTextsNightlapse;
            default:
                return [];
        }
    }
);
