import { RootState } from 'store/store';

import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import { PacketData } from './goproPacketReader';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function settingsResponseReceiverProvider(_dispatch: ThunkDispatch<RootState, unknown, AnyAction>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (_packetData: PacketData) => {
        // const settings = parseSettings(packetData);
        // dispatchSettings(dispatch, settings);
    };
}
