import React, { Component } from 'react';

import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import LoopIcon from '@mui/icons-material/Loop';
import SwitchVideoIcon from '@mui/icons-material/SwitchVideo';
import TimelapseIcon from '@mui/icons-material/Timelapse';

import TimelapseMode from '../../../actions/timelapseMode';

import TimelapseSubmodesList from './TimelapseSubmodesList';

interface OwnState {
    modalOpen: boolean;
    timelapseMode: TimelapseMode;
}

class TimelapseMacroMode extends Component<unknown, OwnState> {
    constructor(props: unknown) {
        super(props);
        this.state = {
            modalOpen: false,
            timelapseMode: TimelapseMode.unknown,
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
    }

    handleOpenModal(): void {
        this.setState({ modalOpen: true });
    }

    currentMacroButton(): React.ReactNode {
        const { timelapseMode } = this.state;
        switch (timelapseMode) {
            case TimelapseMode.timeWarp: {
                return <SwitchVideoIcon fontSize="large" onClick={this.handleOpenModal} />;
            }
            case TimelapseMode.video: {
                return <TimelapseIcon fontSize="large" onClick={this.handleOpenModal} />;
            }
            case TimelapseMode.nightPhoto: {
                return <LoopIcon fontSize="large" onClick={this.handleOpenModal} />;
            }
            case TimelapseMode.photo: {
                return <CameraEnhanceIcon fontSize="large" onClick={this.handleOpenModal} />;
            }
            default: {
                return <FlipCameraIosIcon fontSize="large" onClick={this.handleOpenModal} />;
            }
        }
    }

    render(): React.ReactNode {
        const { modalOpen } = this.state;
        return (
            <div>
                <div>{this.currentMacroButton()}</div>
                <TimelapseSubmodesList
                    open={modalOpen}
                    onClose={(): void => {
                        this.setState({ modalOpen: false });
                    }}
                    onModeChange={(timelapseMode): void => {
                        this.setState({ timelapseMode, modalOpen: false });
                    }}
                />
            </div>
        );
    }
}

export default TimelapseMacroMode;
