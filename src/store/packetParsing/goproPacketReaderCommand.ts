import { inflate } from 'pako';
import { GetHardwareInfoState, OpenGoProVersionState } from 'store/slices/goproBluetoothSlice';
import { RootState } from 'store/store';
import { parseAsSettings, SettingsJson } from 'utilities/definitions/goproTypes/settingsJson';

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

export enum CommandResponseCode {
    unknown = 1,
    success,
    error,
    invalidParameter,
}

export type CommandResponseSuccess = {
    commandId: number;
    errorCode: CommandResponseCode.success;
    data: number[];
};

export type CommandResponseError = {
    commandId: number;
    errorCode: Exclude<CommandResponseCode, CommandResponseCode.success>;
};

export type CommandResponse = CommandResponseSuccess | CommandResponseError;

export function assertCommandResponseSuccess(response: CommandResponse): asserts response is CommandResponseSuccess {
    switch (response.errorCode) {
        case CommandResponseCode.success:
            return;
        case CommandResponseCode.invalidParameter:
            throw new Error('Failed to fetch settings metadata. Unsupported camera model');
        case CommandResponseCode.error:
            throw new Error('Failed to fetch settings metadata. Error, camera still booting? Or stuck?');
        case CommandResponseCode.unknown:
            throw new Error('Failed to fetch settings metadata. Unknown error');
        default:
            throw new Error('Forgot to add new type?');
    }
}

export function parseCommandResponse(response: PacketData): CommandResponse {
    if (response.length < 2) throw new Error('command response too short');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const commandId = response[0]!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const errorCode = parseCommandResponseCode(response[1]!);
    const data = response.slice(2);
    return {
        commandId,
        errorCode,
        data,
    };
}

export function parseSettingsJsonResponse(commandResponse: CommandResponseSuccess): SettingsJson {
    const settingsJsonRaw = inflate(Uint8Array.from(commandResponse.data));
    const settingsJson = String.fromCharCode(...settingsJsonRaw);
    return parseAsSettings(settingsJson);
}

export async function dispatchCommandResponse(_: ThunkDispatch<RootState, unknown, AnyAction>, commandResponse: CommandResponse) {
    assertCommandResponseSuccess(commandResponse);
    // Left over for commands that are not handled explicitly
}

export function parseGetHardwareInfoResponse(commandResponse: CommandResponseSuccess): GetHardwareInfoState {
    const { data } = commandResponse;
    let dataIndex = 0;
    // model number
    const lengthOfModelNumber = data[dataIndex++] ?? 0;
    const modelNumber = new Array(lengthOfModelNumber).fill(0).map(() => data[dataIndex++] ?? 0);
    // model name
    const lengthOfModelName = data[dataIndex++] ?? 0;
    const modelName = new Array(lengthOfModelName)
        .fill(0)
        .map(() => String.fromCharCode(data[dataIndex++] ?? 0))
        .join('');
    // board type
    const lengthOfBoardType = data[dataIndex++] ?? 0;
    const boardType = new Array(lengthOfBoardType)
        .fill(0)
        .map(() => String.fromCharCode(data[dataIndex++] ?? 0))
        .join('');
    // firmware version
    const lengthOfFirmwareVersion = data[dataIndex++] ?? 0;
    const firmwareVersion = new Array(lengthOfFirmwareVersion)
        .fill(0)
        .map(() => String.fromCharCode(data[dataIndex++] ?? 0))
        .join('');
    // serial number
    const lengthOfSerialNumber = data[dataIndex++] ?? 0;
    const serialNumber = new Array(lengthOfSerialNumber)
        .fill(0)
        .map(() => String.fromCharCode(data[dataIndex++] ?? 0))
        .join('');
    // AP SSID
    const lengthOfApSsid = data[dataIndex++] ?? 0;
    const apSsid = new Array(lengthOfApSsid)
        .fill(0)
        .map(() => String.fromCharCode(data[dataIndex++] ?? 0))
        .join('');
    // AP MAC Address
    const lengthOfApMacAddress = data[dataIndex++] ?? 0;
    const apMacAddress = new Array(lengthOfApMacAddress)
        .fill(0)
        .map(() => String.fromCharCode(data[dataIndex++] ?? 0))
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

export function parseOpenGoProGetVersionResponse(commandResponse: CommandResponseSuccess): OpenGoProVersionState {
    const { data } = commandResponse;
    let dataIndex = 0;
    // Major version
    const lengthOfMajorVersion = data[dataIndex++];
    const majorVersion = new Array(lengthOfMajorVersion)
        .fill(0)
        .map(() => data[dataIndex++] ?? 0)
        // eslint-disable-next-line no-bitwise
        .reduce((acc, cur) => (acc << 8) + cur);
    // Minor version
    const lengthOfMinorVersion = data[dataIndex++];
    const minorVersion = new Array(lengthOfMinorVersion)
        .fill(0)
        .map(() => data[dataIndex++] ?? 0)
        // eslint-disable-next-line no-bitwise
        .reduce((acc, cur) => (acc << 8) + cur);
    return {
        majorVersion,
        minorVersion,
    };
}
