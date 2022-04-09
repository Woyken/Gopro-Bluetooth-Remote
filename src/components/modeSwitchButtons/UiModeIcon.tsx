import { UiMode } from 'store/selectors/settingsMetadata/modesSelectors';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import TimelapseVideoIcon from '@mui/icons-material/SwitchVideo';
import VideocamIcon from '@mui/icons-material/Videocam';

interface IProps {
    uiMode: UiMode;
}

const UiModeIcon: React.FC<IProps> = (props) => {
    const { uiMode } = props;
    switch (uiMode) {
        case UiMode.video:
            return (
                <>
                    <VideocamIcon />
                </>
            );
        case UiMode.looping:
            return (
                <>
                    <VideocamIcon />2
                </>
            );
        case UiMode.singlePhoto:
            return (
                <>
                    <PhotoCameraIcon />0
                </>
            );
        case UiMode.photo:
            return (
                <>
                    <PhotoCameraIcon />
                </>
            );
        case UiMode.burstPhoto:
            return (
                <>
                    <PhotoCameraIcon />2
                </>
            );
        case UiMode.nightPhoto:
            return (
                <>
                    <PhotoCameraIcon />3
                </>
            );
        case UiMode.timeWarpVideo:
            return (
                <>
                    <TimelapseVideoIcon />
                </>
            );
        case UiMode.timeLapseVideo:
            return (
                <>
                    <TimelapseVideoIcon />2
                </>
            );
        case UiMode.timeLapsePhoto:
            return (
                <>
                    <TimelapseVideoIcon />3
                </>
            );
        case UiMode.nightLapsePhoto:
            return (
                <>
                    <TimelapseVideoIcon />4
                </>
            );
        default:
            return <>*</>;
    }
};

export default UiModeIcon;
