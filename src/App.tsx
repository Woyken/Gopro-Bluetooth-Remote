import MainModeView from 'components/MainModeView';
import React from 'react';
import { gattConnect, requestDevice } from 'store/goproBluetoothServiceActions/goproBluetoothServiceActions';
import { tempSettingsDump, tempStatusesDump } from 'store/goproBluetoothSlice';
import { makeStyles } from 'theme/makeStyles';

import { Box, Button, Container, Typography } from '@mui/material';

import AllCommandsButtons from './components/AllCommandsButtons';
import { useAppDispatch, useAppSelector } from './store/hooks';

import './App.css';

const useStyles = makeStyles()({
    flexContent: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        maxHeight: '-webkit-fill-available',
        display: 'flex',
        flexDirection: 'column',
    },
});

const App: React.FC = () => {
    const { classes } = useStyles();
    const goproBluetooth = useAppSelector((state) => state.goproBluetoothReducer);
    const dispatch = useAppDispatch();
    if (window.location.protocol === 'http:') {
        return <div>Bluetooth is not supported for http pages</div>;
    }
    if (typeof navigator.bluetooth === 'undefined') {
        return <div>bluetooth not found for this browser</div>;
    }
    if (!goproBluetooth.isDeviceSelected) {
        if (goproBluetooth.isRequestingDevice) {
            return <div>Select Gopro bluetooth device from prompt</div>;
        }
        return (
            <div className={classes.flexContent}>
                <Container maxWidth="sm">
                    <Box sx={{ my: 4 }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Search for GoPro
                        </Typography>
                        <Button onClick={() => dispatch(requestDevice())}>Search</Button>
                        {goproBluetooth.error ? <div>{goproBluetooth.error}</div> : null}
                    </Box>
                </Container>
                <MainModeView />
            </div>
        );
    }
    if (!goproBluetooth.gattConnected) {
        if (goproBluetooth.isGattConnecting) {
            return <div>Connecting to bluetooth device</div>;
        }
        return (
            <div>
                <Container maxWidth="sm">
                    <Box sx={{ my: 4 }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Connect to {goproBluetooth.deviceName}
                        </Typography>
                        <Button onClick={() => dispatch(gattConnect())}>Connect</Button>
                        {goproBluetooth.error ? <div>{goproBluetooth.error}</div> : null}
                    </Box>
                </Container>
            </div>
        );
    }
    // TODO need a concept how could switching between modes look
    // Imitating Gopro UI doesn't really work, since we don't have preview here
    return (
        <div className={classes.flexContent}>
            <Container maxWidth="sm">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Connected to &quot;{goproBluetooth.deviceName}&quot;
                    </Typography>
                    <Button onClick={() => dispatch(tempSettingsDump())}>settings dump</Button>
                    <Button onClick={() => dispatch(tempStatusesDump())}>statuses dump</Button>
                    {(window as unknown as { allButtons: boolean }).allButtons ? <AllCommandsButtons /> : null}
                </Box>
            </Container>
            <MainModeView />
            {/* <div columns="1fr" rows="65px 1fr 45px" areas={['header', 'content', 'footer']}>
                <div area="header">
                    <Header />
                </div>
                <div area="content">
                    <Content />
                    <FindCamera />
                </div>
                <div area="footer">Footer</div>
            </div> */}
        </div>
    );
};

export default App;
