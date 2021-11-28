import React, { Component } from 'react';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import CameraIcon from '@mui/icons-material/Camera';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import WifiIcon from '@mui/icons-material/Wifi';

import Controls from '../Controls/Controls';
import PhotoMacroMode from '../MacroMode/Photo/PhotoMacroMode';
import TimelapseMacroMode from '../MacroMode/Timelapse/TimelapseMacroMode';
import VideoMacroMode from '../MacroMode/Video/VideoMacroMode';

const Grid: any = undefined;
const Cell: any = undefined;

class Content extends Component<unknown, unknown> {
    constructor(props: unknown) {
        super(props);
        this.state = {};
    }

    render(): React.ReactNode {
        return (
            <div>
                <Grid columns="1fr 1fr 1fr" rows="1fr 4fr 1fr" areas={['wifi locate shutdown', 'logo logo logo', 'modeBtn shutter tag']}>
                    <Cell center area="wifi">
                        <WifiIcon fontSize="large" />
                    </Cell>
                    <Cell center area="locate">
                        <NotListedLocationIcon fontSize="large" />
                    </Cell>
                    <Cell center area="shutdown">
                        <PowerSettingsNewIcon fontSize="large" />
                    </Cell>
                    <Cell center area="modeBtn">
                        <TimelapseMacroMode />
                        <VideoMacroMode />
                        <PhotoMacroMode />
                    </Cell>
                    <Cell center area="shutter">
                        <CameraIcon fontSize="large" />
                    </Cell>
                    <Cell center area="tag">
                        <BookmarkIcon fontSize="large" />
                    </Cell>
                </Grid>

                <Controls />
            </div>
        );
    }
}

export default Content;
