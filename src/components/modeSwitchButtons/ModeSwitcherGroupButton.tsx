import SplitButton from 'components/SplitButton';
import { loadUiModeCommand } from 'store/goproBluetoothServiceActions/commands/commands';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectActiveUiModeByUiModeGroup, selectCurrentUiMode, selectUiModesNames, UiMode, UiModeGroup } from 'store/selectors/settingsMetadata/modesSelectors';

import UiModeIcon from './UiModeIcon';

interface IProps {
    groupId: UiModeGroup;
    availableModeIds: UiMode[];
}

const ModeSwitcherGroupButton: React.FC<IProps> = (props) => {
    const { groupId, availableModeIds } = props;
    const activeGroupModeId = useAppSelector((state) => selectActiveUiModeByUiModeGroup(state, groupId));
    const uiModesNames = useAppSelector((state) => selectUiModesNames(state, availableModeIds));
    const currentModeId = useAppSelector(selectCurrentUiMode);
    const isSelected = currentModeId === activeGroupModeId;
    const dispatch = useAppDispatch();
    const availableModes = uiModesNames.map((x) => ({
        icon: <UiModeIcon uiMode={x.uiMode} />,
        label: x.name, // TODO add translation
        onClick: () => dispatch(loadUiModeCommand(x.uiMode)),
        id: x.uiMode,
    }));
    return <SplitButton isGroupSelected={isSelected} primaryButtonId={activeGroupModeId} buttonChoices={availableModes} />;
};

export default ModeSwitcherGroupButton;
