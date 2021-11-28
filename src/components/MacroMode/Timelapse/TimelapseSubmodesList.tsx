import React, { Component } from 'react';

import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import LoopIcon from '@mui/icons-material/Loop';
import SwitchVideoIcon from '@mui/icons-material/SwitchVideo';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import { Dialog, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import TimelapseMode from '../../../actions/timelapseMode';

interface OwnProps {
    onModeChange: (timelapseMode: TimelapseMode) => void;
    onClose: () => void;
    open: boolean;
}

class TimelapseSubmodesList extends Component<OwnProps, unknown> {
    constructor(props: OwnProps) {
        super(props);
        this.state = {};
    }

    render(): React.ReactNode {
        const { open, onClose, onModeChange } = this.props;
        return (
            <div>
                <Dialog open={open} onClose={onClose}>
                    <List>
                        <ListItem
                            button
                            onClick={(): void => {
                                onModeChange(TimelapseMode.timeWarp);
                            }}
                        >
                            <ListItemIcon>
                                <SwitchVideoIcon />
                            </ListItemIcon>
                            <ListItemText primary="Timelapse time-warp" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={(): void => {
                                onModeChange(TimelapseMode.photo);
                            }}
                        >
                            <ListItemIcon>
                                <CameraEnhanceIcon />
                            </ListItemIcon>
                            <ListItemText primary="Timelapse photo" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={(): void => {
                                onModeChange(TimelapseMode.nightPhoto);
                            }}
                        >
                            <ListItemIcon>
                                <LoopIcon />
                            </ListItemIcon>
                            <ListItemText primary="Timelapse night photo" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={(): void => {
                                onModeChange(TimelapseMode.video);
                            }}
                        >
                            <ListItemIcon>
                                <TimelapseIcon />
                            </ListItemIcon>
                            <ListItemText primary="Timelapse video" />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}

export default TimelapseSubmodesList;
