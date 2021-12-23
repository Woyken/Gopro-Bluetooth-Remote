import SplitButton from 'components/SplitButton';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCurrentModeGroup } from 'store/selectors/settingsSelectors';
import { selectLastPhotoMode } from 'store/selectors/statusSelectors';
import { getCommandToChangeMode, getModelLabel, getModesByGroup, SettingsModes, SettingsModesGroups, SettingsModesPhoto } from 'utilities/modes/modeTypes';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

function getModeIcon(mode: SettingsModes) {
    switch (mode) {
        case SettingsModesPhoto.photoSingle:
            return <PhotoCameraIcon />;
        case SettingsModesPhoto.photoBurst:
            return (
                <>
                    <PhotoCameraIcon />2
                </>
            );
        case SettingsModesPhoto.photoNight:
            return (
                <>
                    <PhotoCameraIcon />3
                </>
            );
        default:
            return <>*</>;
    }
}

const PhotoModeSwitcherButton: React.FC = () => {
    const currentModeGroup = useAppSelector(selectCurrentModeGroup);
    const lastPhotoMode = useAppSelector(selectLastPhotoMode);
    const dispatch = useAppDispatch();
    const isSelected = currentModeGroup === SettingsModesGroups.photo;
    const availableModesIds = getModesByGroup(SettingsModesGroups.photo);
    const availableModes = availableModesIds.map((x) => ({ icon: getModeIcon(x), label: getModelLabel(x), onClick: () => dispatch(getCommandToChangeMode(x)()), id: x }));
    return <SplitButton isGroupSelected={isSelected} primaryButtonId={lastPhotoMode} buttonChoices={availableModes} />;
};

export default PhotoModeSwitcherButton;
