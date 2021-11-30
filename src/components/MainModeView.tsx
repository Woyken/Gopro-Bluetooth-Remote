import { makeStyles } from 'theme/makeStyles';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import RecordInactiveIcon from '@mui/icons-material/RadioButtonChecked';
import TimelapseVideoIcon from '@mui/icons-material/SwitchVideo';
import VideocamIcon from '@mui/icons-material/Videocam';
import { IconButton, Typography } from '@mui/material';

const useStyles = makeStyles()({
    pageWrapper: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topControls: {
        width: '100%',
    },
    bottomControls: {
        width: '100%',
    },
    bottomCenteredButtons: {
        width: '100%',
        alignSelf: 'flex-end',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    alignLeftToRight: {
        display: 'flex',
    },
    button: {
        margin: '0.5rem',
    },
    recordButton: {
        margin: '0.5rem',
        '& svg': {
            fontSize: '5rem',
        },
    },
    floatLeft: {
        flex: 1,
    },
    floatRight: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
    },
});

// Material ui button with camera icon in it
const MainModeView: React.FC = () => {
    const { classes } = useStyles();
    return (
        <>
            <div className={classes.pageWrapper}>
                <div className={classes.topControls}>
                    <p>Current mode: Video</p>
                    <p>Storage left: 07:23</p>
                    <p>Battery: 79%</p>
                </div>
                <div className={classes.bottomControls}>
                    <div className={classes.bottomCenteredButtons}>
                        <IconButton className={classes.button} aria-label="Photo mode" color="primary">
                            <PhotoCameraIcon />
                        </IconButton>
                        <IconButton className={classes.button} aria-label="Video mode" color="primary">
                            <VideocamIcon />
                        </IconButton>
                        <IconButton className={classes.button} aria-label="Timelapse mode" color="primary">
                            <TimelapseVideoIcon />
                        </IconButton>
                    </div>
                    <div className={classes.alignLeftToRight}>
                        <div className={classes.floatLeft} />
                        <div className={classes.recordButton}>
                            <IconButton aria-label="Record button" color="error">
                                <RecordInactiveIcon />
                            </IconButton>
                        </div>
                        <div className={classes.floatRight}>
                            <Typography variant="h6">01:14</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainModeView;
