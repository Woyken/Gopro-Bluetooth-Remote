import { settingsCurrentMode92 } from 'store/goproBluetoothServiceActions/goproSettingsMetadata';
import { statusApState69, statusEncodingActive10, statusInternalBatteryPercentage70, statusVideoProgressCounter13 } from 'store/goproBluetoothServiceActions/goproStatusMetadata';
import {
    apControlWiFiApOff,
    apControlWiFiApOn,
    goproLegacyPresetsLoadGroupMultishotCommand,
    goproLegacyPresetsLoadGroupPhotoCommand,
    goproLegacyPresetsLoadGroupVideoCommand,
    goproSleepCommand,
    setShutterOffCommand,
    setShutterOnCommand,
} from 'store/goproBluetoothSlice';
import { SettingValue } from 'store/goproSettingsSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { makeStyles } from 'theme/makeStyles';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import RecordInactiveIcon from '@mui/icons-material/RadioButtonChecked';
// import SignalWifi0BarIcon from '@mui/icons-material/SignalWifi0Bar';
// import SignalWifi1BarIcon from '@mui/icons-material/SignalWifi1Bar';
// import SignalWifi2BarIcon from '@mui/icons-material/SignalWifi2Bar';
// import SignalWifi3BarIcon from '@mui/icons-material/SignalWifi3Bar';
// import SignalWifi4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import SignalWifiOffIcon from '@mui/icons-material/SignalWifiOff';
import TimelapseVideoIcon from '@mui/icons-material/SwitchVideo';
import VideocamIcon from '@mui/icons-material/Videocam';
import WifiIcon from '@mui/icons-material/Wifi';
import { Button, Container, IconButton, Paper, Typography } from '@mui/material';

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
    },
    floatRight: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
    },
});

enum DisplayModeGroup {
    video = 'Video',
    photo = 'Photo',
    timeLapse = 'Time Lapse',
}

function getCurrentModeGroup(settingCurrentMode: SettingValue) {
    if (!settingCurrentMode) return DisplayModeGroup.video;
    switch (settingCurrentMode.value) {
        case 0xc:
        case 0xf:
            return DisplayModeGroup.video;
        case 0x11:
        case 0x12:
        case 0x13:
            return DisplayModeGroup.photo;
        case 0x18:
        case 0xd:
        case 0x14:
        case 0x15:
            return DisplayModeGroup.timeLapse;
        default:
            return DisplayModeGroup.video;
    }
}

// TODO split this component
const MainModeView: React.FC = () => {
    const { classes } = useStyles();
    const statuses = useAppSelector((state) => state.goproSettingsReducer.statuses);
    const settingCurrentMode = useAppSelector((state) => state.goproSettingsReducer.settings[settingsCurrentMode92.id]);
    const settingCurrentCategory = getCurrentModeGroup(settingCurrentMode);
    const deviceName = useAppSelector((state) => state.goproBluetoothReducer.deviceName);
    const isWifiApEnabled = statuses[statusApState69.id] === 1;
    const batteryPercentage = statuses[statusInternalBatteryPercentage70.id];
    const isShutterActive = statuses[statusEncodingActive10.id] === 1;
    const currentRecordingTime = statuses[statusVideoProgressCounter13.id] as number;
    const currentRecordingMinutes = Math.floor(currentRecordingTime / 60);
    const currentRecordingSeconds = currentRecordingTime % 60;
    const dispatch = useAppDispatch();
    const handlePowerButtonClick = () => {
        dispatch(goproSleepCommand());
    };
    const handleWiFiButtonClick = () => {
        if (isWifiApEnabled) {
            dispatch(apControlWiFiApOff());
        } else {
            dispatch(apControlWiFiApOn());
        }
    };
    const handlePhotoModeButtonClick = () => {
        dispatch(goproLegacyPresetsLoadGroupPhotoCommand());
    };
    const handleVideoModeButtonClick = () => {
        dispatch(goproLegacyPresetsLoadGroupVideoCommand());
    };
    const handleTimelapseModeButtonClick = () => {
        dispatch(goproLegacyPresetsLoadGroupMultishotCommand());
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
                            <p>Mode: {settingCurrentCategory}</p>
                            <p>Storage left: 07:23</p>
                            <p>Battery: {batteryPercentage}%</p>
                        </Container>
                    </div>
                    <div className={classes.bottomControls}>
                        <SettingsPreview />
                        <div className={classes.bottomCenteredButtons}>
                            <Button
                                onClick={handleTimelapseModeButtonClick}
                                className={classes.button}
                                aria-label="Timelapse mode"
                                color={settingCurrentCategory === DisplayModeGroup.timeLapse ? 'secondary' : 'primary'}
                                variant="contained"
                            >
                                <TimelapseVideoIcon />
                            </Button>

                            <Button
                                onClick={handleVideoModeButtonClick}
                                className={classes.button}
                                aria-label="Video mode"
                                color={settingCurrentCategory === DisplayModeGroup.video ? 'secondary' : 'primary'}
                                variant="contained"
                            >
                                <VideocamIcon />
                            </Button>
                            <Button
                                onClick={handlePhotoModeButtonClick}
                                className={classes.button}
                                aria-label="Photo mode"
                                color={settingCurrentCategory === DisplayModeGroup.photo ? 'secondary' : 'primary'}
                                variant="contained"
                            >
                                <PhotoCameraIcon />
                            </Button>
                        </div>
                        <div className={classes.alignLeftToRight}>
                            <div className={classes.floatLeft} />
                            <div className={classes.recordButton}>
                                <IconButton onClick={handleShutterButtonClick} aria-label="Record button" color="error">
                                    {isShutterActive ? <FiberManualRecordIcon /> : <RecordInactiveIcon />}
                                </IconButton>
                            </div>
                            <div className={classes.floatRight}>
                                {isShutterActive && (
                                    <Typography variant="h6">
                                        {currentRecordingMinutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })}:
                                        {currentRecordingSeconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}
                                    </Typography>
                                )}
                            </div>
                        </div>
                    </div>
                </Paper>
            </Container>
        </>
    );
};

export default MainModeView;
