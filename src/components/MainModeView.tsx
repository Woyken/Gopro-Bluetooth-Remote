import { apControlWiFiApOffCommand, apControlWiFiApOnCommand, setShutterOffCommand, setShutterOnCommand, sleepCommand } from 'store/goproBluetoothServiceActions/commands/commands';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectDeviceName } from 'store/selectors/bluetoothStateSelectors';
import {
    selectBatteryPercentage,
    selectCurrentRecordingTimeText,
    selectIsBatteryCharging,
    selectIsShutterActive,
    selectIsWifiApEnabled,
    selectStorageRemainingTimeText,
} from 'store/selectors/statusSelectors';
import { makeStyles } from 'theme/makeStyles';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import RecordInactiveIcon from '@mui/icons-material/RadioButtonChecked';
import SdStorageIcon from '@mui/icons-material/SdStorage';
// import SignalWifi0BarIcon from '@mui/icons-material/SignalWifi0Bar';
// import SignalWifi1BarIcon from '@mui/icons-material/SignalWifi1Bar';
// import SignalWifi2BarIcon from '@mui/icons-material/SignalWifi2Bar';
// import SignalWifi3BarIcon from '@mui/icons-material/SignalWifi3Bar';
// import SignalWifi4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import SignalWifiOffIcon from '@mui/icons-material/SignalWifiOff';
import WifiIcon from '@mui/icons-material/Wifi';
import { Container, IconButton, Paper, Typography } from '@mui/material';

import PhotoModeSwitcherButton from './modeSwitchButtons/photoModeSwitcherButton';
import TimelapseModeSwitcherButton from './modeSwitchButtons/timelapseModeSwitcherButton';
import VideoModeSwitcherButton from './modeSwitchButtons/videoModeSwitcherButton';
import BatteryPercentageIcon from './BatteryPercentageIcon';
import { SettingsPreferencesButton } from './SettingsPreferences';
import SettingsPreview from './SettingsPreview';

const useStyles = makeStyles()({
    pageWrapper: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    topControls: {
        width: '100%',
    },
    bottomControls: {
        width: '100%',
    },
    bottomCenteredButtons: {
        width: '100%',
        alignSelf: 'flex-end',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    alignLeftToRight: {
        display: 'flex',
    },
    button: {
        margin: '0.5rem',
    },
    recordButton: {
        margin: '0.5rem',
        '& svg': {
            fontSize: '5rem',
        },
    },
    floatLeft: {
        flex: 1,
        display: 'flex',
    },
    floatRight: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
    },
});

// TODO split this component
const MainModeView: React.FC = () => {
    const { classes } = useStyles();
    const deviceName = useAppSelector(selectDeviceName);
    const isWifiApEnabled = useAppSelector(selectIsWifiApEnabled);
    const batteryPercentage = useAppSelector(selectBatteryPercentage);
    const isCharging = useAppSelector(selectIsBatteryCharging);
    // TODO sd card icon, display it's status statusSdStatus33
    // TODO remaining space KB in sd card statusRemainingSpace54
    const storageRemainingTimeText = useAppSelector(selectStorageRemainingTimeText);

    const isShutterActive = useAppSelector(selectIsShutterActive);
    const currentRecordingTimeText = useAppSelector(selectCurrentRecordingTimeText);
    const dispatch = useAppDispatch();
    const handlePowerButtonClick = () => {
        dispatch(sleepCommand());
    };
    const handleWiFiButtonClick = () => {
        if (isWifiApEnabled) {
            dispatch(apControlWiFiApOffCommand());
        } else {
            dispatch(apControlWiFiApOnCommand());
        }
    };
    const handleShutterButtonClick = () => {
        if (isShutterActive) {
            dispatch(setShutterOffCommand());
        } else {
            dispatch(setShutterOnCommand());
        }
    };

    return (
        <>
            <Container maxWidth="sm" sx={{ display: 'flex', flexGrow: 1 }}>
                <Paper className={classes.pageWrapper}>
                    <div className={classes.topControls}>
                        <br />
                        <Container sx={{ width: 'fit-content' }}>
                            <Paper sx={{ padding: '0.4em' }} elevation={2}>
                                <Typography variant="h4">{deviceName}</Typography>
                            </Paper>
                            <IconButton onClick={handlePowerButtonClick}>
                                <PowerSettingsNewIcon />
                            </IconButton>
                            <IconButton onClick={handleWiFiButtonClick}>{isWifiApEnabled ? <WifiIcon /> : <SignalWifiOffIcon />}</IconButton>
                            <IconButton>
                                <SdStorageIcon />
                                <Typography variant="body1">{storageRemainingTimeText}</Typography>
                            </IconButton>
                            <BatteryPercentageIcon batteryPercentage={batteryPercentage} isCharging={isCharging} />
                        </Container>
                    </div>
                    <div className={classes.bottomControls}>
                        <SettingsPreview />
                        <div className={classes.bottomCenteredButtons}>
                            <TimelapseModeSwitcherButton />
                            <VideoModeSwitcherButton />
                            <PhotoModeSwitcherButton />
                        </div>
                        <div className={classes.alignLeftToRight}>
                            <div className={classes.floatLeft}>
                                <SettingsPreferencesButton />
                            </div>
                            <div className={classes.recordButton}>
                                <IconButton onClick={handleShutterButtonClick} aria-label="Record button" color="error">
                                    {isShutterActive ? <FiberManualRecordIcon /> : <RecordInactiveIcon />}
                                </IconButton>
                            </div>
                            <div className={classes.floatRight}>{isShutterActive && <Typography variant="h6">{currentRecordingTimeText}</Typography>}</div>
                        </div>
                    </div>
                </Paper>
            </Container>
        </>
    );
};

export default MainModeView;
