import React, { Component } from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';

class Header extends Component<unknown, unknown> {
    constructor(props: unknown) {
        super(props);
        this.state = {};
    }

    render(): React.ReactNode {
        return (
            <div>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6">Gopro web bluetooth remote</Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;
