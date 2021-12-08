import {
    analyticsSetThirdPartyClientCommand,
    apControlWiFiApOffCommand,
    apControlWiFiApOnCommand,
    forceShutdownCommand,
    getHardwareInfoCommand,
    hiLightTagCommand,
    locateOffCommand,
    locateOnCommand,
    openGoProGetVersionCommand,
    presetsLoad4KTripodCommand,
    presetsLoad53KTripodCommand,
    presetsLoadActivityCommand,
    presetsLoadActivityEBCommand,
    presetsLoadBasicCommand,
    presetsLoadBurstPhotoCommand,
    presetsLoadCinematicCommand,
    presetsLoadCinematicEBCommand,
    presetsLoadGroupPhotoCommand,
    presetsLoadGroupTimelapseCommand,
    presetsLoadGroupVideoCommand,
    presetsLoadLiveBurstCommand,
    presetsLoadNightLapseCommand,
    presetsLoadNightPhotoCommand,
    presetsLoadPhotoCommand,
    presetsLoadSloMoEBCommand,
    presetsLoadStandardCommand,
    presetsLoadStandardEBCommand,
    presetsLoadTimeLapseCommand,
    presetsLoadTimeWarpCommand,
    presetsLoadUltraSloMoCommand,
    setShutterOffCommand,
    setShutterOnCommand,
    sleepCommand,
} from 'store/goproBluetoothServiceActions/commands/commands';

import { Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../store/hooks';

const AllCommandsButtons: React.FC = () => {
    const goproBluetooth = useAppSelector((state) => state.goproBluetoothReducer);
    const dispatch = useAppDispatch();
    return (
        <>
            <div>{JSON.stringify(goproBluetooth.goproBluetoothDeviceCommandsState.getHardwareInfo)}</div>
            <Button onClick={() => dispatch(sleepCommand())}>Sleep command</Button>
            <Button onClick={() => dispatch(forceShutdownCommand())}>goproForceShutdownCommand</Button>
            <Button onClick={() => dispatch(hiLightTagCommand())}>goproHiLightTagCommand</Button>
            <Button onClick={() => dispatch(locateOnCommand())}>goproLocateOnCommand</Button>
            <Button onClick={() => dispatch(locateOffCommand())}>goproLocateOffCommand</Button>
            <Button onClick={() => dispatch(getHardwareInfoCommand())}>Get hardware info command</Button>
            <Button onClick={() => dispatch(setShutterOnCommand())}>setShutterOnCommand</Button>
            <Button onClick={() => dispatch(setShutterOffCommand())}>setShutterOffCommand</Button>
            <Button onClick={() => dispatch(apControlWiFiApOffCommand())}>apControlWiFiApOff</Button>
            <Button onClick={() => dispatch(apControlWiFiApOnCommand())}>apControlWiFiApOn</Button>
            <Button onClick={() => dispatch(presetsLoadGroupVideoCommand())}>presetsLoadGroupVideo</Button>
            <Button onClick={() => dispatch(presetsLoadGroupPhotoCommand())}>presetsLoadGroupPhoto</Button>
            <Button onClick={() => dispatch(presetsLoadGroupTimelapseCommand())}>presetsLoadGroupTimelapse</Button>
            <Button onClick={() => dispatch(presetsLoadStandardCommand())}>presetsLoadStandard</Button>
            <Button onClick={() => dispatch(presetsLoadActivityCommand())}>presetsLoadActivity</Button>
            <Button onClick={() => dispatch(presetsLoadCinematicCommand())}>presetsLoadCinematic</Button>
            <Button onClick={() => dispatch(presetsLoadUltraSloMoCommand())}>presetsLoadUltraSloMo</Button>
            <Button onClick={() => dispatch(presetsLoadBasicCommand())}>presetsLoadBasic</Button>
            <Button onClick={() => dispatch(presetsLoadPhotoCommand())}>presetsLoadPhoto</Button>
            <Button onClick={() => dispatch(presetsLoadLiveBurstCommand())}>presetsLoadLiveBurst</Button>
            <Button onClick={() => dispatch(presetsLoadBurstPhotoCommand())}>presetsLoadBurstPhoto</Button>
            <Button onClick={() => dispatch(presetsLoadNightPhotoCommand())}>presetsLoadNightPhoto</Button>
            <Button onClick={() => dispatch(presetsLoadTimeWarpCommand())}>presetsLoadTimeWarp</Button>
            <Button onClick={() => dispatch(presetsLoadTimeLapseCommand())}>presetsLoadTimeLapse</Button>
            <Button onClick={() => dispatch(presetsLoadNightLapseCommand())}>presetsLoadNightLapse</Button>
            <Button onClick={() => dispatch(presetsLoadStandardEBCommand())}>presetsLoadStandardEB</Button>
            <Button onClick={() => dispatch(presetsLoadActivityEBCommand())}>presetsLoadActivityEB</Button>
            <Button onClick={() => dispatch(presetsLoadCinematicEBCommand())}>presetsLoadCinematicEB</Button>
            <Button onClick={() => dispatch(presetsLoadSloMoEBCommand())}>presetsLoadSloMoEB</Button>
            <Button onClick={() => dispatch(presetsLoad4KTripodCommand())}>presetsLoad4KTripod</Button>
            <Button onClick={() => dispatch(presetsLoad53KTripodCommand())}>presetsLoad53KTripod</Button>
            <Button onClick={() => dispatch(analyticsSetThirdPartyClientCommand())}>analyticsSetThirdPartyClient</Button>
            <Button onClick={() => dispatch(openGoProGetVersionCommand())}>openGoProGetVersion</Button>
        </>
    );
};

export default AllCommandsButtons;
