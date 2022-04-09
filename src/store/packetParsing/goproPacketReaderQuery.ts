/* eslint-disable no-bitwise */
import { allKnownStatuses } from 'store/goproBluetoothServiceActions/goproStatusMetadata';
import { goproSettingsSlice, GoproSettingsState } from 'store/slices/goproSettingsSlice';
import { RootState } from 'store/store';

import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import { PacketData } from './goproPacketReader';

export function queryResponseReceiverProvider(dispatch: ThunkDispatch<RootState, unknown, AnyAction>) {
    return (packetData: PacketData) => {
        const queryResponse = parseQueryResponse(packetData);
        dispatchQueryResponse(dispatch, queryResponse);
    };
}

export interface QueryResponse {
    errorCode: CommandResponseCode;
    statusesOrSettings: StatusOrSetting[];
    queryId: number;
}

function parseQueryResponse(packetData: PacketData): QueryResponse {
    if (packetData.length < 2) throw new Error('command response too short');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const queryId = packetData[0]!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const errorCode = parseQueryResponseCode(packetData[1]!);
    const statusesOrSettings = parseStatusesOrSettingsFromData(packetData.slice(2));
    return {
        queryId,
        errorCode,
        statusesOrSettings,
    };
}

function parseStatusesOrSettingsFromData(data: number[]) {
    const settings: StatusOrSetting[] = [];
    let dataIndex = 0;
    while (dataIndex < data.length) {
        const setting = readOneStatusOrSetting(data.slice(dataIndex));
        settings.push(setting);
        dataIndex += setting.value.length + 2;
    }
    return settings;
}

export interface StatusOrSetting {
    id: number;
    /** Length in bytes */
    length: number;
    value: number[];
}

function readOneStatusOrSetting(data: number[]): StatusOrSetting {
    const settingId = data[0] ?? 0;
    const dataLength = data[1] ?? 0;
    const settingValue = data.slice(2, dataLength + 2);
    return {
        id: settingId,
        length: dataLength,
        value: settingValue,
    };
}

function parseQueryResponseCode(responseCode: number) {
    // Probably same as query, not sure. Not in docs.
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

enum QueryId {
    /*
0x12 	Get setting value 	02:12:xx 	xx -> Setting ID
0x12 	Get all setting values 	01:12
0x13 	Get status value 	02:13:xx 	xx -> status code
0x13 	Get all status values 	01:13
0x52 	Register for setting updates 	nn:52:xx:… 	nn -> message length \n xx -> setting id
0x53 	Register for status updates 	nn:53:xx:… 	nn -> message length \n xx -> status code
0x72 	Unregister for setting updates 	nn:72:xx:… 	nn -> message length \n xx -> setting id
0x73 	Unregister for status updates 	nn:73:xx:… 	nn -> message length \n xx -> status code
 */
    getSettingValue = 0x12,
    getStatusValue = 0x13,
    registerForSettingUpdates = 0x52,
    registerForStatusUpdates = 0x53,
    unregisterForSettingUpdates = 0x72,
    unregisterForStatusUpdates = 0x73,
    // The Query ID for settings/status push notifications replaces the upper 4 bits with 1001 (nine).
    settingUpdate = 0x92,
    statusUpdate = 0x93,
}

const receivedSettingsReduceToKeyValue = (statusesOrSettings: StatusOrSetting[]): GoproSettingsState['settings'] =>
    statusesOrSettings.reduce((acc, setting) => {
        // unused settings will have length of 0
        if (setting.value.length === 0) return acc;
        const value = setting.value.reduce((sAcc, sCur) => (sAcc << 8) + sCur);
        const { length } = setting;
        acc[setting.id] = {
            value,
            length,
        };
        return acc;
    }, {} as GoproSettingsState['settings']);

const receivedStatusesReduceToKeyValue = (statusesOrSettings: StatusOrSetting[]): GoproSettingsState['statuses'] =>
    statusesOrSettings.reduce((acc, status) => {
        const valueLength = status.value.length;
        const knownStatus = allKnownStatuses.find((s) => s.id === status.id);
        if (knownStatus?.type === 'string' || valueLength > 4) {
            const valueStr = status.value.map((v) => String.fromCharCode(v)).join('');
            acc[status.id] = valueStr;
            return acc;
        }
        // unused statuses will have length of 0
        if (status.value.length === 0) return acc;
        const value = status.value.reduce((sAcc, sCur) => (sAcc << 8) + sCur);
        acc[status.id] = value;
        return acc;
    }, {} as GoproSettingsState['statuses']);

function dispatchQueryResponse(dispatch: ThunkDispatch<RootState, unknown, AnyAction>, queryResponse: QueryResponse) {
    switch (queryResponse.queryId) {
        case QueryId.getSettingValue:
            dispatch(goproSettingsSlice.actions.settingsReceived(receivedSettingsReduceToKeyValue(queryResponse.statusesOrSettings)));
            break;
        case QueryId.registerForSettingUpdates:
            // When registering to settings updates, it sends current values as response to the register command.
            dispatch(goproSettingsSlice.actions.settingsReceived(receivedSettingsReduceToKeyValue(queryResponse.statusesOrSettings)));
            break;
        case QueryId.settingUpdate:
            dispatch(goproSettingsSlice.actions.settingsReceived(receivedSettingsReduceToKeyValue(queryResponse.statusesOrSettings)));
            break;
        case QueryId.getStatusValue:
            dispatch(goproSettingsSlice.actions.statusesReceived(receivedStatusesReduceToKeyValue(queryResponse.statusesOrSettings)));
            break;
        case QueryId.registerForStatusUpdates:
            // When registering to status updates, it sends current values as response to the register command.
            dispatch(goproSettingsSlice.actions.statusesReceived(receivedStatusesReduceToKeyValue(queryResponse.statusesOrSettings)));
            break;
        case QueryId.statusUpdate:
            dispatch(goproSettingsSlice.actions.statusesReceived(receivedStatusesReduceToKeyValue(queryResponse.statusesOrSettings)));
            break;
        default:
            break;
    }
}
