import React, { Component } from 'react';
import TimelapseSubmodesList from './TimelapseSubmodesList';
import LoopIcon from '@material-ui/icons/Loop';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import SwitchVideoIcon from '@material-ui/icons/SwitchVideo';
import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';
import FlipCameraIosIcon from '@material-ui/icons/FlipCameraIos';
import { TimelapseMode } from '../../../actions/timelapseMode';

interface OwnState {
    modalOpen: boolean;
    timelapseMode: TimelapseMode;
}

class TimelapseMacroMode extends Component<{}, OwnState> {
    constructor(props: {}) {
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
                return <SwitchVideoIcon
                    fontSize="large"
                    onClick={this.handleOpenModal}
                />
            }
            case TimelapseMode.video: {
                return <TimelapseIcon
                    fontSize="large"
                    onClick={this.handleOpenModal}
                />
            }
            case TimelapseMode.nightPhoto: {
                return <LoopIcon
                    fontSize="large"
                    onClick={this.handleOpenModal}
                />
            }
            case TimelapseMode.photo: {
                return <CameraEnhanceIcon
                    fontSize="large"
                    onClick={this.handleOpenModal}
                />
            }
            default: {
                return <FlipCameraIosIcon
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
                <TimelapseSubmodesList
                    open={modalOpen}
                    onClose={(): void => {
                        this.setState({ modalOpen: false });
                    }}
                    onModeChange={(timelapseMode): void => {
                        this.setState({ timelapseMode, modalOpen: false })
                    }}
                />
            </div>
        );
    }
}

export default TimelapseMacroMode;
