import React, { Component } from 'react';
import { Grid, Cell } from "styled-css-grid";
import Controls from '../Controls/Controls';
import VideoMacroMode from '../MacroMode/Video/VideoMacroMode';

import CameraIcon from '@material-ui/icons/Camera';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import WifiIcon from '@material-ui/icons/Wifi';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';

import TimelapseMacroMode from '../MacroMode/Timelapse/TimelapseMacroMode';
import PhotoMacroMode from '../MacroMode/Photo/PhotoMacroMode';




class Content extends Component<{}, {}> {
    constructor(props: {}) {
     super(props);
        this.state = {};
    }

    render(): React.ReactNode {
        return (
            <div>
                <Grid
                    columns={"1fr 1fr 1fr"}
                    rows={"1fr 4fr 1fr"}
                    areas={[
                        "wifi locate shutdown",
                        "logo logo logo",
                        "modeBtn shutter tag",
                    ]}>
                    <Cell center area="wifi">
                        <WifiIcon fontSize="large"></WifiIcon>
                    </Cell>
                    <Cell center area="locate">
                        <NotListedLocationIcon fontSize="large"></NotListedLocationIcon>
                    </Cell>
                    <Cell center area="shutdown">
                        <PowerSettingsNewIcon fontSize="large"></PowerSettingsNewIcon>
                    </Cell>
                    <Cell center area="modeBtn">
                        <TimelapseMacroMode/>
                        <VideoMacroMode/>
                        <PhotoMacroMode/>
                    </Cell>
                    <Cell center area="shutter">
                        <CameraIcon fontSize="large"></CameraIcon>
                    </Cell>
                    <Cell center area="tag">
                        <BookmarkIcon fontSize="large"></BookmarkIcon>
                    </Cell>
                </Grid>

                <Controls></Controls>
            </div>
        );
    }
}

export default Content;
