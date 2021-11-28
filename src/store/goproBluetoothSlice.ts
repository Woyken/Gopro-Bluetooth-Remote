import { AnyAction, createAsyncThunk, createSlice, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { RootState } from './store';

interface BluetoothDeviceState {
    device?: BluetoothDevice;
    gattServer?: BluetoothRemoteGATTServer;
    characteristics?: {
        wifiApSsidCharacteristic: BluetoothRemoteGATTCharacteristic;
        wifiApPasswordCharacteristic: BluetoothRemoteGATTCharacteristic;
        wifiApPowerCharacteristic: BluetoothRemoteGATTCharacteristic;
        wifiApStateCharacteristic: BluetoothRemoteGATTCharacteristic;
        commandCharacteristic: BluetoothRemoteGATTCharacteristic;
        commandResponseCharacteristic: BluetoothRemoteGATTCharacteristic;
        settingsCharacteristic: BluetoothRemoteGATTCharacteristic;
        settingsResponseCharacteristic: BluetoothRemoteGATTCharacteristic;
        queryCharacteristic: BluetoothRemoteGATTCharacteristic;
        queryResponseCharacteristic: BluetoothRemoteGATTCharacteristic;
    };
}

const bluetoothDeviceState: BluetoothDeviceState = {};

interface SelectDeviceResult {
    deviceName: string;
}

// TODO move this to new file
export const requestDevice = createAsyncThunk<SelectDeviceResult, void, { state: RootState }>('bluetoothDevice/requestDevice', async (_, { dispatch }) => {
    const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['0000fea6-0000-1000-8000-00805f9b34fb'] }],
        optionalServices: ['0000fea6-0000-1000-8000-00805f9b34fb', 'b5f90001-aa8d-11e3-9046-0002a5d5c51b'],
    });
    device.ongattserverdisconnected = () => {
        dispatch(goproBluetoothSlice.actions.gattDisconnected('Connection lost'));
        toast.error('Gopro disconnected, connection lost');
    };
    bluetoothDeviceState.device = device;
    dispatch(gattConnect());
    return {
        deviceName: device.name ?? device.id,
    };
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GattConnectResult {}

export const gattConnect = createAsyncThunk<GattConnectResult, void, { state: RootState }>('bluetoothDevice/gattConnect', async (_, { dispatch }) => {
    const { device } = bluetoothDeviceState;
    if (!device) throw new Error('device not found to connect to');
    if (!device?.gatt) throw new Error(`gatt missing for this device ${device.name ?? device.id}`);

    const gattServer = await device.gatt.connect();

    const wifiApServicePromise = gattServer.getPrimaryService('b5f90001-aa8d-11e3-9046-0002a5d5c51b');
    const wifiApSsidCharacteristicPromise = wifiApServicePromise.then((x) => x.getCharacteristic('b5f90002-aa8d-11e3-9046-0002a5d5c51b'));
    const wifiApPasswordCharacteristicPromise = wifiApServicePromise.then((x) => x.getCharacteristic('b5f90003-aa8d-11e3-9046-0002a5d5c51b'));
    const wifiApPowerCharacteristicPromise = wifiApServicePromise.then((x) => x.getCharacteristic('b5f90004-aa8d-11e3-9046-0002a5d5c51b'));
    const wifiApStateCharacteristicPromise = wifiApServicePromise.then((x) => x.getCharacteristic('b5f90005-aa8d-11e3-9046-0002a5d5c51b'));

    const cqServicePromise = gattServer.getPrimaryService('0000fea6-0000-1000-8000-00805f9b34fb');
    const commandCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic('b5f90072-aa8d-11e3-9046-0002a5d5c51b'));
    const commandResponseCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic('b5f90073-aa8d-11e3-9046-0002a5d5c51b'));
    const settingsCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic('b5f90074-aa8d-11e3-9046-0002a5d5c51b'));
    const settingsResponseCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic('b5f90075-aa8d-11e3-9046-0002a5d5c51b'));
    const queryCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic('b5f90076-aa8d-11e3-9046-0002a5d5c51b'));
    const queryResponseCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic('b5f90077-aa8d-11e3-9046-0002a5d5c51b'));

    bluetoothDeviceState.gattServer = gattServer;
    bluetoothDeviceState.characteristics = {
        wifiApSsidCharacteristic: await wifiApSsidCharacteristicPromise,
        wifiApPasswordCharacteristic: await wifiApPasswordCharacteristicPromise,
        wifiApPowerCharacteristic: await wifiApPowerCharacteristicPromise,
        wifiApStateCharacteristic: await wifiApStateCharacteristicPromise,
        commandCharacteristic: await commandCharacteristicPromise,
        commandResponseCharacteristic: await commandResponseCharacteristicPromise,
        settingsCharacteristic: await settingsCharacteristicPromise,
        settingsResponseCharacteristic: await settingsResponseCharacteristicPromise,
        queryCharacteristic: await queryCharacteristicPromise,
        queryResponseCharacteristic: await queryResponseCharacteristicPromise,
    };
    bluetoothDeviceState.characteristics.commandResponseCharacteristic.oncharacteristicvaluechanged = onCommandResponseProvider(dispatch);
    await bluetoothDeviceState.characteristics.commandResponseCharacteristic.startNotifications();

    // TODO delay these until after initial connection
    dispatch(openGoProGetVersion());
    dispatch(goproGetHardwareInfoCommand());
});

function onCommandResponseDataReceived(dispatch: ThunkDispatch<RootState, unknown, AnyAction>, response: PacketResponse) {
    console.log('response received', response);
    // TODO parse actual command messages and update state
    const commandResponse = parseCommandResponse(response);
    dispatchCommandResponse(dispatch, commandResponse);
}

function parseGetHardwareInfoResponse(commandResponse: CommandResponse): GetHardwareInfoState {
    const { data } = commandResponse;
    let dataIndex = 0;
    // model number
    const lengthOfModelNumber = data[dataIndex++];
    const modelNumber = new Array(lengthOfModelNumber).fill(0).map(() => data[dataIndex++]);
    // model name
    const lengthOfModelName = data[dataIndex++];
    const modelName = new Array(lengthOfModelName)
        .fill(0)
        .map(() => String.fromCharCode(data[dataIndex++]))
        .join('');
    // board type
    const lengthOfBoardType = data[dataIndex++];
    const boardType = new Array(lengthOfBoardType)
        .fill(0)
        .map(() => String.fromCharCode(data[dataIndex++]))
        .join('');
    // firmware version
    const lengthOfFirmwareVersion = data[dataIndex++];
    const firmwareVersion = new Array(lengthOfFirmwareVersion)
        .fill(0)
        .map(() => String.fromCharCode(data[dataIndex++]))
        .join('');
    // serial number
    const lengthOfSerialNumber = data[dataIndex++];
    const serialNumber = new Array(lengthOfSerialNumber)
        .fill(0)
        .map(() => String.fromCharCode(data[dataIndex++]))
        .join('');
    // AP SSID
    const lengthOfApSsid = data[dataIndex++];
    const apSsid = new Array(lengthOfApSsid)
        .fill(0)
        .map(() => String.fromCharCode(data[dataIndex++]))
        .join('');
    // AP MAC Address
    const lengthOfApMacAddress = data[dataIndex++];
    const apMacAddress = new Array(lengthOfApMacAddress)
        .fill(0)
        .map(() => String.fromCharCode(data[dataIndex++]))
        .join('');
    return {
        modelNumber,
        modelName,
        boardType,
        firmwareVersion,
        serialNumber,
        apSsid,
        apMacAddress,
    };
}

function parseOpenGoProGetVersionResponse(commandResponse: CommandResponse): OpenGoProVersionState {
    const { data } = commandResponse;
    let dataIndex = 0;
    // Major version
    const lengthOfMajorVersion = data[dataIndex++];
    const majorVersion = new Array(lengthOfMajorVersion)
        .fill(0)
        .map(() => data[dataIndex++])
        // eslint-disable-next-line no-bitwise
        .reduce((acc, cur) => (acc << 8) + cur);
    // Minor version
    const lengthOfMinorVersion = data[dataIndex++];
    const minorVersion = new Array(lengthOfMinorVersion)
        .fill(0)
        .map(() => data[dataIndex++])
        // eslint-disable-next-line no-bitwise
        .reduce((acc, cur) => (acc << 8) + cur);
    return {
        majorVersion,
        minorVersion,
    };
}

enum CommandId {
    SetShutter = 0x01,
    Sleep = 0x05,
    APControl = 0x17,
    GetHardwareInfo = 0x3c,
    PresetsLoadGroup = 0x3e,
    PresetsLoad = 0x40,
    Analytics = 0x50,
    OpenGoProGetVersion = 0x51,
}

function dispatchCommandResponse(dispatch: ThunkDispatch<RootState, unknown, AnyAction>, commandResponse: CommandResponse) {
    switch (commandResponse.commandId) {
        case CommandId.GetHardwareInfo: {
            if (commandResponse.errorCode === CommandResponseCode.error) {
                // Error occured during get hardware info? Sometimes this happens while GoPro is in the middle of booting up.
                dispatch(goproGetHardwareInfoCommand());
                break;
            }
            dispatch(goproBluetoothSlice.actions.getHardwareInfoResponse(parseGetHardwareInfoResponse(commandResponse)));
            break;
        }
        case CommandId.OpenGoProGetVersion: {
            if (commandResponse.errorCode === CommandResponseCode.error) {
                // Error occured during open GoPro? Sometimes this happens while GoPro is in the middle of booting up.
                dispatch(openGoProGetVersion());
                break;
            }
            if (commandResponse.errorCode === CommandResponseCode.invalidParameter) {
                // Open GoPro unsupported
                // Likely device older than GoPro Hero 9
                dispatch(goproBluetoothSlice.actions.openGoProGetVersionResponse({ majorVersion: 0, minorVersion: 0 }));
                break;
            }
            dispatch(goproBluetoothSlice.actions.openGoProGetVersionResponse(parseOpenGoProGetVersionResponse(commandResponse)));
            break;
        }
        default:
            break;
    }
}

function onCommandResponseProvider(dispatch: ThunkDispatch<RootState, unknown, AnyAction>) {
    let responseDataAccumulator: number[] = [];
    let messageLengthLeft = 0;
    return (ev: Event) => {
        const characteristic = ev.target as BluetoothRemoteGATTCharacteristic;
        async function parseSingleMessage(): Promise<PacketResponse | undefined> {
            const { value } = characteristic;
            if (!value) {
                // Should not be possible...
                throw new Error('This should not be possible, empty response value');
            }
            const packetHeader = parsePacketHeader(value);
            if (packetHeader.isStart) {
                responseDataAccumulator = Array.from(new Uint8Array(value.buffer)).slice(packetHeader.headerSizeBytes);
                messageLengthLeft = packetHeader.messageLength;
                messageLengthLeft -= responseDataAccumulator.length;
            } else {
                // TODO consider using continuationIndex
                const continuationData = Array.from(new Uint8Array(value.buffer)).slice(packetHeader.headerSizeBytes);
                messageLengthLeft -= continuationData.length;
                responseDataAccumulator.push(...continuationData);
            }
            if (messageLengthLeft === 0) {
                return responseDataAccumulator;
            }
            if (messageLengthLeft < 0) throw new Error('Did response messages get out of sync?');
            return undefined;
        }
        parseSingleMessage()
            .then((response) => {
                if (!response) return;
                onCommandResponseDataReceived(dispatch, response);
            })
            .catch((error) => {
                // dispatch()
                toast(`Error while parsing response message ${error}`);
            });
    };
}

function parsePacketHeader(data: DataView) {
    const byte1 = data.getUint8(0);
    let headerSizeBytes = 1;
    // eslint-disable-next-line no-bitwise
    const isStart = (byte1 & 0b10000000) >> 7 === 0b0;
    if (!isStart) {
        // Continuation packet
        // eslint-disable-next-line no-bitwise
        const continuationIndex = byte1 & 0b01111111;
        return {
            isStart: false,
            headerSizeBytes: 1,
            continuationIndex,
        } as const;
    }
    // eslint-disable-next-line no-bitwise
    const startType = (byte1 & 0b01100000) >> 5;
    let messageLength: number;
    if (startType === 0b00) {
        // eslint-disable-next-line no-bitwise
        messageLength = byte1 & 0b00011111;
    } else if (startType === 0b01) {
        headerSizeBytes = 2;
        const byte2 = data.getUint8(1);
        // eslint-disable-next-line no-bitwise
        messageLength = (byte1 & (0b00011111 << 8)) | byte2;
    } else if (startType === 0b10) {
        headerSizeBytes = 3;
        const byte2 = data.getUint8(1);
        const byte3 = data.getUint8(2);
        // eslint-disable-next-line no-bitwise
        messageLength = (byte2 << 8) | byte3;
    } else if (startType === 0b11) {
        messageLength = 0;
    } else {
        throw new Error('IMPOSSIBLE');
    }
    return {
        isStart: true,
        headerSizeBytes,
        messageLength,
    } as const;
}

type PacketResponse = number[];
// async function listenForResponse(characteristic: BluetoothRemoteGATTCharacteristic) {
//     let resolvePromise: (value: PacketResponse | PromiseLike<PacketResponse>) => void;
//     let rejectPromise: (reason: Error) => void;
//     const promise = new Promise<PacketResponse>((resolve, reject) => {
//         resolvePromise = resolve;
//         rejectPromise = reject;
//     });
//     const timeoutHandle = setTimeout(() => {
//         rejectPromise(new Error('Timeout'));
//     }, 1000);
//     let responseDataAccumulator: number[] = [];
//     let messageLengthLeft = 0;
//     const onCharacteristicValueChanged = async () => {
//         const { value } = characteristic;
//         if (!value) {
//             // Should not be possible...
//             rejectPromise(new Error('This should not be possible, empty response value'));
//             return;
//         }
//         const packetHeader = parsePacketHeader(value);
//         if (packetHeader.isStart) {
//             responseDataAccumulator = Array.from(new Uint8Array(value.buffer)).slice(packetHeader.headerSizeBytes);
//             messageLengthLeft = packetHeader.messageLength;
//             messageLengthLeft -= responseDataAccumulator.length;
//         } else {
//             // TODO consider using continuationIndex
//             const continuationData = Array.from(new Uint8Array(value.buffer)).slice(packetHeader.headerSizeBytes);
//             messageLengthLeft -= continuationData.length;
//             responseDataAccumulator.push(...continuationData);
//         }
//         if (messageLengthLeft === 0) {
//             resolvePromise(responseDataAccumulator);
//         }
//         if (messageLengthLeft < 0) rejectPromise(new Error('Did response messages get out of sync?'));
//     };
//     promise.finally(() => {
//         characteristic.removeEventListener('characteristicvaluechanged', onCharacteristicValueChanged);
//         clearTimeout(timeoutHandle);
//     });
//     characteristic.addEventListener('characteristicvaluechanged', onCharacteristicValueChanged);
//     return promise;
// }

enum CommandResponseCode {
    unknown,
    success,
    error,
    invalidParameter,
}

function parseCommandResponseCode(responseCode: number) {
    switch (responseCode) {
        case 0:
            return CommandResponseCode.success;
        case 1:
            return CommandResponseCode.error;
        case 2:
            return CommandResponseCode.invalidParameter;
        default:
            return CommandResponseCode.unknown;
    }
}

interface CommandResponse {
    commandId: number;
    errorCode: CommandResponseCode;
    data: number[];
}

function parseCommandResponse(response: PacketResponse): CommandResponse {
    if (response.length < 2) throw new Error('command response too short');
    const commandId = response[0];
    const errorCode = parseCommandResponseCode(response[1]);
    const data = response.slice(2);
    return {
        commandId,
        errorCode,
        data,
    };
}

const lastQueuedPromiseArr: { context: unknown; promise: Promise<void> }[] = [];
/**
 * Enqueue a function to be called after the current function has finished.
 */
async function functionQueue(func: () => Promise<void>, context: unknown) {
    let lastQueuedPromise = lastQueuedPromiseArr.find((p) => p.context === context);
    if (!lastQueuedPromise) {
        lastQueuedPromise = { context, promise: Promise.resolve() };
        lastQueuedPromiseArr.push(lastQueuedPromise);
    }
    lastQueuedPromise.promise = lastQueuedPromise.promise.then(() => func());
    await lastQueuedPromise.promise;
}

type CommandData = number[];
async function sendCommand(commandData: CommandData) {
    await functionQueue(async () => {
        const { characteristics } = bluetoothDeviceState;
        if (!characteristics) throw new Error('no characteristics');
        const { commandCharacteristic } = characteristics;
        await commandCharacteristic.writeValue(new Uint8Array(commandData));
    }, sendCommand);
}

// Non-standard commands
export const goproForceShutdownCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/goproForceShutdownCommand', async () => {
    // Force shutdown GoPro, not documented in OpenGoPro
    // Bluetooth will be offline after this command
    // Tested with Hero 7 Black
    await sendCommand([0x01, 0x04]);
});

export const goproHiLightTagCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/goproHiLightTagCommand', async () => {
    // HiLight current moment on GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await sendCommand([0x01, 0x18]);
});

export const goproLocateOnCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/goproLocateOnCommand', async () => {
    // Locate mode on for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await sendCommand([0x03, 0x16, 0x01, 0x01]);
});

export const goproLocateOffCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/goproLocateOffCommand', async () => {
    // Locate mode off for GoPro, not documented in OpenGoPro
    // Tested with Hero 7 Black
    await sendCommand([0x03, 0x16, 0x01, 0x00]);
});

/*

// These are available for previous gopros like gopro hero 7
// that dont support open gopro
class Mode:
    Video = bytearray(0x03,0x02,0x01,0x00)
    Photo = bytearray(0x03,0x02,0x01,0x01)
    Timelapse = bytearray(0x03,0x02,0x01,0x02)
class Submode:
    class Video:
        Single =    bytearray(0x05,0x03,0x01,0x00,0x01,0x00)
        Looping =    bytearray(0x05,0x03,0x01,0x00,0x01,0x03)
        TimeLapse = bytearray(0x05,0x03,0x01,0x00,0x01,0x01)
    class Photo:
        Single = bytearray(0x05,0x03,0x01,0x01,0x01,0x01)
        Night = bytearray(0x05,0x03,0x01,0x01,0x01,0x02)
    class Timelapse:
        Burst =      bytearray(0x05,0x03,0x01,0x02,0x01,0x00)
        TimeLapse =  bytearray(0x05,0x03,0x01,0x02,0x01,0x01)
        NightLapse = bytearray(0x05,0x03,0x01,0x02,0x01,0x02)
*/

// Standard commands
export const goproSleepCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/goproSleepCommand', async () => {
    await sendCommand([0x01, 0x05]);
});

export const goproGetHardwareInfoCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/getHardwareInfoCommand', async () => {
    await sendCommand([0x01, 0x3c]);
});

export const setShutterOffCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/setShutterOffCommand', async () => {
    await sendCommand([0x03, 0x01, 0x01, 0x00]);
});

export const setShutterOnCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/setShutterOnCommand', async () => {
    await sendCommand([0x03, 0x01, 0x01, 0x01]);
});

export const apControlWiFiApOff = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/apControlWiFiApOff', async () => {
    await sendCommand([0x03, 0x17, 0x01, 0x00]);
});

export const apControlWiFiApOn = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/apControlWiFiApOn', async () => {
    await sendCommand([0x03, 0x17, 0x01, 0x01]);
});
// all next ones not work on hero 7

export const presetsLoadGroupVideo = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadGroupVideo', async () => {
    await sendCommand([0x04, 0x3e, 0x02, 0x03, 0xe8]);
});

export const presetsLoadGroupPhoto = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadGroupPhoto', async () => {
    await sendCommand([0x04, 0x3e, 0x02, 0x03, 0xe9]);
});

export const presetsLoadGroupTimelapse = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadGroupTimelapse', async () => {
    await sendCommand([0x04, 0x3e, 0x02, 0x03, 0xea]);
});

export const presetsLoadStandard = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadStandard', async () => {
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x00, 0x00, 0x00]);
});

export const presetsLoadActivity = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadActivity', async () => {
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x00, 0x00, 0x01]);
});

export const presetsLoadCinematic = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadCinematic', async () => {
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x00, 0x00, 0x02]);
});

export const presetsLoadUltraSloMo = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadUltraSloMo', async () => {
    // firmware >= v01.16.00
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x00, 0x00, 0x04]);
});

export const presetsLoadBasic = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadBasic', async () => {
    // firmware >= v01.16.00
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x00, 0x00, 0x05]);
});

export const presetsLoadPhoto = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadPhoto', async () => {
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x01, 0x00, 0x00]);
});

export const presetsLoadLiveBurst = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadLiveBurst', async () => {
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x01, 0x00, 0x01]);
});

export const presetsLoadBurstPhoto = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadBurstPhoto', async () => {
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x01, 0x00, 0x02]);
});

export const presetsLoadNightPhoto = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadNightPhoto', async () => {
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x01, 0x00, 0x03]);
});

export const presetsLoadTimeWarp = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadTimeWarp', async () => {
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x02, 0x00, 0x00]);
});

export const presetsLoadTimeLapse = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadTimeLapse', async () => {
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x02, 0x00, 0x01]);
});

export const presetsLoadNightLapse = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadNightLapse', async () => {
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x02, 0x00, 0x02]);
});

export const presetsLoadStandardEB = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadStandardEB', async () => {
    // firmware >= v01.16.00
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x08, 0x00, 0x00]);
});

export const presetsLoadActivityEB = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadActivityEB', async () => {
    // firmware >= v01.16.00
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x08, 0x00, 0x01]);
});

export const presetsLoadCinematicEB = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadCinematicEB', async () => {
    // firmware >= v01.16.00
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x08, 0x00, 0x02]);
});

export const presetsLoadSloMoEB = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoadSloMoEB', async () => {
    // firmware >= v01.16.00
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x08, 0x00, 0x03]);
});

export const presetsLoad4KTripod = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoad4KTripod', async () => {
    // firmware >= v01.16.00
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x09, 0x00, 0x00]);
});

export const presetsLoad53KTripod = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/presetsLoad53KTripod', async () => {
    // firmware >= v01.16.00
    await sendCommand([0x06, 0x40, 0x04, 0x00, 0x09, 0x00, 0x01]);
});

export const analyticsSetThirdPartyClient = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/analyticsSetThirdPartyClient', async () => {
    await sendCommand([0x01, 0x50]);
});

export const openGoProGetVersion = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/openGoProGetVersion', async () => {
    await sendCommand([0x01, 0x51]);
});

interface OpenGoProVersionState {
    majorVersion: number;
    minorVersion: number;
}

interface GetHardwareInfoState {
    modelNumber: number[];
    modelName: string;
    boardType: string;
    firmwareVersion: string;
    serialNumber: string;
    apSsid: string;
    apMacAddress: string;
}

interface GoproBluetoothDeviceCommandsState {
    isCommandInAction: boolean;
    getHardwareInfo?: GetHardwareInfoState;
    openGoProVersion?: OpenGoProVersionState;
}

interface GoproBluetoothDeviceState {
    isRequestingDevice: boolean;
    isDeviceSelected: boolean;
    deviceName: string;
    error?: string;
    isGattConnecting: boolean;
    gattConnected: boolean;
    goproBluetoothDeviceCommandsState: GoproBluetoothDeviceCommandsState;
}

export const initialState: GoproBluetoothDeviceState = {
    isRequestingDevice: false,
    isDeviceSelected: false,
    gattConnected: false,
    isGattConnecting: false,
    deviceName: 'unknown',
    goproBluetoothDeviceCommandsState: {
        isCommandInAction: false,
    },
};

export const goproBluetoothSlice = createSlice({
    name: 'bluetoothDevice',
    initialState,
    reducers: {
        gattDisconnected: (state, action: PayloadAction<string | undefined>) => {
            state.gattConnected = false;
            state.error = action.payload;
        },
        getHardwareInfoResponse: (state, action: PayloadAction<GetHardwareInfoState>) => {
            state.goproBluetoothDeviceCommandsState.getHardwareInfo = action.payload;
            // Let's override device name when we know wifi ssid
            state.deviceName = action.payload.apSsid;
        },
        openGoProGetVersionResponse: (state, action: PayloadAction<OpenGoProVersionState>) => {
            state.goproBluetoothDeviceCommandsState.openGoProVersion = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(requestDevice.pending, (state) => {
            bluetoothDeviceState.device = undefined;
            state.isRequestingDevice = true;
            state.isDeviceSelected = false;
            state.error = undefined;
        });
        builder.addCase(requestDevice.fulfilled, (state, action) => {
            state.isRequestingDevice = false;
            state.isDeviceSelected = true;
            state.error = undefined;
            state.deviceName = action.payload.deviceName;
        });
        builder.addCase(requestDevice.rejected, (state, action) => {
            bluetoothDeviceState.device = undefined;
            state.isRequestingDevice = false;
            state.isDeviceSelected = false;
            state.error = action.error.message ?? 'unknown error';
        });
        builder.addCase(gattConnect.pending, (state) => {
            state.isGattConnecting = true;
            state.gattConnected = false;
        });
        builder.addCase(gattConnect.fulfilled, (state) => {
            state.isGattConnecting = false;
            state.gattConnected = true;
        });
        builder.addCase(gattConnect.rejected, (state, action) => {
            state.isGattConnecting = false;
            state.gattConnected = false;
            state.error = action.error.message ?? 'unknown error';
        });
    },
});

export const goproBluetoothReducer = goproBluetoothSlice.reducer;
