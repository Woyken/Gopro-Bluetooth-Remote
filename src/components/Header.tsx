import React from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';

import InstallPwaButton from './InstallPwaButton';

export const Header: React.FC = () => (
    <AppBar position="sticky">
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                GoPro Bluetooth remote
            </Typography>
            <InstallPwaButton />
        </Toolbar>
    </AppBar>
);
