import { gattConnect } from 'store/goproBluetoothServiceActions/goproBluetoothServiceActions';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { Box, Button, Container, Typography } from '@mui/material';

export const ConnectToGoProView: React.FC = () => {
    const isGattConnecting = useAppSelector((state) => state.goproBluetoothReducer.isGattConnecting);
    const deviceName = useAppSelector((state) => state.goproBluetoothReducer.deviceName);
    const currentError = useAppSelector((state) => state.goproBluetoothReducer.error);
    const dispatch = useAppDispatch();
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {isGattConnecting ? `Connecting to ${deviceName}...` : `Connect to ${deviceName}`}
                </Typography>
                {isGattConnecting ? null : <Button onClick={() => dispatch(gattConnect())}>Reconnect</Button>}
                {currentError ? <div>{currentError}</div> : null}
            </Box>
        </Container>
    );
};
