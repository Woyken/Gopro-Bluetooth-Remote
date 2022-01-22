import createCachedSelector from 're-reselect';
import { selectLastPhotoMode, selectLastTimelapseMode, selectLastVideoMode } from 'store/selectors/statusSelectors';
import { RootState } from 'store/store';

import { createSelector } from '@reduxjs/toolkit';

import { SCHEMA_V4_CURRENT_MODE_SETTING_ID, selectCurrentActiveModeId, selectSettingsMetadataAllSettings, selectSettingsMetadataSettingsJson } from '../settingsMetadataSelectors';

export const selectActiveUiModesByUiGroup = createSelector(selectLastVideoMode, selectLastPhotoMode, selectLastTimelapseMode, (videoModeId, photoModeId, timeLapseModeId) => {
    return [
        {
            uiModeGroup: UiModeGroup.video,
            uiMode: modeIdToUiMode(videoModeId),
        },
        {
            uiModeGroup: UiModeGroup.photo,
            uiMode: modeIdToUiMode(photoModeId),
        },
        {
            uiModeGroup: UiModeGroup.timeLapse,
            uiMode: modeIdToUiMode(timeLapseModeId),
        },
    ];
});

export const selectActiveUiModeByUiModeGroup = createCachedSelector(
    selectActiveUiModesByUiGroup,
    (_: RootState, uiModeGroup: UiModeGroup) => uiModeGroup,
    (activeUiModesByUiGroup, uiModeGroup) => {
        return activeUiModesByUiGroup.find((activeUiMode) => activeUiMode.uiModeGroup === uiModeGroup)?.uiMode ?? UiMode.unknown;
    }
)((_, uiModeGroup) => uiModeGroup);

export enum UiModeGroup {
    timeLapse,
    video,
    photo,
    unknown,
}

export enum UiMode {
    video,
    looping,
    singlePhoto,
    photo,
    nightPhoto,
    burstPhoto,
    timeLapseVideo,
    timeLapsePhoto,
    nightLapsePhoto,
    timeWarpVideo,
    liveBurst,
    playback,
    setup,
    broadcastRecord,
    broadcast,
    unknown,
}

function modeIdToUiMode(modeId: number): UiMode {
    switch (modeId) {
        case 12:
            return UiMode.video;
        case 15:
            return UiMode.looping;
        case 16:
            return UiMode.singlePhoto;
        case 17:
            return UiMode.photo;
        case 18:
            return UiMode.nightPhoto;
        case 19:
            return UiMode.burstPhoto;
        case 13:
            return UiMode.timeLapseVideo;
        case 20:
            return UiMode.timeLapsePhoto;
        case 21:
            return UiMode.nightLapsePhoto;
        case 24:
            return UiMode.timeWarpVideo;
        case 25:
            return UiMode.liveBurst;
        case 4:
            return UiMode.playback;
        case 5:
            return UiMode.setup;
        case 22:
            return UiMode.broadcastRecord;
        case 23:
            return UiMode.broadcast;
        default:
            return UiMode.unknown;
    }
}

export function uiModeToModeId(uiMode: UiMode): number {
    switch (uiMode) {
        case UiMode.video:
            return 12;
        case UiMode.looping:
            return 15;
        case UiMode.singlePhoto:
            return 16;
        case UiMode.photo:
            return 17;
        case UiMode.nightPhoto:
            return 18;
        case UiMode.burstPhoto:
            return 19;
        case UiMode.timeLapseVideo:
            return 13;
        case UiMode.timeLapsePhoto:
            return 20;
        case UiMode.nightLapsePhoto:
            return 21;
        case UiMode.timeWarpVideo:
            return 24;
        case UiMode.liveBurst:
            return 25;
        case UiMode.playback:
            return 4;
        case UiMode.setup:
            return 5;
        case UiMode.broadcastRecord:
            return 22;
        case UiMode.broadcast:
            return 23;
        default:
            return 0;
    }
}

export const selectUiModeGroups = createSelector(selectSettingsMetadataSettingsJson, (settingsJson) => {
    switch (settingsJson?.schema_version) {
        case 4:
            return (
                settingsJson.camera_mode_map
                    // There exists another photo mode that is not visible in UI, it's marked as 'mapping_type' = 'read'. Let's ignore it for now.
                    .filter((cameraModeMap) => cameraModeMap.mapping_type === 'read_write')
                    .map((cameraModeMap) => {
                        let uiModeGroup: UiModeGroup;
                        switch (cameraModeMap.wsdk_mode_group_key) {
                            case 'video':
                                uiModeGroup = UiModeGroup.video;
                                break;
                            case 'photo':
                                uiModeGroup = UiModeGroup.photo;
                                break;
                            case 'multishot':
                                uiModeGroup = UiModeGroup.timeLapse;
                                break;
                            default:
                                uiModeGroup = UiModeGroup.unknown;
                                break;
                        }

                        let uiMode: UiMode;
                        switch (cameraModeMap.wsdk_mode_key) {
                            case 'video':
                                uiMode = UiMode.video;
                                break;
                            case 'looping':
                                uiMode = UiMode.looping;
                                break;
                            case 'photo':
                                uiMode = UiMode.photo;
                                break;
                            case 'burst':
                                uiMode = UiMode.burstPhoto;
                                break;
                            case 'night':
                                uiMode = UiMode.nightPhoto;
                                break;
                            case 'video_time_warp':
                                uiMode = UiMode.timeWarpVideo;
                                break;
                            case 'video_time_lapse':
                                uiMode = UiMode.timeLapseVideo;
                                break;
                            case 'photo_time_lapse':
                                uiMode = UiMode.timeLapsePhoto;
                                break;
                            case 'photo_night_lapse':
                                uiMode = UiMode.nightLapsePhoto;
                                break;
                            default:
                                uiMode = UiMode.unknown;
                                break;
                        }

                        return {
                            group: uiModeGroup,
                            mode: uiMode,
                        };
                    })
                    .reduce((acc, curr) => {
                        const foundGroup = acc.find((item) => item.group === curr.group);
                        if (foundGroup) {
                            foundGroup.modes.push(curr.mode);
                        } else {
                            acc.push({
                                group: curr.group,
                                modes: [curr.mode],
                            });
                        }
                        return acc;
                    }, [] as { group: UiModeGroup; modes: UiMode[] }[])
                    .sort((a, b) => a.group - b.group)
            );
        case 5:
            return settingsJson.ui_mode_groups
                .map((group) => {
                    let uiModeGroup: UiModeGroup;
                    switch (group.id) {
                        case 1000:
                            uiModeGroup = UiModeGroup.video;
                            break;
                        case 1001:
                            uiModeGroup = UiModeGroup.photo;
                            break;
                        case 1002:
                            uiModeGroup = UiModeGroup.timeLapse;
                            break;
                        default:
                            uiModeGroup = UiModeGroup.unknown;
                            break;
                    }

                    return {
                        group: uiModeGroup,
                        modes: group.modes.map((modeId) => {
                            switch (modeId) {
                                case 12:
                                    return UiMode.video;
                                case 15:
                                    return UiMode.looping;
                                case 16:
                                    return UiMode.singlePhoto;
                                case 17:
                                    return UiMode.photo;
                                case 18:
                                    return UiMode.nightPhoto;
                                case 19:
                                    return UiMode.burstPhoto;
                                case 13:
                                    return UiMode.timeLapseVideo;
                                case 20:
                                    return UiMode.timeLapsePhoto;
                                case 21:
                                    return UiMode.nightLapsePhoto;
                                case 24:
                                    return UiMode.timeWarpVideo;
                                case 25:
                                    return UiMode.liveBurst;
                                case 4:
                                    return UiMode.playback;
                                case 5:
                                    return UiMode.setup;
                                case 22:
                                    return UiMode.broadcastRecord;
                                case 23:
                                    return UiMode.broadcast;
                                default:
                                    return UiMode.unknown;
                            }
                        }),
                    };
                })
                .sort((a, b) => a.group - b.group);
        default:
            throw new Error('Unknown settings schema version');
    }
});

export const selectCurrentUiMode = createSelector(selectCurrentActiveModeId, (currentActiveModeId) => {
    // looks like for schema 4 and 5 flat mode ids match
    return modeIdToUiMode(currentActiveModeId);
});

export const selectUiModesNames = createCachedSelector(
    selectSettingsMetadataAllSettings,
    selectSettingsMetadataSettingsJson,
    (_: RootState, uiModes: UiMode[]) => uiModes,
    (allSettings, settingsJson, uiModes) => {
        return uiModes.map((uiMode) => {
            let name: string;
            switch (settingsJson?.schema_version) {
                case 4:
                    name = allSettings.find((setting) => setting.id === SCHEMA_V4_CURRENT_MODE_SETTING_ID)?.options.find((o) => o.id === uiModeToModeId(uiMode))?.displayName ?? 'unknown';
                    break;
                case 5:
                    name = settingsJson.modes.find((mode) => mode.id === uiModeToModeId(uiMode))?.display_name ?? 'unknown';
                    break;
                default:
                    name = 'unknown';
                    break;
            }
            return {
                uiMode,
                name,
            };
        });
    }
)((_, uiModes) => uiModes.join(':'));
