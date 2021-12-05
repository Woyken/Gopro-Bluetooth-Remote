import { RootState } from 'store/store';

import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import { PacketData } from './goproPacketReader';

export function settingsResponseReceiverProvider(dispatch: ThunkDispatch<RootState, unknown, AnyAction>) {
    return (packetData: PacketData) => {
        // const settings = parseSettings(packetData);
        // dispatchSettings(dispatch, settings);
    };
}
