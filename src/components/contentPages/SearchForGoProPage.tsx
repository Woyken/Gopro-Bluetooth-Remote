import { useEffect } from 'react';
import { getKnownDevice, requestDevice } from 'store/goproBluetoothServiceActions/goproBluetoothServiceActions';
import { BluetoothDeviceAvailability } from 'store/slices/goproBluetoothSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { Box, Button, Container, Typography } from '@mui/material';

export const SearchForGoProView: React.FC = () => {
    const deviceAvailability = useAppSelector((state) => state.goproBluetoothReducer.deviceAvailability);
    const currentError = useAppSelector((state) => state.goproBluetoothReducer.error);
    const deviceName = useAppSelector((state) => state.goproBluetoothReducer.deviceName);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getKnownDevice());
    }, [dispatch]);
    const title = getTitle(deviceAvailability, deviceName);
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {title}
                </Typography>
                <Button onClick={() => dispatch(requestDevice())}>{deviceAvailability === BluetoothDeviceAvailability.SavedAndWaitingForAdvertisement ? 'Manual search' : 'Search'}</Button>
                {currentError ? <div>{currentError}</div> : null}
            </Box>
        </Container>
    );
};

function getTitle(deviceAvailability: BluetoothDeviceAvailability, deviceName: string) {
    switch (deviceAvailability) {
        case BluetoothDeviceAvailability.None:
            return 'Search for GoPro';
        case BluetoothDeviceAvailability.BeingRequested:
            return 'Select your GoPro';
        case BluetoothDeviceAvailability.SavedAndWaitingForAdvertisement:
            return `Trying to find saved GoPro (${deviceName})...`;
        default:
            return 'Search for GoPro';
    }
}
