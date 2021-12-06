export interface StatusValueMetadata {
    id: number;
    label: string;
}

export interface StatusMetadata {
    id: number;
    label: string;
    description: string;
    type: string;
    values: StatusValueMetadata[];
}

const booleanValue: StatusValueMetadata[] = [
    { id: 0, label: 'False' },
    { id: 1, label: 'True' },
];

export const statusInternalCameraPresent1: StatusMetadata = {
    id: 1,
    label: 'Internal camera present',
    description: 'Is the internal camera present?',
    type: 'boolean',
    values: booleanValue,
};

export const statusInternalBatteryLevel2: StatusMetadata = {
    id: 2,
    label: 'Internal battery level',
    description: 'Rough approximation of internal battery level in bars',
    type: 'integer',
    values: [
        {
            id: 0,
            label: 'Zero',
        },
        {
            id: 1,
            label: 'One',
        },
        {
            id: 2,
            label: 'Two',
        },
        {
            id: 3,
            label: 'Three',
        },
    ],
};

export const statusExternalBatteryPresent3: StatusMetadata = {
    id: 3,
    label: 'External battery present',
    description: 'Is an external battery connected?',
    type: 'boolean',
    values: booleanValue,
};

export const statusExternalBatteryLevel4: StatusMetadata = {
    id: 4,
    label: 'External battery level',
    description: 'External battery power level in percent',
    type: 'percent',
    values: [
        { id: 0, label: '0%' },
        { id: 100, label: '100%' },
    ],
};

export const statusSystemHot6: StatusMetadata = {
    id: 6,
    label: 'System hot',
    description: 'Is the system currently overheating?',
    type: 'boolean',
    values: booleanValue,
};

export const statusSystemBusy8: StatusMetadata = {
    id: 8,
    label: 'System busy',
    description: 'Is the camera busy?',
    type: 'boolean',
    values: booleanValue,
};

export const statusQuickCaptureActive9: StatusMetadata = {
    id: 9,
    label: 'Quick capture active',
    description: 'Is Quick Capture feature enabled?',
    type: 'boolean',
    values: booleanValue,
};

export const statusEncodingActive10: StatusMetadata = {
    id: 10,
    label: 'Encoding active',
    description: 'Is the system encoding right now?',
    type: 'boolean',
    values: booleanValue,
};

export const statusLcdLockActive11: StatusMetadata = {
    id: 11,
    label: 'Lcd lock active',
    description: 'Is LCD lock active?',
    type: 'boolean',
    values: booleanValue,
};
export const statusVideoProgressCounter13: StatusMetadata = {
    id: 13,
    label: 'Video progress counter',
    description: 'When encoding video, this is the duration (seconds) of the video so far; 0 otherwise',
    type: 'integer',
    values: [
        {
            id: 0,
            label: '0s',
        },
        {
            id: 59,
            label: '59s',
        },
    ],
};
export const statusEnable17: StatusMetadata = { id: 17, label: 'Enable', description: 'Are Wireless Connections enabled?', type: 'boolean', values: booleanValue };
export const statusState19: StatusMetadata = {
    id: 19,
    label: 'State',
    description: 'The pairing state of the camera',
    type: 'integer',
    values: [
        {
            id: 0,
            label: 'Success',
        },
        {
            id: 1,
            label: 'In Progress',
        },
        {
            id: 2,
            label: 'Failed',
        },
        {
            id: 3,
            label: 'Stopped',
        },
    ],
};
export const statusType20: StatusMetadata = {
    id: 20,
    label: 'Type',
    description: 'The last type of pairing that the camera was engaged in',
    type: 'integer',
    values: [
        {
            id: 0,
            label: 'Not Pairing',
        },
        {
            id: 1,
            label: 'Pairing App',
        },
        {
            id: 2,
            label: 'Pairing Remote Control',
        },
        {
            id: 3,
            label: 'Pairing Bluetooth Device',
        },
    ],
};
export const statusPairTime21: StatusMetadata = {
    id: 21,
    label: 'Pair time',
    description: 'Time (milliseconds) since boot of last successful pairing complete action',
    type: 'integer',
    values: [],
};
export const statusState22: StatusMetadata = {
    id: 22,
    label: 'State',
    description: 'State of current scan for WiFi Access Points. Appears to only change for CAH-related scans',
    type: 'integer',
    values: [
        { id: 0, label: 'Never started' },
        { id: 1, label: 'Started' },
        { id: 2, label: 'Aborted' },
        { id: 3, label: 'Canceled' },
        { id: 4, label: 'Completed' },
    ],
};
export const statusScanTimeMsec23: StatusMetadata = {
    id: 23,
    label: 'Scan time msec',
    description: 'The time, in milliseconds since boot that the WiFi Access Point scan completed',
    type: 'integer',
    values: [],
};
export const statusProvisionStatus24: StatusMetadata = {
    id: 24,
    label: 'Provision status',
    description: 'WiFi AP provisioning state',
    type: 'integer',
    values: [
        { id: 0, label: 'Never started' },
        { id: 1, label: 'Started' },
        { id: 2, label: 'Aborted' },
        { id: 3, label: 'Canceled' },
        { id: 4, label: 'Completed' },
    ],
};
export const statusRemoteControlVersion26: StatusMetadata = {
    id: 26,
    label: 'Remote control version',
    description: 'Wireless remote control version',
    type: 'integer',
    values: [],
};
export const statusRemoteControlConnected27: StatusMetadata = {
    id: 27,
    label: 'Remote control connected',
    description: 'Is a wireless remote control connected?',
    type: 'boolean',
    values: booleanValue,
};
export const statusPairing28: StatusMetadata = {
    id: 28,
    label: 'Pairing',
    description: 'Wireless Pairing State',
    type: 'integer',
    values: [],
};
export const statusWlanSsid29: StatusMetadata = {
    id: 29,
    label: 'Wlan ssid',
    description: 'Provisioned WIFI AP SSID. On BLE connection, value is big-endian byte-encoded int',
    type: 'string',
    values: [],
};
export const statusApSsid30: StatusMetadata = {
    id: 30,
    label: 'Ap ssid',
    description: `Camera's WIFI SSID. On BLE connection, value is big-endian byte-encoded int`,
    type: 'string',
    values: [],
};
export const statusAppCount31: StatusMetadata = {
    id: 31,
    label: 'App count',
    description: 'The number of wireless devices connected to the camera',
    type: 'integer',
    values: [],
};
export const statusEnable32: StatusMetadata = { id: 32, label: 'Enable', description: 'Is Preview Stream enabled?', type: 'boolean', values: booleanValue };
export const statusSdStatus33: StatusMetadata = {
    id: 33,
    label: 'Sd status',
    description: 'Primary Storage Status',
    type: 'integer',
    values: [
        { id: -1, label: 'Unknown' },
        { id: 0, label: 'OK' },
        { id: 1, label: 'SD Card Full' },
        { id: 2, label: 'SD Card Removed' },
        { id: 3, label: 'SD Card Format Error' },
        { id: 4, label: 'SD Card Busy' },
        { id: 8, label: 'SD Card Swapped' },
    ],
};
export const statusRemainingPhotos34: StatusMetadata = {
    id: 34,
    label: 'Remaining photos',
    description: 'How many photos can be taken before sdcard is full',
    type: 'integer',
    values: [],
};
export const statusRemainingVideoTime35: StatusMetadata = {
    id: 35,
    label: 'Remaining video time',
    description: 'How many minutes of video can be captured with current settings before sdcard is full',
    type: 'integer',
    values: [],
};
export const statusNumGroupPhotos36: StatusMetadata = {
    id: 36,
    label: 'Num group photos',
    description: 'How many group photos can be taken with current settings before sdcard is full',
    type: 'integer',
    values: [],
};
export const statusNumGroupVideos37: StatusMetadata = {
    id: 37,
    label: 'Num group videos',
    description: 'Total number of group videos on sdcard',
    type: 'integer',
    values: [],
};
export const statusNumTotalPhotos38: StatusMetadata = {
    id: 38,
    label: 'Num total photos',
    description: 'Total number of photos on sdcard',
    type: 'integer',
    values: [],
};
export const statusNumTotalVideos39: StatusMetadata = {
    id: 39,
    label: 'Num total videos',
    description: 'Total number of videos on sdcard',
    type: 'integer',
    values: [],
};
export const statusDateTime40: StatusMetadata = {
    id: 40,
    label: 'Date time',
    description: 'Current date/time (format: %YY%MM%DD%HH%MM%SS, all values in hex)',
    type: 'string',
    values: [],
};
export const statusOtaStatus41: StatusMetadata = {
    id: 41,
    label: 'Ota status',
    description: 'The current status of Over The Air (OTA) update',
    type: 'integer',
    values: [
        { id: 0, label: 'Idle' },
        { id: 1, label: 'Downloading' },
        { id: 2, label: 'Verifying' },
        { id: 3, label: 'Download Failed' },
        { id: 4, label: 'Verify Failed' },
        { id: 5, label: 'Ready' },
        { id: 6, label: 'GoPro App: Downloading' },
        { id: 7, label: 'GoPro App: Verifying' },
        { id: 8, label: 'GoPro App: Download Failed' },
        { id: 9, label: 'GoPro App: Verify Failed' },
        { id: 10, label: 'GoPro App: Ready' },
    ],
};
export const statusDownloadCancelRequestPending42: StatusMetadata = {
    id: 42,
    label: 'Download cancel request pending',
    description: 'Is there a pending request to cancel a firmware update download?',
    type: 'boolean',
    values: booleanValue,
};

/*
when USB connected:
43: 7
44: 255
 */

export const statusCameraLocateActive45: StatusMetadata = {
    id: 45,
    label: 'Camera locate active',
    description: 'Is locate camera feature active?',
    type: 'boolean',
    values: booleanValue,
};
export const statusMultiShotCountDown49: StatusMetadata = {
    id: 49,
    label: 'Multi shot count down',
    description: 'The current timelapse interval countdown value (e.g. 5...4...3...2...1...)',
    type: 'integer',
    values: [],
};
export const statusRemainingSpace54: StatusMetadata = {
    id: 54,
    label: 'Remaining space',
    description: 'Remaining space on the sdcard in Kilobytes',
    type: 'integer',
    values: [],
};
export const statusSupported55: StatusMetadata = {
    id: 55,
    label: 'Supported',
    description: 'Is preview stream supported in current recording/flatmode/secondary-stream?',
    type: 'boolean',
    values: booleanValue,
};
export const statusWifiBars56: StatusMetadata = {
    id: 56,
    label: 'Wifi bars',
    description: 'WiFi signal strength in bars',
    type: 'integer',
    values: [],
};
export const statusCurrentTimeMsec57: StatusMetadata = {
    id: 57,
    label: 'Current time msec',
    description: 'System time in milliseconds since system was booted',
    type: 'integer',
    values: [],
};
export const statusNumHilights58: StatusMetadata = {
    id: 58,
    label: 'Num hilights',
    description: 'The number of hilights in encoding video (set to 0 when encoding stops)',
    type: 'integer',
    values: [],
};
export const statusLastHilightTimeMsec59: StatusMetadata = {
    id: 59,
    label: 'Last hilight time msec',
    description: 'Time since boot (msec) of most recent hilight in encoding video (set to 0 when encoding stops)',
    type: 'integer',
    values: [],
};
export const statusNextPollMsec60: StatusMetadata = {
    id: 60,
    label: 'Next poll msec',
    description: 'The min time between camera status updates (msec). Do not poll for status more often than this',
    type: 'integer',
    values: [],
};
export const statusInContextualMenu63: StatusMetadata = {
    id: 63,
    label: 'In contextual menu',
    description: 'Is the camera currently in a contextual menu (e.g. Preferences)?',
    type: 'boolean',
    values: booleanValue,
};
export const statusRemainingTimelapseTime64: StatusMetadata = {
    id: 64,
    label: 'Remaining timelapse time',
    description: 'How many min of Timelapse video can be captured with current settings before sdcard is full',
    type: 'integer',
    values: [],
};
export const statusExposureSelectType65: StatusMetadata = {
    id: 65,
    label: 'Exposure select type',
    description: 'Liveview Exposure Select Mode',
    type: 'integer',
    values: [
        { id: 0, label: 'Disabled' },
        { id: 1, label: 'Auto' },
        { id: 2, label: 'ISO Lock' },
        { id: 3, label: 'Hemisphere' },
    ],
};
export const statusExposureSelectX66: StatusMetadata = {
    id: 66,
    label: 'Exposure select x',
    description: 'Liveview Exposure Select: x-coordinate (percent)',
    type: 'percent',
    values: [
        { id: 0, label: '0%' },
        { id: 100, label: '100%' },
    ],
};
export const statusExposureSelectY67: StatusMetadata = {
    id: 67,
    label: 'Exposure select y',
    description: 'Liveview Exposure Select: y-coordinate (percent)',
    type: 'percent',
    values: [
        { id: 0, label: '0%' },
        { id: 100, label: '100%' },
    ],
};
export const statusGpsStatus68: StatusMetadata = {
    id: 68,
    label: 'Gps status',
    description: 'Does the camera currently have a GPS lock?',
    type: 'boolean',
    values: booleanValue,
};
export const statusApState69: StatusMetadata = { id: 69, label: 'Ap state', description: 'Is the WiFi radio enabled?', type: 'boolean', values: booleanValue };
export const statusInternalBatteryPercentage70: StatusMetadata = {
    id: 70,
    label: 'Internal battery percentage',
    description: 'Internal battery level (percent)',
    type: 'percent',
    values: [
        { id: 0, label: '0%' },
        { id: 100, label: '100%' },
    ],
};
export const statusAccMicStatus74: StatusMetadata = {
    id: 74,
    label: 'Acc mic status',
    description: 'Microphone Accesstory status',
    type: 'integer',
    values: [
        { id: 0, label: 'Microphone mod not connected' },
        { id: 1, label: 'Microphone mod connected' },
        { id: 2, label: 'Microphone mod connected and microphone plugged into Microphone mod' },
    ],
};
export const statusDigitalZoom75: StatusMetadata = {
    id: 75,
    label: 'Digital zoom',
    description: 'Digital Zoom level (percent)',
    type: 'percent',
    values: [
        { id: 0, label: '0%' },
        { id: 100, label: '100%' },
    ],
};
export const statusWirelessBand76: StatusMetadata = {
    id: 76,
    label: 'Wireless band',
    description: 'Wireless Band',
    type: 'integer',
    values: [
        { id: 0, label: '2.4 GHz' },
        { id: 1, label: '5 GHz' },
        { id: 2, label: 'Max' },
    ],
};
export const statusDigitalZoomActive77: StatusMetadata = {
    id: 77,
    label: 'Digital zoom active',
    description: 'Is Digital Zoom feature available?',
    type: 'boolean',
    values: booleanValue,
};
export const statusMobileFriendlyVideo78: StatusMetadata = {
    id: 78,
    label: 'Mobile friendly video',
    description: 'Are current video settings mobile friendly? (related to video compression and frame rate)',
    type: 'boolean',
    values: booleanValue,
};
export const statusFirstTimeUse79: StatusMetadata = {
    id: 79,
    label: 'First time use',
    description: 'Is the camera currently in First Time Use (FTU) UI flow?',
    type: 'boolean',
    values: booleanValue,
};
export const statusBand5ghzAvail81: StatusMetadata = { id: 81, label: 'Band 5ghz avail', description: 'Is 5GHz wireless band available?', type: 'boolean', values: booleanValue };
export const statusSystemReady82: StatusMetadata = {
    id: 82,
    label: 'System ready',
    description: 'Is the system ready to accept commands?',
    type: 'boolean',
    values: booleanValue,
};
export const statusBattOkayForOta83: StatusMetadata = {
    id: 83,
    label: 'Batt okay for ota',
    description: 'Is the internal battery charged sufficiently to start Over The Air (OTA) update?',
    type: 'boolean',
    values: booleanValue,
};
export const statusVideoLowTempAlert85: StatusMetadata = {
    id: 85,
    label: 'Video low temp alert',
    description: 'Is the camera getting too cold to continue recording?',
    type: 'boolean',
    values: booleanValue,
};
export const statusActualOrientation86: StatusMetadata = {
    id: 86,
    label: 'Actual orientation',
    description: 'The rotational orientation of the camera',
    type: 'integer',
    values: [
        { id: 0, label: '0 degrees (upright)' },
        { id: 1, label: '180 degrees (upside down)' },
        { id: 2, label: '90 degrees (laying on right side)' },
        { id: 3, label: '270 degrees (laying on left side)' },
    ],
};
export const statusThermalMitigationMode87: StatusMetadata = {
    id: 87,
    label: 'Thermal mitigation mode',
    description: 'Can camera use high resolution/fps (based on temperature)? (HERO7 Silver/White only)',
    type: 'boolean',
    values: booleanValue,
};
export const statusZoomWhileEncoding88: StatusMetadata = {
    id: 88,
    label: 'Zoom while encoding',
    description: 'Is this camera capable of zooming while encoding (static value based on model, not settings)',
    type: 'boolean',
    values: booleanValue,
};
export const statusCurrentMode89: StatusMetadata = {
    id: 89,
    label: 'Current mode',
    description: 'Current flatmode ID',
    type: 'integer',
    values: [],
};
export const statusLogsReady91: StatusMetadata = { id: 91, label: 'Logs ready', description: 'Are system logs ready to be downloaded?', type: 'boolean', values: booleanValue };
export const statusTimewarp1xActive92: StatusMetadata = { id: 92, label: 'Timewarp 1x active', description: 'Is Timewarp 1x active?', type: 'boolean', values: booleanValue };
export const statusActiveVideoPresets93: StatusMetadata = {
    id: 93,
    label: 'Active video presets',
    description: 'Current Video Preset (ID)',
    type: 'integer',
    values: [],
};
export const statusActivePhotoPresets94: StatusMetadata = {
    id: 94,
    label: 'Active photo presets',
    description: 'Current Photo Preset (ID)',
    type: 'integer',
    values: [],
};
export const statusActiveTimelapsePresets95: StatusMetadata = {
    id: 95,
    label: 'Active timelapse presets',
    description: 'Current Timelapse Preset (ID)',
    type: 'integer',
    values: [],
};
export const statusActivePresetsGroup96: StatusMetadata = {
    id: 96,
    label: 'Active presets group',
    description: 'Current Preset Group (ID)',
    type: 'integer',
    values: [],
};
export const statusActivePreset97: StatusMetadata = {
    id: 97,
    label: 'Active preset',
    description: 'Current Preset (ID)',
    type: 'integer',
    values: [],
};
export const statusPresetModified98: StatusMetadata = {
    id: 98,
    label: 'Preset modified',
    description: 'Preset Modified Status, which contains an event ID and a preset (group) ID',
    type: 'integer',
    values: [],
};
export const statusRemainingLiveBursts99: StatusMetadata = {
    id: 99,
    label: 'Remaining live bursts',
    description: 'How many Live Bursts can be captured before sdcard is full',
    type: 'integer',
    values: [],
};
export const statusNumTotalLiveBursts100: StatusMetadata = {
    id: 100,
    label: 'Num total live bursts',
    description: 'Total number of Live Bursts on sdcard',
    type: 'integer',
    values: [],
};
export const statusCaptureDelayActive101: StatusMetadata = {
    id: 101,
    label: 'Capture delay active',
    description: 'Is Capture Delay currently active (i.e. counting down)?',
    type: 'boolean',
    values: booleanValue,
};
export const statusMediaModMicStatus102: StatusMetadata = {
    id: 102,
    label: 'Media mod mic status',
    description: 'Media mod State',
    type: 'integer',
    values: [
        { id: 0, label: 'Media mod microphone removed' },
        { id: 2, label: 'Media mod microphone only' },
        { id: 3, label: 'Media mod microphone with external microphone' },
    ],
};
export const statusTimewarpSpeedRampActive103: StatusMetadata = {
    id: 103,
    label: 'Timewarp speed ramp active',
    description: 'Time Warp Speed',
    type: 'integer',
    values: [
        { id: 0, label: '15x' },
        { id: 1, label: '30x' },
        { id: 2, label: '60x' },
        { id: 3, label: '150x' },
        { id: 4, label: '300x' },
        { id: 5, label: '900x' },
        { id: 6, label: '1800x' },
        { id: 7, label: '2x' },
        { id: 8, label: '5x' },
        { id: 9, label: '10x' },
        { id: 10, label: 'Auto' },
        { id: 11, label: '1x (realtime)' },
        { id: 12, label: '1/2x (slow-motion)' },
    ],
};
export const statusLinuxCoreActive104: StatusMetadata = {
    id: 104,
    label: 'Linux core active',
    description: `Is the system's Linux core active?`,
    type: 'boolean',
    values: booleanValue,
};
export const statusCameraLensType105: StatusMetadata = {
    id: 105,
    label: 'Camera lens type',
    description: 'Camera lens type (reflects changes to setting 162)',
    type: 'integer',
    values: [
        { id: 0, label: 'Default' },
        { id: 1, label: 'Max Lens' },
    ],
};
export const statusVideoHindsightCaptureActive106: StatusMetadata = {
    id: 106,
    label: 'Video hindsight capture active',
    description: 'Is Video Hindsight Capture Active?',
    type: 'boolean',
    values: booleanValue,
};
export const statusScheduledPreset107: StatusMetadata = {
    id: 107,
    label: 'Scheduled preset',
    description: 'Scheduled Capture Preset ID',
    type: 'integer',
    values: [],
};
export const statusScheduledEnabled108: StatusMetadata = { id: 108, label: 'Scheduled enabled', description: 'Is Scheduled Capture set?', type: 'boolean', values: booleanValue };
export const statusCreatingPreset109: StatusMetadata = {
    id: 109,
    label: 'Creating preset',
    description: 'Is the camera in the process of creating a custom preset?',
    type: 'boolean',
    values: booleanValue,
};
export const statusMediaModStatus110: StatusMetadata = {
    id: 110,
    label: 'Media mod status',
    description: 'Media Mode Status (bitmasked)',
    type: 'integer',
    values: [
        { id: 0, label: 'Display (selfie) mod: 0, HDMI: 0, Media Mod Connected: False' },
        { id: 1, label: 'Display (selfie) mod: 0, HDMI: 0, Media Mod Connected: True' },
        { id: 2, label: 'Display (selfie) mod: 0, HDMI: 1, Media Mod Connected: False' },
        { id: 3, label: 'Display (selfie) mod: 0, HDMI: 1, Media Mod Connected: True' },
        { id: 4, label: 'Display (selfie) mod: 1, HDMI: 0, Media Mod Connected: False' },
        { id: 5, label: 'Display (selfie) mod: 1, HDMI: 0, Media Mod Connected: True' },
        { id: 6, label: 'Display (selfie) mod: 1, HDMI: 1, Media Mod Connected: False' },
        { id: 7, label: 'Display (selfie) mod: 1, HDMI: 1, Media Mod Connected: True' },
    ],
};
export const statusTurboTransfer113: StatusMetadata = { id: 113, label: 'Turbo transfer', description: 'Is Turbo Transfer active?', type: 'boolean', values: booleanValue };

export const allKnownStatuses: StatusMetadata[] = [
    statusInternalCameraPresent1,
    statusInternalBatteryLevel2,
    statusExternalBatteryPresent3,
    statusExternalBatteryLevel4,
    statusSystemHot6,
    statusSystemBusy8,
    statusQuickCaptureActive9,
    statusEncodingActive10,
    statusLcdLockActive11,
    statusVideoProgressCounter13,
    statusEnable17,
    statusState19,
    statusType20,
    statusPairTime21,
    statusState22,
    statusScanTimeMsec23,
    statusProvisionStatus24,
    statusRemoteControlVersion26,
    statusRemoteControlConnected27,
    statusPairing28,
    statusWlanSsid29,
    statusApSsid30,
    statusAppCount31,
    statusEnable32,
    statusSdStatus33,
    statusRemainingPhotos34,
    statusRemainingVideoTime35,
    statusNumGroupPhotos36,
    statusNumGroupVideos37,
    statusNumTotalPhotos38,
    statusNumTotalVideos39,
    statusDateTime40,
    statusOtaStatus41,
    statusDownloadCancelRequestPending42,
    statusCameraLocateActive45,
    statusMultiShotCountDown49,
    statusRemainingSpace54,
    statusSupported55,
    statusWifiBars56,
    statusCurrentTimeMsec57,
    statusNumHilights58,
    statusLastHilightTimeMsec59,
    statusNextPollMsec60,
    statusInContextualMenu63,
    statusRemainingTimelapseTime64,
    statusExposureSelectType65,
    statusExposureSelectX66,
    statusExposureSelectY67,
    statusGpsStatus68,
    statusApState69,
    statusInternalBatteryPercentage70,
    statusAccMicStatus74,
    statusDigitalZoom75,
    statusWirelessBand76,
    statusDigitalZoomActive77,
    statusMobileFriendlyVideo78,
    statusFirstTimeUse79,
    statusBand5ghzAvail81,
    statusSystemReady82,
    statusBattOkayForOta83,
    statusVideoLowTempAlert85,
    statusActualOrientation86,
    statusThermalMitigationMode87,
    statusZoomWhileEncoding88,
    statusCurrentMode89,
    statusLogsReady91,
    statusTimewarp1xActive92,
    statusActiveVideoPresets93,
    statusActivePhotoPresets94,
    statusActiveTimelapsePresets95,
    statusActivePresetsGroup96,
    statusActivePreset97,
    statusPresetModified98,
    statusRemainingLiveBursts99,
    statusNumTotalLiveBursts100,
    statusCaptureDelayActive101,
    statusMediaModMicStatus102,
    statusTimewarpSpeedRampActive103,
    statusLinuxCoreActive104,
    statusCameraLensType105,
    statusVideoHindsightCaptureActive106,
    statusScheduledPreset107,
    statusScheduledEnabled108,
    statusCreatingPreset109,
    statusMediaModStatus110,
    statusTurboTransfer113,
];
