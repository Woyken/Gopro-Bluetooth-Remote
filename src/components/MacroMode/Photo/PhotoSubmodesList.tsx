import React, { Component } from 'react';
import MonochromePhotosIcon from '@material-ui/icons/MonochromePhotos';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import FlipCameraIosIcon from '@material-ui/icons/FlipCameraIos';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { Dialog, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { PhotoMode } from '../../../actions/photoMode';


interface OwnProps {
    onModeChange: (photoMode: PhotoMode) => void;
    onClose: () => void;
    open: boolean;
}

class PhotoSubmodesList extends Component<OwnProps, {}> {
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
                        <ListItem button onClick={(): void => {onModeChange(PhotoMode.burst)}}>
                            <ListItemIcon>
                                <BurstModeIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Photo burst"/>
                        </ListItem>
                        <ListItem button onClick={(): void => {onModeChange(PhotoMode.continuous)}}>
                            <ListItemIcon>
                                <FlipCameraIosIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Photo continuous"/>
                        </ListItem>
                        <ListItem button onClick={(): void => {onModeChange(PhotoMode.single)}}>
                            <ListItemIcon>
                                <PhotoCameraIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Photo single"/>
                        </ListItem>
                        <ListItem button onClick={(): void => {onModeChange(PhotoMode.night)}}>
                            <ListItemIcon>
                                <MonochromePhotosIcon></MonochromePhotosIcon>
                            </ListItemIcon>
                            <ListItemText primary="Photo night"/>
                        </ListItem>
                    </List>
                </Dialog>

            </div>
        );
    }
}

export default PhotoSubmodesList;
