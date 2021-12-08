import React from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';

export const Header: React.FC = () => (
    <AppBar position="sticky">
        <Toolbar>
            <Typography variant="h6">GoPro Bluetooth remote</Typography>
        </Toolbar>
    </AppBar>
);
