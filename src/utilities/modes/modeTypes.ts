import {
    legacyPresetsLoadPresetBurstPhotoCommand,
    legacyPresetsLoadPresetLoopingVideoCommand,
    legacyPresetsLoadPresetNightLapsePhotoCommand,
    legacyPresetsLoadPresetNightPhotoCommand,
    legacyPresetsLoadPresetPhotoCommand,
    legacyPresetsLoadPresetTimeLapsePhotoCommand,
    legacyPresetsLoadPresetTimeLapseVideoCommand,
    legacyPresetsLoadPresetTimewarpCommand,
    legacyPresetsLoadPresetVideoCommand,
} from 'store/goproBluetoothServiceActions/commands/commands';

export enum SettingsModesGroups {
    video,
    photo,
    timelapse,
}

export enum SettingsModesVideo {
    video = 0xc,
    videoLooping = 0xf,
}

export enum SettingsModesPhoto {
    photoSingle = 0x11,
    photoNight = 0x12,
    photoBurst = 0x13,
}

export enum SettingsModesTimelapse {
    timelapseTimewarp = 0x18,
    timelapseVideo = 0xd,
    timelapsePhoto = 0x14,
    nightlapse = 0x15,
}

export enum SettingsModesMenus {
    galleryView = 0x04,
}

export const SettingsModes = {
    ...SettingsModesVideo,
    ...SettingsModesPhoto,
    ...SettingsModesTimelapse,
    ...SettingsModesMenus,
};
export type SettingsModes = SettingsModesVideo | SettingsModesPhoto | SettingsModesTimelapse;

export function getModesByGroup(group: SettingsModesGroups) {
    switch (group) {
        case SettingsModesGroups.video:
            return [SettingsModes.video, SettingsModes.videoLooping];
        case SettingsModesGroups.photo:
            return [SettingsModes.photoSingle, SettingsModes.photoBurst, SettingsModes.photoNight];
        case SettingsModesGroups.timelapse:
            return [SettingsModes.timelapseTimewarp, SettingsModes.timelapseVideo, SettingsModes.timelapsePhoto, SettingsModes.nightlapse];
        default:
            return [];
    }
}

export function getModelLabel(mode: SettingsModes) {
    switch (mode) {
        case SettingsModes.video:
            return 'Video';
        case SettingsModes.videoLooping:
            return 'Looping Video';
        case SettingsModes.photoSingle:
            return 'Single';
        case SettingsModes.photoBurst:
            return 'Burst';
        case SettingsModes.photoNight:
            return 'Night';
        case SettingsModes.timelapseTimewarp:
            return 'Timewarp';
        case SettingsModes.timelapseVideo:
            return 'Video';
        case SettingsModes.timelapsePhoto:
            return 'Photo';
        case SettingsModes.nightlapse:
            return 'Nightlapse';
        default:
            return 'unknown';
    }
}

export function getCommandToChangeMode(mode: SettingsModes) {
    switch (mode) {
        case SettingsModes.video:
            return legacyPresetsLoadPresetVideoCommand;
        case SettingsModes.videoLooping:
            return legacyPresetsLoadPresetLoopingVideoCommand;
        case SettingsModes.photoSingle:
            return legacyPresetsLoadPresetPhotoCommand;
        case SettingsModes.photoBurst:
            return legacyPresetsLoadPresetBurstPhotoCommand;
        case SettingsModes.photoNight:
            return legacyPresetsLoadPresetNightPhotoCommand;
        case SettingsModes.timelapseTimewarp:
            return legacyPresetsLoadPresetTimewarpCommand;
        case SettingsModes.timelapseVideo:
            return legacyPresetsLoadPresetTimeLapseVideoCommand;
        case SettingsModes.timelapsePhoto:
            return legacyPresetsLoadPresetTimeLapsePhotoCommand;
        case SettingsModes.nightlapse:
            return legacyPresetsLoadPresetNightLapsePhotoCommand;
        default:
            return legacyPresetsLoadPresetVideoCommand;
    }
}
