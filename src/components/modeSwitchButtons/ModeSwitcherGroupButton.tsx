import SplitButton from 'components/SplitButton';
import { useTranslation } from 'react-i18next';
import { setUiModeCommand } from 'store/goproBluetoothServiceActions/commands/commands';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectActiveUiModeByUiModeGroup, selectCurrentUiMode, selectUiModesNames, UiMode, UiModeGroup } from 'store/selectors/settingsMetadata/modesSelectors';

import UiModeIcon from './UiModeIcon';

interface IProps {
    groupId: UiModeGroup;
    availableModeIds: UiMode[];
}

function useModesNamesWithTranslations(modesNames: ReturnType<typeof selectUiModesNames>) {
    const { t, i18n } = useTranslation();
    return modesNames.map((modeName) => {
        const path = `modes.${modeName.uiMode}` as const;
        return {
            ...modeName,
            name: i18n.exists(path) ? t(path) : modeName.name,
        };
    });
}

const ModeSwitcherGroupButton: React.FC<IProps> = (props) => {
    const { groupId, availableModeIds } = props;
    const activeGroupModeId = useAppSelector((state) => selectActiveUiModeByUiModeGroup(state, groupId));
    const uiModesNames = useAppSelector((state) => selectUiModesNames(state, availableModeIds));
    const modeNames = useModesNamesWithTranslations(uiModesNames);
    const currentModeId = useAppSelector(selectCurrentUiMode);
    const isSelected = currentModeId === activeGroupModeId;
    const dispatch = useAppDispatch();
    const availableModes = modeNames.map((x) => ({
        icon: <UiModeIcon uiMode={x.uiMode} />,
        label: x.name,
        onClick: () => dispatch(setUiModeCommand(x.uiMode)),
        id: x.uiMode,
    }));
    return <SplitButton isGroupSelected={isSelected} primaryButtonId={activeGroupModeId} buttonChoices={availableModes} />;
};

export default ModeSwitcherGroupButton;
