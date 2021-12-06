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

export const settingResolution2: SettingMetadata = {
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

export const settingFps3: SettingMetadata = {
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

export const settingFov4: SettingMetadata = {
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

export const settingLowLight8: SettingMetadata = {
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

export const settingProtune10: SettingMetadata = {
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

export const settingWhiteBalance11: SettingMetadata = {
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

export const settingColor12: SettingMetadata = {
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

export const settingIsoMax13: SettingMetadata = {
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

export const settingSharpness14: SettingMetadata = {
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

export const settingEvComp15: SettingMetadata = {
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

export const settingShutter73: SettingMetadata = {
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

export const settingStabilization78: SettingMetadata = {
    id: 0x4e, // 78
    label: 'Stabilization',
    length: 1,
    values: [
        { id: 0x0, label: 'Off' },
        { id: 0x1, label: 'Auto' },
    ],
};

export const settingMicrophone80: SettingMetadata = {
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

export const settingRawAudio81: SettingMetadata = {
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

export const settingIsoMin102: SettingMetadata = {
    id: 0x66, // 102
    label: 'ISO min',
    length: settingIsoMax13.length,
    values: settingIsoMax13.values,
};

export const settingVideoTimer107: SettingMetadata = {
    id: 0x6b, // 107
    label: 'Video Timer',
    length: 1,
    values: [
        { id: 0x0, label: 'Off' },
        { id: 0x1, label: '15s' },
        { id: 0x2, label: '30s' },
    ],
};

export const settingResolutionFormat108: SettingMetadata = {
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

export const videoModeKnownSettings: SettingMetadata[] = [
    settingResolution2,
    settingFps3,
    settingFov4,
    settingLowLight8,
    settingStabilization78,
    settingProtune10,
    settingShutter73,
    settingEvComp15,
    settingWhiteBalance11,
    settingIsoMin102,
    settingIsoMax13,
    settingSharpness14,
    settingColor12,
    settingRawAudio81,
    settingMicrophone80,
    settingVideoTimer107,
    settingResolutionFormat108,
];

export const settingInterval6: SettingMetadata = {
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

export const loopingModeKnownSettings: SettingMetadata[] = [settingResolution2, settingFps3, settingFov4, settingInterval6, settingLowLight8, settingStabilization78];

export const settingSpeed111: SettingMetadata = {
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

export const timewarpModeKnownSettings: SettingMetadata[] = [
    settingResolution2,
    settingSpeed111,
    // But limited to "Wide" only
    settingFov4,
];

export const settingInterval5: SettingMetadata = {
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

export const timelapseVideoModeKnownSettings: SettingMetadata[] = [settingResolution2, settingFov4, settingInterval5];

export const settingInterval30: SettingMetadata = {
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

export const settingFov28: SettingMetadata = {
    id: 0x1c,
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

export const settingEvComp39: SettingMetadata = {
    id: 0x27, // 39
    label: settingEvComp15.label,
    length: settingEvComp15.length,
    values: settingEvComp15.values,
};

export const settingWhiteBalance35: SettingMetadata = {
    id: 0x23, // 35
    label: settingWhiteBalance11.label,
    length: settingWhiteBalance11.length,
    values: settingWhiteBalance11.values,
};

export const settingIsoMin76: SettingMetadata = {
    id: 0x4c, // 76
    label: settingIsoMin102.label,
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

export const settingIsoMax37: SettingMetadata = {
    id: 0x25, // 37
    label: settingIsoMax13.label,
    length: settingIsoMin76.length,
    values: settingIsoMin76.values,
};

export const settingSharpness38: SettingMetadata = {
    id: 0x26, // 38
    label: settingSharpness14.label,
    length: settingSharpness14.length,
    values: settingSharpness14.values,
};

export const settingColor36: SettingMetadata = {
    id: 0x24, // 36
    label: settingColor12.label,
    length: settingColor12.length,
    values: settingColor12.values,
};

export const settingProtune34: SettingMetadata = {
    id: 0x22, // 34
    label: settingProtune10.label,
    length: settingProtune10.length,
    values: settingProtune10.values,
};

export const timelapsePhotoModeKnownSettings: SettingMetadata[] = [
    settingInterval30,
    settingFov28,
    settingEvComp39,
    settingWhiteBalance35,
    settingIsoMin76,
    settingIsoMax37,
    settingSharpness38,
    settingColor36,
    settingProtune34,
];

export const settingShutter31: SettingMetadata = {
    id: 0x1f, // 31
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

export const settingInterval32: SettingMetadata = {
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

export const settingRaw99: SettingMetadata = {
    id: 0x63, // 99
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

export const nightlapseModeKnownSettings: SettingMetadata[] = [
    settingIsoMin76,
    settingIsoMax37,
    settingShutter31,
    settingInterval32,
    settingFov28,
    settingProtune34,
    settingWhiteBalance35,
    settingRaw99,
];

export const settingShutter19: SettingMetadata = {
    id: 0x13, // 19
    label: settingShutter31.label,
    length: settingShutter31.length,
    values: settingShutter31.values,
};

export const settingFov17: SettingMetadata = {
    id: 0x11, // 17
    label: settingFov28.label,
    length: settingFov28.length,
    values: settingFov28.values,
};

export const settingEvComp26: SettingMetadata = {
    id: 0x1a, // 26
    label: settingEvComp15.label,
    length: settingEvComp15.length,
    values: settingEvComp15.values,
};

export const settingWhiteBalance22: SettingMetadata = {
    id: 0x16, // 22
    label: settingWhiteBalance11.label,
    length: settingWhiteBalance11.length,
    values: settingWhiteBalance11.values,
};

export const settingIsoMin75: SettingMetadata = {
    id: 0x4b, // 75
    label: settingIsoMin76.label,
    length: settingIsoMin76.length,
    values: settingIsoMin76.values,
};

export const settingIsoMax24: SettingMetadata = {
    id: 0x18, // 24
    label: settingIsoMax37.label,
    length: settingIsoMax37.length,
    values: settingIsoMax37.values,
};

export const settingSharpness25: SettingMetadata = {
    id: 0x19, // 25
    label: settingSharpness14.label,
    length: settingSharpness14.length,
    values: settingSharpness14.values,
};

export const settingColor23: SettingMetadata = {
    id: 0x17, // 23
    label: settingColor36.label,
    length: settingColor36.length,
    values: settingColor36.values,
};

export const settingProtune21: SettingMetadata = {
    id: 0x15, // 21
    label: settingProtune10.label,
    length: settingProtune10.length,
    values: settingProtune10.values,
};

export const settingRaw98: SettingMetadata = {
    id: 0x62, // 98
    label: settingRaw99.label,
    length: settingRaw99.length,
    values: settingRaw99.values,
};

export const photoNightModeKnownSettings: SettingMetadata[] = [
    settingShutter19,
    settingFov17,
    settingEvComp26,
    settingWhiteBalance22,
    settingIsoMin75,
    settingIsoMax24,
    settingSharpness25,
    settingColor23,
    settingProtune21,
    settingRaw98,
];

const settingBurstRate29: SettingMetadata = {
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

export const photoBurstModeKnownSettings: SettingMetadata[] = [
    settingBurstRate29,
    settingFov28,
    settingProtune34,
    settingEvComp39,
    settingWhiteBalance35,
    settingIsoMin76,
    settingIsoMax37,
    settingSharpness38,
    settingColor36,
];

export const settingSuperPhoto109: SettingMetadata = {
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

export const settingShutter97: SettingMetadata = {
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

export const photoSingleModeKnownSettings: SettingMetadata[] = [
    settingFov17,
    settingSuperPhoto109,
    settingProtune21,
    settingShutter97,
    settingEvComp26,
    settingWhiteBalance22,
    settingIsoMin75,
    settingIsoMax24,
    settingSharpness25,
    settingColor23,
];

export const settingBeeps87: SettingMetadata = {
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

export const settingDefaultMode89: SettingMetadata = {
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

export const settingLeds91: SettingMetadata = {
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

export const settingVideoCompression106: SettingMetadata = {
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

export const settingVoiceControl86: SettingMetadata = {
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

export const settingWakeOnVoice104: SettingMetadata = {
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

export const settingVoiceControlLanguage85: SettingMetadata = {
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

export const settingTouchDisplayLandscapeLock112: SettingMetadata = {
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

export const settingTouchDisplayScreenSaver51: SettingMetadata = {
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

export const settingTouchDisplayBrightness88: SettingMetadata = {
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

export const settingRegionalGps83: SettingMetadata = {
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

export const settingRegionalLanguage84: SettingMetadata = {
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

/*
Regional Video format
    NTSC
    PAL
    TODO CHANGED VALUES:
        // Not sure which one means this setting
        42 = 5 -> 6
        57 = 0 -> 1

*/

export const generalSettings: SettingMetadata[] = [
    settingBeeps87,
    settingDefaultMode89,
    settingLeds91,
    settingVideoCompression106,
    settingVoiceControl86,
    settingWakeOnVoice104,
    settingVoiceControlLanguage85,
    settingTouchDisplayLandscapeLock112,
    settingTouchDisplayScreenSaver51,
    settingTouchDisplayBrightness88,
    settingRegionalGps83,
    settingRegionalLanguage84,
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
