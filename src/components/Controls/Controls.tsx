import React, { Component } from 'react';

import { Button } from '@mui/material';

class Controls extends Component<unknown, unknown> {
    constructor(props: unknown) {
        super(props);
        this.state = {};
    }

    render(): React.ReactNode {
        return (
            <div>
                <div>
                    Here lies all the controls
                    <Button variant="contained" color="primary">
                        Hello world
                    </Button>
                </div>
            </div>
        );
    }
}

export default Controls;
