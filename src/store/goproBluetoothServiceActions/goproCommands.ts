import { bluetoothDeviceState } from 'store/goproBleServiceState';
import { RootState, store } from 'store/store';
import { functionQueue } from 'utilities/functionQueue';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { writeGoProPacketData } from './goproBluetoothServiceActions';
import { statusSystemReady82 } from './goproStatusMetadata';

function isDeviceReady() {
    const { statuses } = store.getState().goproSettingsReducer;
    const canSendCommand = statuses[statusSystemReady82.id];
    return canSendCommand;
}

/**
 * GoPro will reject command if it's busy, encoding or system is not ready.
 */
async function waitUntilDeviceReady() {
    if (isDeviceReady()) return;

    await new Promise<void>((resolve) => {
        const unsubscribe = store.subscribe(() => {
            if (isDeviceReady()) {
                unsubscribe();
                resolve();
            }
        });
    });
}

type CommandData = number[];
export async function sendCommand(commandData: CommandData) {
    const { characteristics } = bluetoothDeviceState;
    if (!characteristics) throw new Error('no characteristics');
    const { commandCharacteristic } = characteristics;
    await waitUntilDeviceReady();
    await functionQueue(async () => {
        await writeGoProPacketData(commandCharacteristic, commandData);
    }, commandCharacteristic);
}

const sendCommandAction = createAsyncThunk<void, CommandData, { state: RootState }>('bluetoothDevice/goproSleepCommand', async (commandData) => {
    await sendCommand(commandData);
});

// Non-standard commands
export const goproForceShutdownCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/goproForceShutdownCommand', async (_, { dispatch }) => {
    // Force shutdown GoPro, not documented in OpenGoPro
    // Bluetooth will be offline after this command
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction([0x04]));
});

export const goproHiLightTagCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/goproHiLightTagCommand', async (_, { dispatch }) => {
    // HiLight current moment on GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction([0x18]));
});

export const goproLocateOnCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/goproLocateOnCommand', async (_, { dispatch }) => {
    // Locate mode on for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction([0x16, 0x01, 0x01]));
});

export const goproLocateOffCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/goproLocateOffCommand', async (_, { dispatch }) => {
    // Locate mode off for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction([0x16, 0x01, 0x00]));
});

export const goproLegacyPresetsLoadGroupVideoCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/goproLegacyPresetsLoadGroupVideoCommand', async (_, { dispatch }) => {
    // Load video group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction([0x02, 0x01, 0x00]));
});

export const goproLegacyPresetsLoadGroupPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/goproLegacyPresetsLoadGroupPhotoCommand', async (_, { dispatch }) => {
    // Load photo group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction([0x02, 0x01, 0x01]));
});

export const goproLegacyPresetsLoadGroupMultishotCommand = createAsyncThunk<void, void, { state: RootState }>(
    'bluetoothDevice/goproLegacyPresetsLoadGroupMultishotCommand',
    async (_, { dispatch }) => {
        // Load timelapse group for GoPro, not documented in OpenGoPro
        // Tested with Hero 7 Black
        await dispatch(sendCommandAction([0x02, 0x01, 0x02]));
    }
);

export const goproLegacyPresetsLoadPresetVideoCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/goproLegacyPresetsLoadPresetVideoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction([0x03, 0x01, 0x00, 0x01, 0x00]));
});

export const goproLegacyPresetsLoadPresetTimeLapseVideoCommand = createAsyncThunk<void, void, { state: RootState }>(
    'bluetoothDevice/goproLegacyPresetsLoadPresetTimeLapseVideoCommand',
    async (_, { dispatch }) => {
        // Load timelapse group for GoPro, not documented in OpenGoPro
        // Tested with Hero 7 Black
        await dispatch(sendCommandAction([0x03, 0x01, 0x00, 0x01, 0x01]));
    }
);

export const goproLegacyPresetsLoadPresetLoopingVideoCommand = createAsyncThunk<void, void, { state: RootState }>(
    'bluetoothDevice/goproLegacyPresetsLoadPresetLoopingVideoCommand',
    async (_, { dispatch }) => {
        // Load timelapse group for GoPro, not documented in OpenGoPro
        // Tested with Hero 7 Black
        await dispatch(sendCommandAction([0x03, 0x01, 0x00, 0x01, 0x03]));
    }
);

export const goproLegacyPresetsLoadPresetTimewarpCommand = createAsyncThunk<void, void, { state: RootState }>(
    'bluetoothDevice/goproLegacyPresetsLoadPresetTimewarpCommand',
    async (_, { dispatch }) => {
        // Load timelapse group for GoPro, not documented in OpenGoPro
        // Tested with Hero 7 Black
        await dispatch(sendCommandAction([0x03, 0x01, 0x00, 0x01, 0x04]));
    }
);

export const goproLegacyPresetsLoadPresetPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/goproLegacyPresetsLoadPresetPhotoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction([0x03, 0x01, 0x01, 0x01, 0x01]));
});

export const goproLegacyPresetsLoadPresetNightPhotoCommand = createAsyncThunk<void, void, { state: RootState }>(
    'bluetoothDevice/goproLegacyPresetsLoadPresetNightPhotoCommand',
    async (_, { dispatch }) => {
        // Load timelapse group for GoPro, not documented in OpenGoPro
        // Tested with Hero 7 Black
        await dispatch(sendCommandAction([0x03, 0x01, 0x01, 0x01, 0x02]));
    }
);

export const goproLegacyPresetsLoadPresetBurstPhotoCommand = createAsyncThunk<void, void, { state: RootState }>(
    'bluetoothDevice/goproLegacyPresetsLoadPresetBurstPhotoCommand',
    async (_, { dispatch }) => {
        // Load timelapse group for GoPro, not documented in OpenGoPro
        // Tested with Hero 7 Black
        await dispatch(sendCommandAction([0x03, 0x01, 0x02, 0x01, 0x00]));
    }
);

export const goproLegacyPresetsLoadPresetTimeLapsePhotoCommand = createAsyncThunk<void, void, { state: RootState }>(
    'bluetoothDevice/goproLegacyPresetsLoadPresetTimeLapsePhotoCommand',
    async (_, { dispatch }) => {
        // Load timelapse group for GoPro, not documented in OpenGoPro
        // Tested with Hero 7 Black
        await dispatch(sendCommandAction([0x03, 0x01, 0x02, 0x01, 0x01]));
    }
);

export const goproLegacyPresetsLoadPresetNightLapsePhotoCommand = createAsyncThunk<void, void, { state: RootState }>(
    'bluetoothDevice/goproLegacyPresetsLoadPresetNightLapsePhotoCommand',
    async (_, { dispatch }) => {
        // Load timelapse group for GoPro, not documented in OpenGoPro
        // Tested with Hero 7 Black
        await dispatch(sendCommandAction([0x03, 0x01, 0x02, 0x01, 0x02]));
    }
);

/*
more old gopro commands from  https://gethypoxic.com/blogs/technical/gopro-hero5-interfaces

// Not sure which characteristic, though, probably command, needs testing
VIDEO_PROTUNE_RESET (0x03 0x10, 0x01, 0x01),
MULTISHOT_VIDEO_PROTUNE_RESET(0x03, 0x11, 0x01, 0x01),
PHOTO_PROTUNE_RESET(0x03, 0x12, 0x01, 0x01),
*/

// Standard commands
export const goproSleepCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/goproSleepCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x05]));
});

export const goproGetHardwareInfoCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/getHardwareInfoCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x3c]));
});

export const setShutterOffCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/setShutterOffCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x01, 0x01, 0x00]));
});

export const setShutterOnCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/setShutterOnCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x01, 0x01, 0x01]));
});

export const apControlWiFiApOff = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/apControlWiFiApOff', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x17, 0x01, 0x00]));
});

export const apControlWiFiApOn = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/apControlWiFiApOn', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x17, 0x01, 0x01]));
});
// all next ones not work on hero 7

export const presetsLoadGroupVideo = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadGroupVideo', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x3e, 0x02, 0x03, 0xe8]));
});

export const presetsLoadGroupPhoto = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadGroupPhoto', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x3e, 0x02, 0x03, 0xe9]));
});

export const presetsLoadGroupTimelapse = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadGroupTimelapse', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x3e, 0x02, 0x03, 0xea]));
});

export const presetsLoadStandard = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadStandard', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x00, 0x00, 0x00]));
});

export const presetsLoadActivity = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadActivity', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x00, 0x00, 0x01]));
});

export const presetsLoadCinematic = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadCinematic', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x00, 0x00, 0x02]));
});

export const presetsLoadUltraSloMo = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadUltraSloMo', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x00, 0x00, 0x04]));
});

export const presetsLoadBasic = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadBasic', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x00, 0x00, 0x05]));
});

export const presetsLoadPhoto = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadPhoto', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x01, 0x00, 0x00]));
});

export const presetsLoadLiveBurst = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadLiveBurst', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x01, 0x00, 0x01]));
});

export const presetsLoadBurstPhoto = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadBurstPhoto', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x01, 0x00, 0x02]));
});

export const presetsLoadNightPhoto = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadNightPhoto', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x01, 0x00, 0x03]));
});

export const presetsLoadTimeWarp = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadTimeWarp', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x02, 0x00, 0x00]));
});

export const presetsLoadTimeLapse = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadTimeLapse', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x02, 0x00, 0x01]));
});

export const presetsLoadNightLapse = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadNightLapse', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x02, 0x00, 0x02]));
});

export const presetsLoadStandardEB = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadStandardEB', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x08, 0x00, 0x00]));
});

export const presetsLoadActivityEB = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadActivityEB', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x08, 0x00, 0x01]));
});

export const presetsLoadCinematicEB = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadCinematicEB', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x08, 0x00, 0x02]));
});

export const presetsLoadSloMoEB = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadSloMoEB', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x08, 0x00, 0x03]));
});

export const presetsLoad4KTripod = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoad4KTripod', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x09, 0x00, 0x00]));
});

export const presetsLoad53KTripod = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoad53KTripod', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    await dispatch(sendCommandAction([0x40, 0x04, 0x00, 0x09, 0x00, 0x01]));
});

export const analyticsSetThirdPartyClient = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/analyticsSetThirdPartyClient', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x50]));
});

export const openGoProGetVersion = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/openGoProGetVersion', async (_, { dispatch }) => {
    await dispatch(sendCommandAction([0x51]));
});
