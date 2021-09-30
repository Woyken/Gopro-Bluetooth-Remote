import React, { Component } from 'react';
import MonochromePhotosIcon from '@material-ui/icons/MonochromePhotos';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import FlipCameraIosIcon from '@material-ui/icons/FlipCameraIos';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { PhotoMode } from '../../../actions/photoMode';
import PhotoSubmodesList from './PhotoSubmodesList';

interface OwnState {
    modalOpen: boolean;
    photoMode: PhotoMode;
}

class PhotoMacroMode extends Component<{}, OwnState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            modalOpen: false,
            photoMode: PhotoMode.unknown,
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
    }

    handleOpenModal(): void {
        this.setState({ modalOpen: true });
    }

    currentMacroButton(): React.ReactNode {
        const { photoMode } = this.state;
        switch (photoMode) {
            case PhotoMode.burst: {
                return <BurstModeIcon
                    fontSize="large"
                    onClick={this.handleOpenModal}
                />
            }
            case PhotoMode.continuous: {
                return <FlipCameraIosIcon
                    fontSize="large"
                    onClick={this.handleOpenModal}
                />
            }
            case PhotoMode.night: {
                return <MonochromePhotosIcon
                    fontSize="large"
                    onClick={this.handleOpenModal}
                />
            }
            case PhotoMode.single: {
                return <PhotoCameraIcon
                    fontSize="large"
                    onClick={this.handleOpenModal}
                />
            }
            default: {
                return <AddAPhotoIcon
                    fontSize="large"
                    onClick={this.handleOpenModal}
                />
            }

        }
    }

    render(): React.ReactNode {
        const { modalOpen } = this.state;
        return (
            <div>
                <div>
                    {this.currentMacroButton()}
                </div>
                <PhotoSubmodesList
                    open={modalOpen}
                    onClose={(): void => {
                        this.setState({ modalOpen: false });
                    }}
                    onModeChange={(photoMode): void => {
                        this.setState({ photoMode, modalOpen: false })
                    }}
                />
            </div>
        );
    }
}

export default PhotoMacroMode;
