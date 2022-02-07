import { bluetoothDeviceState } from 'store/goproBleServiceState';
import { waitForPacketById } from 'store/packetParsing/goproPacketReader';
import {
    assertCommandResponseSuccess,
    CommandResponse,
    CommandResponseCode,
    dispatchCommandResponse,
    parseCommandResponse,
    parseGetHardwareInfoResponse,
    parseOpenGoProGetVersionResponse,
    parseSettingsJsonResponse,
} from 'store/packetParsing/goproPacketReaderCommand';
import { commandGpCameraSetMode, commandGpCameraSubmode, selectIsCommandSupportedByKey } from 'store/selectors/settingsMetadata/commandSelectors';
import { UiMode } from 'store/selectors/settingsMetadata/modesSelectors';
import { GetHardwareInfoState, OpenGoProVersionState } from 'store/slices/goproBluetoothSlice';
import { RootState, store } from 'store/store';
import { SettingsJson } from 'utilities/definitions/goproTypes/settingsJson';
import { functionQueueProvider } from 'utilities/functionQueue';
import { delay } from 'utilities/promiseUtilities';

import { createAsyncThunk } from '@reduxjs/toolkit';

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

/**
 * The WebBLE doesn't allow us to write 2 packets simultaneously to same characteristic. So we need to queue up commands.
 * Also let's wait to receive full response to be safe
 */
async function sendCommand(
    commandData: CommandData,
    commandCharacteristic: BluetoothRemoteGATTCharacteristic,
    commandResponseCharacteristic: BluetoothRemoteGATTCharacteristic,
    retryCounter = 0
): Promise<CommandResponse> {
    const data = [commandData.commandId];
    if (commandData.data) data.push(...commandData.data);
    const responsePromise = waitForPacketById(commandResponseCharacteristic, commandData.commandId);
    await writeGoProPacketData(commandCharacteristic, data);

    const packetData = await responsePromise;
    const commandResponseData = parseCommandResponse(packetData);
    if (commandResponseData.errorCode === CommandResponseCode.error) {
        // Sometimes this happens while GoPro is in the middle of booting up.
        if (!commandData.retries || retryCounter >= commandData.retries) return commandResponseData;
        await delay(2 ** retryCounter * 500);
        return sendCommand(commandData, commandCharacteristic, commandResponseCharacteristic, retryCounter + 1);
    }
    return commandResponseData;
}

type CommandData = { commandId: number; data?: number[]; retries?: number };
const functionQueue = functionQueueProvider<CommandResponse>();
export async function queueAndSendCommand(commandData: CommandData) {
    const { characteristics } = bluetoothDeviceState;
    if (!characteristics) throw new Error('no characteristics');
    const { commandCharacteristic, commandResponseCharacteristic } = characteristics;
    await waitUntilDeviceReady();
    return functionQueue(async () => {
        const commandResponseData = await sendCommand(commandData, commandCharacteristic, commandResponseCharacteristic);
        // dispatchCommandResponse(dispatch, commandResponseData);
        return commandResponseData;
    }, commandCharacteristic);
}

async function sendCommandAction(commandData: CommandData): Promise<CommandResponse> {
    const commandResponseData = await queueAndSendCommand(commandData);
    return commandResponseData;
}

// Non-standard commands
export const forceShutdownCommand = createAsyncThunk<void, void, { state: RootState }>('commands/forceShutdownCommand', async (_, { dispatch }) => {
    // Force shutdown GoPro, not documented in OpenGoPro
    // Bluetooth will be offline after this command
    // Tested with Hero 7 Black
    const commandResponseData = await sendCommandAction({ commandId: 0x04 });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const hiLightTagCommand = createAsyncThunk<void, void, { state: RootState }>('commands/hiLightTagCommand', async (_, { dispatch }) => {
    // HiLight current moment on GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    const commandResponseData = await sendCommandAction({ commandId: 0x18 });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const locateOnCommand = createAsyncThunk<void, void, { state: RootState }>('commands/locateOnCommand', async (_, { dispatch }) => {
    // Locate mode on for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    const commandResponseData = await sendCommandAction({ commandId: 0x16, data: [0x01, 0x01] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const locateOffCommand = createAsyncThunk<void, void, { state: RootState }>('commands/locateOffCommand', async (_, { dispatch }) => {
    // Locate mode off for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    const commandResponseData = await sendCommandAction({ commandId: 0x16, data: [0x01, 0x00] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const legacyPresetsLoadGroupVideoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadGroupVideoCommand', async (_, { dispatch }) => {
    // Load video group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    const commandResponseData = await sendCommandAction({ commandId: 0x02, data: [0x01, 0x00] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const legacyPresetsLoadGroupPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadGroupPhotoCommand', async (_, { dispatch }) => {
    // Load photo group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    const commandResponseData = await sendCommandAction({ commandId: 0x02, data: [0x01, 0x01] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const legacyPresetsLoadGroupMultishotCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadGroupMultishotCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    const commandResponseData = await sendCommandAction({ commandId: 0x02, data: [0x01, 0x02] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const setUiModeCommand = createAsyncThunk<unknown, UiMode, { state: RootState }>('commands/legacyPresetsLoadPresetByModeCommand', async (mode, { getState }) => {
    if (selectIsCommandSupportedByKey(getState(), commandGpCameraSubmode.key))
        return sendCommandAction({ commandId: commandGpCameraSubmode.commandId, data: commandGpCameraSubmode.dataProducer(mode) });
    if (selectIsCommandSupportedByKey(getState(), commandGpCameraSetMode.key))
        return sendCommandAction({ commandId: commandGpCameraSetMode.commandId, data: commandGpCameraSetMode.dataProducer(mode) });
    throw new Error("Don't know how to set mode");
});

export const legacyPresetsLoadPresetVideoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetVideoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    const commandResponseData = await sendCommandAction({ commandId: 0x03, data: [0x01, 0x00, 0x01, 0x00] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const legacyPresetsLoadPresetTimeLapseVideoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetTimeLapseVideoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    const commandResponseData = await sendCommandAction({ commandId: 0x03, data: [0x01, 0x00, 0x01, 0x01] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const legacyPresetsLoadPresetLoopingVideoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetLoopingVideoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    const commandResponseData = await sendCommandAction({ commandId: 0x03, data: [0x01, 0x00, 0x01, 0x03] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const legacyPresetsLoadPresetTimewarpCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetTimewarpCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    const commandResponseData = await sendCommandAction({ commandId: 0x03, data: [0x01, 0x00, 0x01, 0x04] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const legacyPresetsLoadPresetPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetPhotoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    const commandResponseData = await sendCommandAction({ commandId: 0x03, data: [0x01, 0x01, 0x01, 0x01] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const legacyPresetsLoadPresetNightPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetNightPhotoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    const commandResponseData = await sendCommandAction({ commandId: 0x03, data: [0x01, 0x01, 0x01, 0x02] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const legacyPresetsLoadPresetBurstPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetBurstPhotoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    const commandResponseData = await sendCommandAction({ commandId: 0x03, data: [0x01, 0x02, 0x01, 0x00] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const legacyPresetsLoadPresetTimeLapsePhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetTimeLapsePhotoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    const commandResponseData = await sendCommandAction({ commandId: 0x03, data: [0x01, 0x02, 0x01, 0x01] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const legacyPresetsLoadPresetNightLapsePhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/legacyPresetsLoadPresetNightLapsePhotoCommand', async (_, { dispatch }) => {
    // Load timelapse group for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    const commandResponseData = await sendCommandAction({ commandId: 0x03, data: [0x01, 0x02, 0x01, 0x02] });
    dispatchCommandResponse(dispatch, commandResponseData);
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
    const commandResponseData = await sendCommandAction({ commandId: 0x05 });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const getSettingsJsonCommand = createAsyncThunk<SettingsJson, void, { state: RootState }>('commands/getSettingsJsonCommand', async () => {
    const commandResponseData = await sendCommandAction({ commandId: 0x3b, retries: 5 });
    assertCommandResponseSuccess(commandResponseData);
    const settingsJsonResponse = parseSettingsJsonResponse(commandResponseData);
    return settingsJsonResponse;
});

export const getHardwareInfoCommand = createAsyncThunk<GetHardwareInfoState, void, { state: RootState }>('commands/getHardwareInfoCommand', async () => {
    const commandResponseData = await sendCommandAction({ commandId: 0x3c, retries: 3 });
    assertCommandResponseSuccess(commandResponseData);
    const hardwareInfo = parseGetHardwareInfoResponse(commandResponseData);
    return hardwareInfo;
});

export const setShutterOffCommand = createAsyncThunk<void, void, { state: RootState }>('commands/setShutterOffCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x01, data: [0x01, 0x00] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const setShutterOnCommand = createAsyncThunk<void, void, { state: RootState }>('commands/setShutterOnCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x01, data: [0x01, 0x01] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const apControlWiFiApOffCommand = createAsyncThunk<void, void, { state: RootState }>('commands/apControlWiFiApOffCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x17, data: [0x01, 0x00] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const apControlWiFiApOnCommand = createAsyncThunk<void, void, { state: RootState }>('commands/apControlWiFiApOnCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x17, data: [0x01, 0x01] });
    dispatchCommandResponse(dispatch, commandResponseData);
});
// all next ones not work on hero 7

export const presetsLoadGroupVideoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadGroupVideoCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x3e, data: [0x02, 0x03, 0xe8] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadGroupPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadGroupPhotoCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x3e, data: [0x02, 0x03, 0xe9] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadGroupTimelapseCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadGroupTimelapseCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x3e, data: [0x02, 0x03, 0xea] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadStandardCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadStandardCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x00, 0x00, 0x00] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadActivityCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadActivityCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x00, 0x00, 0x01] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadCinematicCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadCinematicCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x00, 0x00, 0x02] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadUltraSloMoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadUltraSloMoCommand', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x00, 0x00, 0x04] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadBasicCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadBasicCommand', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x00, 0x00, 0x05] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadPhotoCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x01, 0x00, 0x00] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadLiveBurstCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadLiveBurstCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x01, 0x00, 0x01] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadBurstPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadBurstPhotoCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x01, 0x00, 0x02] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadNightPhotoCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadNightPhotoCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x01, 0x00, 0x03] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadTimeWarpCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadTimeWarpCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x02, 0x00, 0x00] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadTimeLapseCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadTimeLapseCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x02, 0x00, 0x01] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadNightLapseCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadNightLapseCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x02, 0x00, 0x02] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadStandardEBCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadStandardEBCommand', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x08, 0x00, 0x00] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadActivityEBCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadActivityEBCommand', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x08, 0x00, 0x01] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadCinematicEBCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadCinematicEBCommand', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x08, 0x00, 0x02] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoadSloMoEBCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoadSloMoEBCommand', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x08, 0x00, 0x03] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoad4KTripodCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoad4KTripodCommand', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x09, 0x00, 0x00] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const presetsLoad53KTripodCommand = createAsyncThunk<void, void, { state: RootState }>('commands/presetsLoad53KTripodCommand', async (_, { dispatch }) => {
    // firmware >= v01.16.00
    const commandResponseData = await sendCommandAction({ commandId: 0x40, data: [0x04, 0x00, 0x09, 0x00, 0x01] });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const analyticsSetThirdPartyClientCommand = createAsyncThunk<void, void, { state: RootState }>('commands/analyticsSetThirdPartyClientCommand', async (_, { dispatch }) => {
    const commandResponseData = await sendCommandAction({ commandId: 0x50 });
    dispatchCommandResponse(dispatch, commandResponseData);
});

export const openGoProGetVersionCommand = createAsyncThunk<OpenGoProVersionState, void, { state: RootState }>('commands/openGoProGetVersionCommand', async () => {
    const commandResponseData = await sendCommandAction({ commandId: 0x51, retries: 3 });
    if (commandResponseData.errorCode === CommandResponseCode.invalidParameter) {
        // Open GoPro unsupported
        // Likely device older than GoPro Hero 9
        return { majorVersion: 0, minorVersion: 0 };
    }
    assertCommandResponseSuccess(commandResponseData);
    const openGoproVersion = parseOpenGoProGetVersionResponse(commandResponseData);
    return openGoproVersion;
});
