import React, { Component } from 'react';
import LoopIcon from '@material-ui/icons/Loop';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import SwitchVideoIcon from '@material-ui/icons/SwitchVideo';
import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';
import { Dialog, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { TimelapseMode } from '../../../actions/timelapseMode';


interface OwnProps {
    onModeChange: (timelapseMode: TimelapseMode) => void;
    onClose: () => void;
    open: boolean;
}

class TimelapseSubmodesList extends Component<OwnProps, {}> {
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
                        <ListItem button onClick={(): void => {onModeChange(TimelapseMode.timeWarp)}}>
                            <ListItemIcon>
                                <SwitchVideoIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Timelapse time-warp"/>
                        </ListItem>
                        <ListItem button onClick={(): void => {onModeChange(TimelapseMode.photo)}}>
                            <ListItemIcon>
                                <CameraEnhanceIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Timelapse photo"/>
                        </ListItem>
                        <ListItem button onClick={(): void => {onModeChange(TimelapseMode.nightPhoto)}}>
                            <ListItemIcon>
                                <LoopIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Timelapse night photo"/>
                        </ListItem>
                        <ListItem button onClick={(): void => {onModeChange(TimelapseMode.video)}}>
                            <ListItemIcon>
                                <TimelapseIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Timelapse video"/>
                        </ListItem>
                    </List>
                </Dialog>

            </div>
        );
    }
}

export default TimelapseSubmodesList;
