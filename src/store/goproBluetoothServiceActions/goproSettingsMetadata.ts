/* eslint-disable no-bitwise */
export interface SettingValueMetadata {
    id: number;
    label: string;
}

export interface SettingMetadata {
    id: number;
    label: string;
    length: number;
    values: SettingValueMetadata[];
}

export const settingVideoResolution2: SettingMetadata = {
    id: 0x2,
    label: 'Resolution',
    length: 1,
    values: [
        {
            id: 0x12, // 18
            label: '4K (4:3)',
        },
        {
            id: 0x6,
            label: '2.7K (4:3)',
        },
        {
            id: 0x7,
            label: '1440 (4:3)',
        },
        {
            id: 0xa, // 10
            label: '960 (4:3)',
        },
        {
            id: 0x1,
            label: '4K',
        },
        {
            id: 0x4,
            label: '2.7K',
        },
        {
            id: 0x9,
            label: '1080',
        },
        {
            id: 0xc, // 12
            label: '720',
        },
    ],
};

export const settingVideoFps3: SettingMetadata = {
    id: 0x3,
    label: 'FPS',
    length: 1,
    values: [
        {
            id: 0x0,
            label: '240',
        },
        {
            id: 0x1,
            label: '120',
        },
        {
            id: 0x5,
            label: '60',
        },
        {
            id: 0x8,
            label: '30',
        },
        {
            id: 0xa, // 10
            label: '24',
        },
    ],
};

export const settingVideoFov4: SettingMetadata = {
    id: 0x4,
    label: 'FOV',
    length: 1,
    values: [
        {
            id: 0x4,
            label: 'Linear',
        },
        {
            id: 0x0,
            label: 'Wide',
        },
        {
            id: 0x3,
            label: 'Super view',
        },
    ],
};

export const settingVideoInterval5: SettingMetadata = {
    id: 0x5,
    label: 'Interval',
    length: 1,
    values: [
        {
            id: 0x0,
            label: '0.5s',
        },
        {
            id: 0x1,
            label: '1s',
        },
        {
            id: 0x2,
            label: '2s',
        },

        {
            id: 0x3,
            label: '5s',
        },
        {
            id: 0x4,
            label: '10s',
        },
        {
            id: 0x5,
            label: '30s',
        },
        {
            id: 0x6,
            label: '60s',
        },
    ],
};

export const settingVideoInterval6: SettingMetadata = {
    id: 0x6,
    label: 'Interval',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'MAX',
        },
        {
            id: 0x1,
            label: '5m',
        },
        {
            id: 0x2,
            label: '20m',
        },
        {
            id: 0x3,
            label: '60m',
        },
        {
            id: 0x4,
            label: '120m',
        },
    ],
};

export const settingVideoLowLight8: SettingMetadata = {
    id: 0x8,
    label: 'Low light',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'Off',
        },
        {
            id: 0x1,
            label: 'Auto',
        },
    ],
};

export const settingVideoProtune10: SettingMetadata = {
    id: 0xa, // 10
    label: 'Protune',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'Off',
        },
        {
            id: 0x1,
            label: 'On',
        },
    ],
};

export const settingVideoWhiteBalance11: SettingMetadata = {
    id: 0xb, // 11
    label: 'White Balance',
    length: 1,
    values: [
        { id: 0x0, label: 'Auto' },
        { id: 0x8, label: '2300K' },
        { id: 0x9, label: '2800K' },
        {
            id: 0xa, // 10
            label: '3200K',
        },
        { id: 0x5, label: '4000K' },
        {
            id: 0xb, // 11
            label: '4500K',
        },
        {
            id: 0xc, // 12
            label: '5000K',
        },
        { id: 0x2, label: '5500K' },
        { id: 0x7, label: '6000K' },
        { id: 0x3, label: '6500K' },
        { id: 0x4, label: 'Native' },
    ],
};

export const settingVideoColor12: SettingMetadata = {
    id: 0xc, // 12
    label: 'Color',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'GoPro',
        },
        {
            id: 0x1,
            label: 'Flat',
        },
    ],
};

export const settingVideoIsoMax13: SettingMetadata = {
    id: 0xd, // 13
    label: 'ISO max',
    length: 1,
    values: [
        {
            id: 0x0,
            label: '6400',
        },
        {
            id: 0x3,
            label: '3200',
        },
        {
            id: 0x1,
            label: '1600',
        },
        {
            id: 0x4,
            label: '800',
        },
        {
            id: 0x2,
            label: '400',
        },
        {
            id: 0x7,
            label: '200',
        },
        {
            id: 0x8,
            label: '100',
        },
    ],
};

export const settingVideoSharpness14: SettingMetadata = {
    id: 0xe, // 14
    label: 'Sharpness',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'High',
        },
        {
            id: 0x1,
            label: 'Medium',
        },
        {
            id: 0x2,
            label: 'Low',
        },
    ],
};

export const settingVideoEvComp15: SettingMetadata = {
    id: 0xf, // 15
    label: 'EV comp',
    length: 1,
    values: [
        {
            id: 0x0,
            label: '+2',
        },
        {
            id: 0x1,
            label: '+1.5',
        },
        {
            id: 0x2,
            label: '+1',
        },
        {
            id: 0x3,
            label: '+0.5',
        },
        {
            id: 0x4,
            label: '0',
        },
        {
            id: 0x5,
            label: '-0.5',
        },
        {
            id: 0x6,
            label: '-1',
        },
        {
            id: 0x7,
            label: '-1.5',
        },
        {
            id: 0x8,
            label: '-2',
        },
    ],
};

export const settingPhotoFov17: SettingMetadata = {
    id: 0x11, // 17
    label: 'FOV',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'Wide',
        },
        {
            id: 0xa, // 10
            label: 'Linear',
        },
    ],
};

export const settingPhotoShutter19: SettingMetadata = {
    id: 0x13, // 19
    label: 'Shutter',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'Auto',
        },
        {
            id: 0x6,
            label: '30s',
        },
        {
            id: 0x5,
            label: '20s',
        },
        {
            id: 0x4,
            label: '15s',
        },
        {
            id: 0x3,
            label: '10s',
        },
        {
            id: 0x2,
            label: '5s',
        },
        {
            id: 0x1,
            label: '2s',
        },
    ],
};

export const settingPhotoProtune21: SettingMetadata = {
    id: 0x15, // 21
    label: settingVideoProtune10.label,
    length: settingVideoProtune10.length,
    values: settingVideoProtune10.values,
};

export const settingPhotoWhiteBalance22: SettingMetadata = {
    id: 0x16, // 22
    label: settingVideoWhiteBalance11.label,
    length: settingVideoWhiteBalance11.length,
    values: settingVideoWhiteBalance11.values,
};

export const settingPhotoColor23: SettingMetadata = {
    id: 0x17, // 23
    label: settingVideoColor12.label,
    length: settingVideoColor12.length,
    values: settingVideoColor12.values,
};

export const settingPhotoIsoMax24: SettingMetadata = {
    id: 0x18, // 24
    label: settingVideoIsoMax13.label,
    length: 1,
    values: [
        {
            id: 0x0,
            label: '800',
        },
        {
            id: 0x1,
            label: '400',
        },
        {
            id: 0x2,
            label: '200',
        },
        {
            id: 0x3,
            label: '100',
        },
        {
            id: 0x4,
            label: '1600',
        },
        {
            id: 0x5,
            label: '3200',
        },
    ],
};

export const settingPhotoSharpness25: SettingMetadata = {
    id: 0x19, // 25
    label: settingVideoSharpness14.label,
    length: settingVideoSharpness14.length,
    values: settingVideoSharpness14.values,
};

export const settingPhotoEvComp26: SettingMetadata = {
    id: 0x1a, // 26
    label: settingVideoEvComp15.label,
    length: settingVideoEvComp15.length,
    values: settingVideoEvComp15.values,
};

export const settingMultishotFov28: SettingMetadata = {
    id: 0x1c, // 28
    label: settingPhotoFov17.label,
    length: settingPhotoFov17.length,
    values: settingPhotoFov17.values,
};

export const settingMultishotBurstRate29: SettingMetadata = {
    id: 0x1d, // 29
    label: 'Burst Rate',
    length: 1,
    values: [
        {
            id: 0x9,
            label: 'Auto',
        },
        {
            id: 0x8,
            label: '30/6s',
        },
        {
            id: 0x7,
            label: '30/3s',
        },
        {
            id: 0x6,
            label: '30/2s',
        },
        {
            id: 0x5,
            label: '30/1s',
        },
        {
            id: 0x4,
            label: '10/3s',
        },
        {
            id: 0x3,
            label: '10/2s',
        },
        {
            id: 0x2,
            label: '10/1s',
        },
        {
            id: 0x1,
            label: '5/1s',
        },
        {
            id: 0x0,
            label: '3/1s',
        },
    ],
};

export const settingMultishotInterval30: SettingMetadata = {
    id: 0x1e, // 30
    label: 'Interval',
    length: 1,
    values: [
        {
            id: 0x0,
            label: '0.5s',
        },
        {
            id: 0x1,
            label: '1s',
        },
        {
            id: 0x2,
            label: '2s',
        },
        {
            id: 0x5,
            label: '5s',
        },
        {
            id: 0xa, // 10
            label: '10s',
        },
        {
            id: 0x1e, // 30
            label: '30s',
        },
        {
            id: 0x3c, // 60
            label: '60s',
        },
    ],
};

export const settingMultishotShutter31: SettingMetadata = {
    id: 0x1f, // 31
    label: settingPhotoShutter19.label,
    length: settingPhotoShutter19.length,
    values: settingPhotoShutter19.values,
};

export const settingMultishotInterval32: SettingMetadata = {
    id: 0x20, // 32
    label: 'Interval',
    length: 4,
    values: [
        {
            id: (0xe << 8) + 0x11,
            label: 'Auto',
        },
        {
            id: (0x0 << 8) + 0x4,
            label: '4s',
        },
        {
            id: (0x0 << 8) + 0x5,
            label: '5s',
        },
        {
            id: (0x0 << 8) + 0xa,
            label: '10s',
        },
        {
            id: (0x0 << 8) + 0x14,
            label: '20s',
        },
        {
            id: (0x0 << 8) + 0x3c,
            label: '1m',
        },
        {
            id: (0x0 << 8) + 0x78,
            label: '2m',
        },
        {
            id: (0x1 << 8) + 0x2c,
            label: '5m',
        },
        {
            id: (0x7 << 8) + 0x8,
            label: '30m',
        },
        {
            id: (0xe << 8) + 0x10,
            label: '60m',
        },
    ],
};

export const settingMultishotProtune34: SettingMetadata = {
    id: 0x22, // 34
    label: settingVideoProtune10.label,
    length: settingVideoProtune10.length,
    values: settingVideoProtune10.values,
};

export const settingMultishotWhiteBalance35: SettingMetadata = {
    id: 0x23, // 35
    label: settingVideoWhiteBalance11.label,
    length: settingVideoWhiteBalance11.length,
    values: settingVideoWhiteBalance11.values,
};

export const settingMultishotColor36: SettingMetadata = {
    id: 0x24, // 36
    label: settingVideoColor12.label,
    length: settingVideoColor12.length,
    values: settingVideoColor12.values,
};

export const settingMultishotIsoMax37: SettingMetadata = {
    id: 0x25, // 37
    label: settingVideoIsoMax13.label,
    length: settingPhotoIsoMax24.length,
    values: settingPhotoIsoMax24.values,
};

export const settingMultishotSharpness38: SettingMetadata = {
    id: 0x26, // 38
    label: settingVideoSharpness14.label,
    length: settingVideoSharpness14.length,
    values: settingVideoSharpness14.values,
};

export const settingMultishotEvComp39: SettingMetadata = {
    id: 0x27, // 39
    label: settingVideoEvComp15.label,
    length: settingVideoEvComp15.length,
    values: settingVideoEvComp15.values,
};

export const settingGeneralTouchDisplayScreenSaver51: SettingMetadata = {
    id: 0x33, // 51
    label: 'Touch Display Screen Saver',
    length: 1,
    values: [
        {
            id: 0x1,
            label: '1min',
        },
        {
            id: 0x2,
            label: '2min',
        },
        {
            id: 0x3,
            label: '3min',
        },
        {
            id: 0x0,
            label: 'Never',
        },
    ],
};

export const settingGeneralQuickCapture54: SettingMetadata = {
    id: 0x36, // 54
    label: 'Quick Capture',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'Off',
        },
        {
            id: 0x1,
            label: 'On',
        },
    ],
};

export const settingVideoShutter73: SettingMetadata = {
    id: 0x49, // 73
    label: 'Shutter',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'Auto',
        },
        {
            id: 0x8,
            label: '1/60',
        },
        {
            id: 0xd, // 13
            label: '1/120',
        },
        {
            id: 0x12, // 18
            label: '1/240',
        },
        {
            id: 0x16, // 22
            label: '1/480',
        },
        {
            id: 0x17, // 23
            label: '1/960',
        },
    ],
};

export const settingPhotoIsoMin75: SettingMetadata = {
    id: 0x4b, // 75
    label: 'ISO min',
    length: settingPhotoIsoMax24.length,
    values: settingPhotoIsoMax24.values,
};

export const settingMultishotIsoMin76: SettingMetadata = {
    id: 0x4c, // 76
    label: settingPhotoIsoMin75.label,
    length: settingPhotoIsoMax24.length,
    values: settingPhotoIsoMax24.values,
};

export const settingVideoStabilization78: SettingMetadata = {
    id: 0x4e, // 78
    label: 'Stabilization',
    length: 1,
    values: [
        { id: 0x0, label: 'Off' },
        { id: 0x1, label: 'Auto' },
    ],
};

export const settingVideoMicrophone80: SettingMetadata = {
    id: 0x50, // 80
    label: 'Microphone',
    length: 1,
    values: [
        {
            id: 0x2,
            label: 'Auto',
        },
        {
            id: 0x1,
            label: 'Wind',
        },
        {
            id: 0x0,
            label: 'Stereo',
        },
    ],
};

export const settingVideoRawAudio81: SettingMetadata = {
    id: 0x51, // 81
    label: 'Raw audio',
    length: 1,
    values: [
        {
            id: 0x3,
            label: 'Off',
        },
        {
            id: 0x0,
            label: 'Low',
        },
        {
            id: 0x1,
            label: 'Medium',
        },
        {
            id: 0x2,
            label: 'High',
        },
    ],
};

export const settingGeneralRegionalGps83: SettingMetadata = {
    id: 0x53, // 83
    label: 'Regional GPS',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'Off',
        },
        {
            id: 0x1,
            label: 'On',
        },
    ],
};

export const settingGeneralRegionalLanguage84: SettingMetadata = {
    id: 0x54, // 84
    label: 'Regional Language',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'English',
        },
        {
            id: 0x6,
            label: 'French',
        },
        // TODO
    ],
};

export const settingGeneralVoiceControlLanguage85: SettingMetadata = {
    id: 0x55, // 85
    label: 'Voice Control Language',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'English (US)',
        },
        {
            id: 0x1,
            label: 'English (UK)',
        },
        {
            id: 0xd,
            label: 'English (India)',
        },
        // TODO
    ],
};

export const settingGeneralVoiceControl86: SettingMetadata = {
    id: 0x56, // 86
    label: 'Voice Control',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'Off',
        },
        {
            id: 0x1,
            label: 'On',
        },
    ],
};

export const settingGeneralBeeps87: SettingMetadata = {
    id: 0x57, // 87
    label: 'Beeps',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'Mute',
        },
        {
            id: 0x64, // 100
            label: 'High',
        },
        {
            id: 0x46, // 70
            label: 'Medium',
        },
        {
            id: 0x28, // 40
            label: 'Low',
        },
    ],
};

export const settingGeneralTouchDisplayBrightness88: SettingMetadata = {
    id: 0x58, // 88
    label: 'Touch Display Brightness',
    length: 1,
    values: [
        {
            id: 0x64, // 100
            label: '100%',
        },
        {
            id: 0x50, // 80
            label: '80%',
        },
        {
            id: 0xa,
            label: '10%',
        },
        // TODO This is supposed to be slider
    ],
};

export const settingGeneralDefaultMode89: SettingMetadata = {
    id: 0x59, // 89
    label: 'Default Mode',
    length: 1,
    values: [
        {
            id: 0xc, // 12
            label: 'Video',
        },
        {
            id: 0xf, // 15
            label: 'Looping',
        },
        {
            id: 0x11, // 17
            label: 'Photo',
        },
        {
            id: 0x12, // 18
            label: 'Night',
        },
        {
            id: 0x13, // 19
            label: 'Burst',
        },
        {
            id: 0x18, // 24
            label: 'Timewarp Video',
        },
        {
            id: 0xd, // 13
            label: 'Timelapse Video',
        },
        {
            id: 0x14, // 20
            label: 'Timelapse Photo',
        },
        {
            id: 0x15, // 21
            label: 'Nightlapse Photo',
        },
    ],
};

export const settingGeneralLeds91: SettingMetadata = {
    id: 0x5b, // 91
    label: 'LEDs',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'All Off',
        },
        {
            id: 0x1,
            label: 'Front Off Only',
        },
        {
            id: 0x2,
            label: 'All On',
        },
    ],
};

export const settingsCurrentMode92: SettingMetadata = {
    id: 0x5c, // 92
    label: 'Current Mode',
    length: settingGeneralDefaultMode89.length,
    values: settingGeneralDefaultMode89.values,
};

export const settingPhotoShutter97: SettingMetadata = {
    id: 0x61, // 97
    label: 'Shutter',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'Auto',
        },
        {
            id: 0x1,
            label: '1/125',
        },
        {
            id: 0x2,
            label: '1/250',
        },
        {
            id: 0x3,
            label: '1/500',
        },
        {
            id: 0x4,
            label: '1/1000',
        },
        {
            id: 0x5,
            label: '1/2000',
        },
    ],
};

export const settingPhotoRaw98: SettingMetadata = {
    id: 0x62, // 98
    label: 'RAW',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'Off',
        },
        {
            id: 0x1,
            label: 'On',
        },
    ],
};

export const settingMultishotRaw99: SettingMetadata = {
    id: 0x63, // 99
    label: settingPhotoRaw98.label,
    length: settingPhotoRaw98.length,
    values: settingPhotoRaw98.values,
};

export const settingVideoIsoMin102: SettingMetadata = {
    id: 0x66, // 102
    label: settingPhotoIsoMin75.label,
    length: settingVideoIsoMax13.length,
    values: settingVideoIsoMax13.values,
};

export const settingGeneralWakeOnVoice104: SettingMetadata = {
    id: 0x68, // 104
    label: 'Wake On Voice',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'Off',
        },
        {
            id: 0x1,
            label: 'On',
        },
    ],
};

export const settingGeneralVideoCompression106: SettingMetadata = {
    id: 0x6a, // 106
    label: 'Video Compression',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'H264',
        },
        {
            id: 0x1,
            label: 'HEVC',
        },
    ],
};

export const settingVideoVideoTimer107: SettingMetadata = {
    id: 0x6b, // 107
    label: 'Video Timer',
    length: 1,
    values: [
        { id: 0x0, label: 'Off' },
        { id: 0x1, label: '15s' },
        { id: 0x2, label: '30s' },
    ],
};

export const settingVideoResolutionFormat108: SettingMetadata = {
    id: 0x6c, // 108
    label: 'Resolution format',
    length: 1,
    values: [
        {
            id: 0x0,
            label: '4:3',
        },
        {
            id: 0x1,
            label: '16:9',
        },
    ],
};

export const settingPhotoSuperPhoto109: SettingMetadata = {
    id: 0x6d, // 109
    label: 'Super Photo',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'Off',
        },
        {
            id: 0x1,
            label: 'Auto',
        },
        {
            id: 0x2,
            label: 'HDR On',
        },
    ],
};

export const settingVideoSpeed111: SettingMetadata = {
    id: 0x6f, // 111
    label: 'Speed',
    length: 1,
    values: [
        {
            id: 0x0,
            label: '15x',
        },
        {
            id: 0x1,
            label: '30x',
        },
        {
            id: 0x7,
            label: '2x',
        },
        {
            id: 0x8,
            label: '5x',
        },
        {
            id: 0x9,
            label: '10x',
        },
    ],
};

export const settingGeneralTouchDisplayLandscapeLock112: SettingMetadata = {
    id: 0x70, // 112
    label: 'Touch Display Landscape Lock',
    length: 1,
    values: [
        {
            id: 0x0,
            label: 'Off',
        },
        {
            id: 0x1,
            label: 'Up',
        },
        {
            id: 0x2,
            label: 'Down',
        },
    ],
};

/*
Regional Video format
    NTSC
    PAL
    TODO CHANGED VALUES:
        // Not sure which one means this setting
        42 = 5 -> 6
        57 = 0 -> 1

*/

export const videoModeKnownSettings: SettingMetadata[] = [
    settingVideoResolution2,
    settingVideoFps3,
    settingVideoFov4,
    settingVideoLowLight8,
    settingVideoStabilization78,
    settingVideoProtune10,
    settingVideoShutter73,
    settingVideoEvComp15,
    settingVideoWhiteBalance11,
    settingVideoIsoMin102,
    settingVideoIsoMax13,
    settingVideoSharpness14,
    settingVideoColor12,
    settingVideoRawAudio81,
    settingVideoMicrophone80,
    settingVideoVideoTimer107,
    settingVideoResolutionFormat108,
];

export const loopingModeKnownSettings: SettingMetadata[] = [settingVideoResolution2, settingVideoFps3, settingVideoFov4, settingVideoInterval6, settingVideoLowLight8, settingVideoStabilization78];

export const timewarpModeKnownSettings: SettingMetadata[] = [
    settingVideoResolution2,
    settingVideoSpeed111,
    // But limited to "Wide" only
    settingVideoFov4,
];

export const timelapseVideoModeKnownSettings: SettingMetadata[] = [settingVideoResolution2, settingVideoFov4, settingVideoInterval5];

export const timelapsePhotoModeKnownSettings: SettingMetadata[] = [
    settingMultishotInterval30,
    settingMultishotFov28,
    settingMultishotEvComp39,
    settingMultishotWhiteBalance35,
    settingMultishotIsoMin76,
    settingMultishotIsoMax37,
    settingMultishotSharpness38,
    settingMultishotColor36,
    settingMultishotProtune34,
];

export const nightlapseModeKnownSettings: SettingMetadata[] = [
    settingMultishotIsoMin76,
    settingMultishotIsoMax37,
    settingMultishotShutter31,
    settingMultishotInterval32,
    settingMultishotFov28,
    settingMultishotProtune34,
    settingMultishotWhiteBalance35,
    settingMultishotRaw99,
];

export const photoNightModeKnownSettings: SettingMetadata[] = [
    settingPhotoShutter19,
    settingPhotoFov17,
    settingPhotoEvComp26,
    settingPhotoWhiteBalance22,
    settingPhotoIsoMin75,
    settingPhotoIsoMax24,
    settingPhotoSharpness25,
    settingPhotoColor23,
    settingPhotoProtune21,
    settingPhotoRaw98,
];

export const photoBurstModeKnownSettings: SettingMetadata[] = [
    settingMultishotBurstRate29,
    settingMultishotFov28,
    settingMultishotProtune34,
    settingMultishotEvComp39,
    settingMultishotWhiteBalance35,
    settingMultishotIsoMin76,
    settingMultishotIsoMax37,
    settingMultishotSharpness38,
    settingMultishotColor36,
];

export const photoSingleModeKnownSettings: SettingMetadata[] = [
    settingPhotoFov17,
    settingPhotoSuperPhoto109,
    settingPhotoProtune21,
    settingPhotoShutter97,
    settingPhotoEvComp26,
    settingPhotoWhiteBalance22,
    settingPhotoIsoMin75,
    settingPhotoIsoMax24,
    settingPhotoSharpness25,
    settingPhotoColor23,
];

export const generalSettings: SettingMetadata[] = [
    settingGeneralQuickCapture54,
    settingGeneralBeeps87,
    settingGeneralDefaultMode89,
    settingGeneralLeds91,
    settingGeneralVideoCompression106,
    settingGeneralVoiceControl86,
    settingGeneralWakeOnVoice104,
    settingGeneralVoiceControlLanguage85,
    settingGeneralTouchDisplayLandscapeLock112,
    settingGeneralTouchDisplayScreenSaver51,
    settingGeneralTouchDisplayBrightness88,
    settingGeneralRegionalGps83,
    settingGeneralRegionalLanguage84,
];

export const allKnownSettings: SettingMetadata[] = [
    ...videoModeKnownSettings,
    ...loopingModeKnownSettings,
    ...timewarpModeKnownSettings,
    ...timelapseVideoModeKnownSettings,
    ...timelapsePhotoModeKnownSettings,
    ...nightlapseModeKnownSettings,
    ...photoNightModeKnownSettings,
    ...photoBurstModeKnownSettings,
    ...photoSingleModeKnownSettings,
    ...generalSettings,
];
