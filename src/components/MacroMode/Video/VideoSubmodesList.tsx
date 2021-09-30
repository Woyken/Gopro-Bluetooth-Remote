import React, { Component } from 'react';
import VideocamIcon from '@material-ui/icons/Videocam';
import LoopIcon from '@material-ui/icons/Loop';
import MonochromePhotosIcon from '@material-ui/icons/MonochromePhotos';
import { Dialog, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { VideoMode } from '../../../actions/videoMode';


interface OwnProps {
    onModeChange: (videoMode: VideoMode) => void;
    onClose: () => void;
    open: boolean;
}

class VideoSubmodesList extends Component<OwnProps, {}> {
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
                        <ListItem button onClick={(): void => {onModeChange(VideoMode.video)}}>
                            <ListItemIcon>
                                <VideocamIcon></VideocamIcon>
                            </ListItemIcon>
                            <ListItemText primary="Video"/>
                        </ListItem>
                        <ListItem button onClick={(): void => {onModeChange(VideoMode.loop)}}>
                            <ListItemIcon>
                                <LoopIcon></LoopIcon>
                            </ListItemIcon>
                            <ListItemText primary="Loop"/>
                        </ListItem>
                        <ListItem button onClick={(): void => {onModeChange(VideoMode.photo)}}>
                            <ListItemIcon>
                                <MonochromePhotosIcon></MonochromePhotosIcon>
                            </ListItemIcon>
                            <ListItemText primary="Photo video"/>
                        </ListItem>
                    </List>
                </Dialog>

            </div>
        );
    }
}

export default VideoSubmodesList;
