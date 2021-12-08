import { goproGetHardwareInfoCommand, openGoProGetVersion } from 'store/goproBluetoothServiceActions/goproCommands';
import { GetHardwareInfoState, goproBluetoothSlice, OpenGoProVersionState } from 'store/goproBluetoothSlice';
import { RootState } from 'store/store';

import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import { PacketData } from './goproPacketReader';

export function commandResponseReceiverProvider(dispatch: ThunkDispatch<RootState, unknown, AnyAction>) {
    return (packetData: PacketData) => {
        // TODO parse actual command messages and update state
        const commandResponse = parseCommandResponse(packetData);
        dispatchCommandResponse(dispatch, commandResponse);
    };
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

enum CommandResponseCode {
    unknown,
    success,
    error,
    invalidParameter,
}

interface CommandResponse {
    commandId: number;
    errorCode: CommandResponseCode;
    data: number[];
}

function parseCommandResponse(response: PacketData): CommandResponse {
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
    // TODO handle regular command response?
    // At least show error toast on failure?
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
