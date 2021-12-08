import {
    analyticsSetThirdPartyClient,
    apControlWiFiApOff,
    apControlWiFiApOn,
    goproForceShutdownCommand,
    goproGetHardwareInfoCommand,
    goproHiLightTagCommand,
    goproLocateOffCommand,
    goproLocateOnCommand,
    goproSleepCommand,
    openGoProGetVersion,
    presetsLoad4KTripod,
    presetsLoad53KTripod,
    presetsLoadActivity,
    presetsLoadActivityEB,
    presetsLoadBasic,
    presetsLoadBurstPhoto,
    presetsLoadCinematic,
    presetsLoadCinematicEB,
    presetsLoadGroupPhoto,
    presetsLoadGroupTimelapse,
    presetsLoadGroupVideo,
    presetsLoadLiveBurst,
    presetsLoadNightLapse,
    presetsLoadNightPhoto,
    presetsLoadPhoto,
    presetsLoadSloMoEB,
    presetsLoadStandard,
    presetsLoadStandardEB,
    presetsLoadTimeLapse,
    presetsLoadTimeWarp,
    presetsLoadUltraSloMo,
    setShutterOffCommand,
    setShutterOnCommand,
} from 'store/goproBluetoothServiceActions/goproCommands';

import { Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../store/hooks';

const AllCommandsButtons: React.FC = () => {
    const goproBluetooth = useAppSelector((state) => state.goproBluetoothReducer);
    const dispatch = useAppDispatch();
    return (
        <>
            <div>{JSON.stringify(goproBluetooth.goproBluetoothDeviceCommandsState.getHardwareInfo)}</div>
            <Button onClick={() => dispatch(goproSleepCommand())}>Sleep command</Button>
            <Button onClick={() => dispatch(goproForceShutdownCommand())}>goproForceShutdownCommand</Button>
            <Button onClick={() => dispatch(goproHiLightTagCommand())}>goproHiLightTagCommand</Button>
            <Button onClick={() => dispatch(goproLocateOnCommand())}>goproLocateOnCommand</Button>
            <Button onClick={() => dispatch(goproLocateOffCommand())}>goproLocateOffCommand</Button>
            <Button onClick={() => dispatch(goproGetHardwareInfoCommand())}>Get hardware info command</Button>
            <Button onClick={() => dispatch(setShutterOnCommand())}>setShutterOnCommand</Button>
            <Button onClick={() => dispatch(setShutterOffCommand())}>setShutterOffCommand</Button>
            <Button onClick={() => dispatch(apControlWiFiApOff())}>apControlWiFiApOff</Button>
            <Button onClick={() => dispatch(apControlWiFiApOn())}>apControlWiFiApOn</Button>
            <Button onClick={() => dispatch(presetsLoadGroupVideo())}>presetsLoadGroupVideo</Button>
            <Button onClick={() => dispatch(presetsLoadGroupPhoto())}>presetsLoadGroupPhoto</Button>
            <Button onClick={() => dispatch(presetsLoadGroupTimelapse())}>presetsLoadGroupTimelapse</Button>
            <Button onClick={() => dispatch(presetsLoadStandard())}>presetsLoadStandard</Button>
            <Button onClick={() => dispatch(presetsLoadActivity())}>presetsLoadActivity</Button>
            <Button onClick={() => dispatch(presetsLoadCinematic())}>presetsLoadCinematic</Button>
            <Button onClick={() => dispatch(presetsLoadUltraSloMo())}>presetsLoadUltraSloMo</Button>
            <Button onClick={() => dispatch(presetsLoadBasic())}>presetsLoadBasic</Button>
            <Button onClick={() => dispatch(presetsLoadPhoto())}>presetsLoadPhoto</Button>
            <Button onClick={() => dispatch(presetsLoadLiveBurst())}>presetsLoadLiveBurst</Button>
            <Button onClick={() => dispatch(presetsLoadBurstPhoto())}>presetsLoadBurstPhoto</Button>
            <Button onClick={() => dispatch(presetsLoadNightPhoto())}>presetsLoadNightPhoto</Button>
            <Button onClick={() => dispatch(presetsLoadTimeWarp())}>presetsLoadTimeWarp</Button>
            <Button onClick={() => dispatch(presetsLoadTimeLapse())}>presetsLoadTimeLapse</Button>
            <Button onClick={() => dispatch(presetsLoadNightLapse())}>presetsLoadNightLapse</Button>
            <Button onClick={() => dispatch(presetsLoadStandardEB())}>presetsLoadStandardEB</Button>
            <Button onClick={() => dispatch(presetsLoadActivityEB())}>presetsLoadActivityEB</Button>
            <Button onClick={() => dispatch(presetsLoadCinematicEB())}>presetsLoadCinematicEB</Button>
            <Button onClick={() => dispatch(presetsLoadSloMoEB())}>presetsLoadSloMoEB</Button>
            <Button onClick={() => dispatch(presetsLoad4KTripod())}>presetsLoad4KTripod</Button>
            <Button onClick={() => dispatch(presetsLoad53KTripod())}>presetsLoad53KTripod</Button>
            <Button onClick={() => dispatch(analyticsSetThirdPartyClient())}>analyticsSetThirdPartyClient</Button>
            <Button onClick={() => dispatch(openGoProGetVersion())}>openGoProGetVersion</Button>
        </>
    );
};

export default AllCommandsButtons;
