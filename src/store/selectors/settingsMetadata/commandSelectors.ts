import createCachedSelector from 're-reselect';
import { RootState } from 'store/store';

import { createSelector } from '@reduxjs/toolkit';

import { selectSettingsMetadataSettingsJson } from '../settingsMetadataSelectors';

import { UiMode, uiModeToModeId } from './modesSelectors';

function uiModeToWsdkGroupAndMode(uiMode: UiMode) {
    let wsdkGroupId: number;
    let wsdkModeId: number;
    switch (uiMode) {
        case UiMode.singlePhoto:
            wsdkGroupId = 0x01;
            wsdkModeId = 0x00;
            break;
        case UiMode.photo:
            wsdkGroupId = 0x01;
            wsdkModeId = 0x01;
            break;
        case UiMode.burstPhoto:
            wsdkGroupId = 0x02;
            wsdkModeId = 0x00;
            break;
        case UiMode.nightPhoto:
            wsdkGroupId = 0x01;
            wsdkModeId = 0x02;
            break;
        case UiMode.video:
            wsdkGroupId = 0x00;
            wsdkModeId = 0x00;
            break;
        case UiMode.looping:
            wsdkGroupId = 0x00;
            wsdkModeId = 0x03;
            break;
        case UiMode.timeWarpVideo:
            wsdkGroupId = 0x00;
            wsdkModeId = 0x04;
            break;
        case UiMode.timeLapseVideo:
            wsdkGroupId = 0x00;
            wsdkModeId = 0x01;
            break;
        case UiMode.timeLapsePhoto:
            wsdkGroupId = 0x02;
            wsdkModeId = 0x01;
            break;
        case UiMode.nightLapsePhoto:
            wsdkGroupId = 0x02;
            wsdkModeId = 0x02;
            break;
        default:
            // Let's just fallback to video if something goes wrong
            wsdkGroupId = 0x00;
            wsdkModeId = 0x00;
            break;
    }
    return { wsdkGroupId, wsdkModeId };
}

export const commandGpCameraSubmode = {
    key: 'GPCAMERA_SUBMODE',
    commandId: 0x03,
    dataProducer: (uiMode: UiMode) => {
        const { wsdkGroupId, wsdkModeId } = uiModeToWsdkGroupAndMode(uiMode);
        return [0x01, wsdkGroupId, 0x01, wsdkModeId];
    },
};

export const commandGpCameraSetMode = {
    key: 'GPCAMERA_SET_MODE',
    commandId: 0x3e, // although another doing similar thing is 0x40
    dataProducer: (uiMode: UiMode) => {
        const modeId = uiModeToModeId(uiMode);
        // eslint-disable-next-line no-bitwise
        return [0x02, modeId >> 8, modeId & 0xff];
    },
};

const selectBleSupportedCommands = createSelector(selectSettingsMetadataSettingsJson, (settingsJson) => {
    switch (settingsJson?.schema_version) {
        case 4:
            return settingsJson.commands
                .filter((command) => command.network_types.find((t) => t === 'ble'))
                .map((command) => ({
                    key: command.key,
                    // When command is deprecated it shouldn't be used, but does it work?
                    // there are no deprecated commands for GoPro Hero 7, can't test it
                    deprecated: command.deprecated,
                }));
        case 5:
            return settingsJson.commands
                .filter((command) => command.network_types.find((t) => t === 'ble'))
                .map((command) => ({
                    key: command.key,
                    deprecated: command.deprecated,
                }));
        default:
            throw new Error('unsupported schema version');
    }
});

export const selectIsCommandSupportedByKey = createCachedSelector(
    selectBleSupportedCommands,
    (_: RootState, commandKey: string) => commandKey,
    (commands, commandKey) => commands.find((c) => c.key === commandKey) !== undefined
)((_: RootState, commandKey: string) => commandKey);
