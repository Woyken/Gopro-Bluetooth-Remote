import { requestDevice } from 'store/goproBluetoothServiceActions/goproBluetoothServiceActions';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { Box, Button, Container, Typography } from '@mui/material';

export const SearchForGoProView: React.FC = () => {
    const isRequestingDevice = useAppSelector((state) => state.goproBluetoothReducer.isRequestingDevice);
    const currentError = useAppSelector((state) => state.goproBluetoothReducer.error);
    const dispatch = useAppDispatch();
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {isRequestingDevice ? 'Select your GoPro' : 'Search for GoPro'}
                </Typography>
                <Button onClick={() => dispatch(requestDevice())}>Search</Button>
                {currentError ? <div>{currentError}</div> : null}
            </Box>
        </Container>
    );
};
