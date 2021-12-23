import SplitButton from 'components/SplitButton';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCurrentModeGroup } from 'store/selectors/settingsSelectors';
import { selectLastVideoMode } from 'store/selectors/statusSelectors';
import { getCommandToChangeMode, getModelLabel, getModesByGroup, SettingsModes, SettingsModesGroups } from 'utilities/modes/modeTypes';

import VideocamIcon from '@mui/icons-material/Videocam';

function getModeIcon(mode: SettingsModes) {
    switch (mode) {
        case SettingsModes.video:
            return <VideocamIcon />;
        case SettingsModes.videoLooping:
            return (
                <>
                    <VideocamIcon />2
                </>
            );
        default:
            return <>*</>;
    }
}

const VideoModeSwitcherButton: React.FC = () => {
    const currentModeGroup = useAppSelector(selectCurrentModeGroup);
    const lastVideoMode = useAppSelector(selectLastVideoMode);
    const dispatch = useAppDispatch();
    const isSelected = currentModeGroup === SettingsModesGroups.video;
    const availableModesIds = getModesByGroup(SettingsModesGroups.video);
    const availableModes = availableModesIds.map((x) => ({ icon: getModeIcon(x), label: getModelLabel(x), onClick: () => dispatch(getCommandToChangeMode(x)()), id: x }));
    return <SplitButton isGroupSelected={isSelected} primaryButtonId={lastVideoMode} buttonChoices={availableModes} />;
};

export default VideoModeSwitcherButton;
