import React, { Component } from 'react';

import LoopIcon from '@mui/icons-material/Loop';
import MonochromePhotosIcon from '@mui/icons-material/MonochromePhotos';
import VideocamIcon from '@mui/icons-material/Videocam';

import VideoMode from '../../../actions/videoMode';

import VideoSubmodesList from './VideoSubmodesList';

interface OwnState {
    modalOpen: boolean;
    videoMode: VideoMode;
}

class VideoMacroMode extends Component<unknown, OwnState> {
    constructor(props: unknown) {
        super(props);
        this.state = {
            modalOpen: false,
            videoMode: VideoMode.unknown,
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
    }

    handleOpenModal(): void {
        this.setState({ modalOpen: true });
    }

    currentMacroButton(): React.ReactNode {
        const { videoMode } = this.state;
        switch (videoMode) {
            case VideoMode.video: {
                return <VideocamIcon fontSize="large" onClick={this.handleOpenModal} />;
            }
            case VideoMode.loop: {
                return <LoopIcon fontSize="large" onClick={this.handleOpenModal} />;
            }
            case VideoMode.photo: {
                return <MonochromePhotosIcon fontSize="large" onClick={this.handleOpenModal} />;
            }
            default: {
                return <VideocamIcon fontSize="large" onClick={this.handleOpenModal} />;
            }
        }
    }

    render(): React.ReactNode {
        const { modalOpen } = this.state;
        return (
            <div>
                <div>{this.currentMacroButton()}</div>
                <VideoSubmodesList
                    open={modalOpen}
                    onClose={(): void => {
                        this.setState({ modalOpen: false });
                    }}
                    onModeChange={(videoMode): void => {
                        this.setState({ videoMode, modalOpen: false });
                    }}
                />
            </div>
        );
    }
}

export default VideoMacroMode;
