import SplitButton from 'components/SplitButton';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCurrentModeGroup } from 'store/selectors/settingsSelectors';
import { selectLastTimelapseMode } from 'store/selectors/statusSelectors';
import { getCommandToChangeMode, getModelLabel, getModesByGroup, SettingsModes, SettingsModesGroups, SettingsModesTimelapse } from 'utilities/modes/modeTypes';

import TimelapseVideoIcon from '@mui/icons-material/SwitchVideo';

function getModeIcon(mode: SettingsModes) {
    switch (mode) {
        case SettingsModesTimelapse.timelapseTimewarp:
            return <TimelapseVideoIcon />;
        case SettingsModesTimelapse.timelapseVideo:
            return (
                <>
                    <TimelapseVideoIcon />2
                </>
            );
        case SettingsModesTimelapse.timelapsePhoto:
            return (
                <>
                    <TimelapseVideoIcon />3
                </>
            );
        case SettingsModesTimelapse.nightlapse:
            return (
                <>
                    <TimelapseVideoIcon />4
                </>
            );
        default:
            return <>*</>;
    }
}

const TimelapseModeSwitcherButton: React.FC = () => {
    const currentModeGroup = useAppSelector(selectCurrentModeGroup);
    const lastTimelapseMode = useAppSelector(selectLastTimelapseMode);
    const dispatch = useAppDispatch();
    const isSelected = currentModeGroup === SettingsModesGroups.timelapse;
    const availableModesIds = getModesByGroup(SettingsModesGroups.timelapse);
    const availableModes = availableModesIds.map((x) => ({ icon: getModeIcon(x), label: getModelLabel(x), onClick: () => dispatch(getCommandToChangeMode(x)()), id: x }));
    return <SplitButton isGroupSelected={isSelected} primaryButtonId={lastTimelapseMode} buttonChoices={availableModes} />;
};

export default TimelapseModeSwitcherButton;
