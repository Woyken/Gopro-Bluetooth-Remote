import { ConnectToGoProView } from 'components/contentPages/ConnectToGoProPage';
import { ErrorPage } from 'components/contentPages/ErrorPage';
import { SearchForGoProView } from 'components/contentPages/SearchForGoProPage';
import { Header } from 'components/Header';
import MainModeView from 'components/MainModeView';
import { useAllPreferences } from 'hooks/preferences/allPreferencesHook';
import React from 'react';
import { BluetoothDeviceAvailability } from 'store/slices/goproBluetoothSlice';
import { makeStyles } from 'theme/makeStyles';

import { useAppSelector } from './store/hooks';

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

const RenderContent: React.FC = () => {
    const deviceAvailability = useAppSelector((state) => state.goproBluetoothReducer.deviceAvailability);
    const isGattConnected = useAppSelector((state) => state.goproBluetoothReducer.isGattConnected);
    if (window.location.protocol !== 'https:') return <ErrorPage errorTitle="Bluetooth requires https" errorDescription="Web Bluetooth will only work on https pages" />;
    if (!('bluetooth' in navigator)) return <ErrorPage errorTitle="Bluetooth not supported" errorDescription="Your browser does not support bluetooth. https://caniuse.com/web-bluetooth" />;
    switch (deviceAvailability) {
        case BluetoothDeviceAvailability.None:
        case BluetoothDeviceAvailability.BeingRequested:
        case BluetoothDeviceAvailability.SavedAndWaitingForAdvertisement:
            return <SearchForGoProView />;
        default:
            break;
    }
    if (!isGattConnected) return <ConnectToGoProView />;
    return <MainModeView />;
};

const App: React.FC = () => {
    // Probably not the best way to hook into state for custom preferences handling. Consider creating middleware for this.
    useAllPreferences();

    const { classes } = useStyles();
    return (
        <div className={classes.flexContent}>
            <Header />
            <RenderContent />
        </div>
    );
};

export default App;
