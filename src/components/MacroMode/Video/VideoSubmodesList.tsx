import React, { Component } from 'react';

import LoopIcon from '@mui/icons-material/Loop';
import MonochromePhotosIcon from '@mui/icons-material/MonochromePhotos';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Dialog, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import VideoMode from '../../../actions/videoMode';

interface OwnProps {
    onModeChange: (videoMode: VideoMode) => void;
    onClose: () => void;
    open: boolean;
}

class VideoSubmodesList extends Component<OwnProps, unknown> {
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
                                onModeChange(VideoMode.video);
                            }}
                        >
                            <ListItemIcon>
                                <VideocamIcon />
                            </ListItemIcon>
                            <ListItemText primary="Video" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={(): void => {
                                onModeChange(VideoMode.loop);
                            }}
                        >
                            <ListItemIcon>
                                <LoopIcon />
                            </ListItemIcon>
                            <ListItemText primary="Loop" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={(): void => {
                                onModeChange(VideoMode.photo);
                            }}
                        >
                            <ListItemIcon>
                                <MonochromePhotosIcon />
                            </ListItemIcon>
                            <ListItemText primary="Photo video" />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}

export default VideoSubmodesList;
