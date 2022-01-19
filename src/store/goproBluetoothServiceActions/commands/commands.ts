import { bluetoothDeviceState } from 'store/goproBleServiceState';
import { waitForPacketById } from 'store/packetParsing/goproPacketReader';
import { commandResponseReceiverProvider } from 'store/packetParsing/goproPacketReaderCommand';
import { RootState, store } from 'store/store';
import { functionQueue } from 'utilities/functionQueue';

import { createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';

import { writeGoProPacketData } from '../goproBluetoothServiceActions';
import { statusSystemReady82 } from '../goproStatusMetadata';

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

type CommandData = { commandId: number; data?: number[] };
export async function sendCommand(commandData: CommandData, dispatch: ThunkDispatch<RootState, void, any>) {
    const { characteristics } = bluetoothDeviceState;
    if (!characteristics) throw new Error('no characteristics');
    const { commandCharacteristic, commandResponseCharacteristic } = characteristics;
    await waitUntilDeviceReady();
    // The WebBLE doesn't allow us to write 2 packets simultaneously to same characteristic. So we need to queue up commands.
    // Also let's wait to receive full response to be safe
    await functionQueue(async () => {
        const data = [commandData.commandId];
        if (commandData.data) data.push(...commandData.data);
        const responsePromise = waitForPacketById(commandResponseCharacteristic, commandData.commandId);
        await writeGoProPacketData(commandCharacteristic, data);
        const packetData = await responsePromise;
        commandResponseReceiverProvider(dispatch)(packetData);
    }, commandCharacteristic);
}

const sendCommandAction = createAsyncThunk<void, CommandData, { state: RootState }>('commands/sendCommandAction', async (commandData, { dispatch }) => {
    await sendCommand(commandData, dispatch);
});

// Non-standard commands
export const forceShutdownCommand = createAsyncThunk<void, void, { state: RootState }>('commands/forceShutdownCommand', async (_, { dispatch }) => {
    // Force shutdown GoPro, not documented in OpenGoPro
    // Bluetooth will be offline after this command
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction({ commandId: 0x04 }));
});

export const hiLightTagCommand = createAsyncThunk<void, void, { state: RootState }>('commands/hiLightTagCommand', async (_, { dispatch }) => {
    // HiLight current moment on GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction({ commandId: 0x18 }));
});

export const locateOnCommand = createAsyncThunk<void, void, { state: RootState }>('commands/locateOnCommand', async (_, { dispatch }) => {
    // Locate mode on for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction({ commandId: 0x16, data: [0x01, 0x01] }));
});

export const locateOffCommand = createAsyncThunk<void, void, { state: RootState }>('commands/locateOffCommand', async (_, { dispatch }) => {
    // Locate mode off for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction({ commandId: 0x16, data: [0x01, 0x00] }));
});

export const legacyPresetsLoadGroupVideoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadGroupVideoCommand', async (_, { dispatch }) => {
    // Load video group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction({ commandId: 0x02, data: [0x01, 0x00] }));
});

export const legacyPresetsLoadGroupPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadGroupPhotoCommand', async (_, { dispatch }) => {
    // Load photo group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction({ commandId: 0x02, data: [0x01, 0x01] }));
});

export const legacyPresetsLoadGroupMultishotCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadGroupMultishotCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction({ commandId: 0x02, data: [0x01, 0x02] }));
});

export const legacyPresetsLoadPresetVideoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetVideoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction({ commandId: 0x03, data: [0x01, 0x00, 0x01, 0x00] }));
});

export const legacyPresetsLoadPresetTimeLapseVideoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetTimeLapseVideoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction({ commandId: 0x03, data: [0x01, 0x00, 0x01, 0x01] }));
});

export const legacyPresetsLoadPresetLoopingVideoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetLoopingVideoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction({ commandId: 0x03, data: [0x01, 0x00, 0x01, 0x03] }));
});

export const legacyPresetsLoadPresetTimewarpCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetTimewarpCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction({ commandId: 0x03, data: [0x01, 0x00, 0x01, 0x04] }));
});

export const legacyPresetsLoadPresetPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetPhotoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction({ commandId: 0x03, data: [0x01, 0x01, 0x01, 0x01] }));
});

export const legacyPresetsLoadPresetNightPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetNightPhotoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction({ commandId: 0x03, data: [0x01, 0x01, 0x01, 0x02] }));
});

export const legacyPresetsLoadPresetBurstPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetBurstPhotoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction({ commandId: 0x03, data: [0x01, 0x02, 0x01, 0x00] }));
});

export const legacyPresetsLoadPresetTimeLapsePhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetTimeLapsePhotoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction({ commandId: 0x03, data: [0x01, 0x02, 0x01, 0x01] }));
});

export const legacyPresetsLoadPresetNightLapsePhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetNightLapsePhotoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await dispatch(sendCommandAction({ commandId: 0x03, data: [0x01, 0x02, 0x01, 0x02] }));
});

/*
more old gopro commands from  https://gethypoxic.com/blogs/technical/gopro-hero5-interfaces

// Not sure which characteristic, though, probably command, needs testing
VIDEO_PROTUNE_RESET (0x03 0x10, 0x01, 0x01),
MULTISHOT_VIDEO_PROTUNE_RESET(0x03, 0x11, 0x01, 0x01),
PHOTO_PROTUNE_RESET(0x03, 0x12, 0x01, 0x01),
*/

// Standard commands
export const sleepCommand = createAsyncThunk<void, void, { state: RootState }>('commands/sleepCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x05 }));
});

export const getSettingsJsonCommand = createAsyncThunk<void, void, { state: RootState }>('commands/getSettingsJsonCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x3b }));
});

export const getHardwareInfoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/getHardwareInfoCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x3c }));
});

export const setShutterOffCommand = createAsyncThunk<void, void, { state: RootState }>('commands/setShutterOffCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x01, data: [0x01, 0x00] }));
});

export const setShutterOnCommand = createAsyncThunk<void, void, { state: RootState }>('commands/setShutterOnCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x01, data: [0x01, 0x01] }));
});

export const apControlWiFiApOffCommand = createAsyncThunk<void, void, { state: RootState }>('commands/apControlWiFiApOffCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x17, data: [0x01, 0x00] }));
});

export const apControlWiFiApOnCommand = createAsyncThunk<void, void, { state: RootState }>('commands/apControlWiFiApOnCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x17, data: [0x01, 0x01] }));
});
// all next ones not work on hero 7

export const presetsLoadGroupVideoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadGroupVideoCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x3e, data: [0x02, 0x03, 0xe8] }));
});

export const presetsLoadGroupPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadGroupPhotoCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x3e, data: [0x02, 0x03, 0xe9] }));
});

export const presetsLoadGroupTimelapseCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadGroupTimelapseCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x3e, data: [0x02, 0x03, 0xea] }));
});

export const presetsLoadStandardCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadStandardCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x00, 0x00, 0x00] }));
});

export const presetsLoadActivityCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadActivityCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x00, 0x00, 0x01] }));
});

export const presetsLoadCinematicCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadCinematicCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x00, 0x00, 0x02] }));
});

export const presetsLoadUltraSloMoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadUltraSloMoCommand', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x00, 0x00, 0x04] }));
});

export const presetsLoadBasicCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadBasicCommand', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x00, 0x00, 0x05] }));
});

export const presetsLoadPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadPhotoCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x01, 0x00, 0x00] }));
});

export const presetsLoadLiveBurstCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadLiveBurstCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x01, 0x00, 0x01] }));
});

export const presetsLoadBurstPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadBurstPhotoCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x01, 0x00, 0x02] }));
});

export const presetsLoadNightPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadNightPhotoCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x01, 0x00, 0x03] }));
});

export const presetsLoadTimeWarpCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadTimeWarpCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x02, 0x00, 0x00] }));
});

export const presetsLoadTimeLapseCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadTimeLapseCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x02, 0x00, 0x01] }));
});

export const presetsLoadNightLapseCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadNightLapseCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x02, 0x00, 0x02] }));
});

export const presetsLoadStandardEBCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadStandardEBCommand', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x08, 0x00, 0x00] }));
});

export const presetsLoadActivityEBCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadActivityEBCommand', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x08, 0x00, 0x01] }));
});

export const presetsLoadCinematicEBCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadCinematicEBCommand', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x08, 0x00, 0x02] }));
});

export const presetsLoadSloMoEBCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadSloMoEBCommand', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x08, 0x00, 0x03] }));
});

export const presetsLoad4KTripodCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoad4KTripodCommand', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x09, 0x00, 0x00] }));
});

export const presetsLoad53KTripodCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoad53KTripodCommand', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    await dispatch(sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x09, 0x00, 0x01] }));
});

export const analyticsSetThirdPartyClientCommand = createAsyncThunk<void, void, { state: RootState }>('commands/analyticsSetThirdPartyClientCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x50 }));
});

export const openGoProGetVersionCommand = createAsyncThunk<void, void, { state: RootState }>('commands/openGoProGetVersionCommand', async (_, { dispatch }) => {
    await dispatch(sendCommandAction({ commandId: 0x51 }));
});
