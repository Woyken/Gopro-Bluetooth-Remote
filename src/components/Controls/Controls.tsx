import React, { Component } from 'react';
import { Button } from "@material-ui/core";

class Controls extends Component<{}, {}> {
    constructor(props: {}) {
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
