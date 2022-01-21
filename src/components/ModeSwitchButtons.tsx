import { useAppSelector } from 'store/hooks';
import { selectUiModeGroups } from 'store/selectors/settingsMetadata/modesSelectors';

import ModeSwitcherGroupButton from './modeSwitchButtons/ModeSwitcherGroupButton';

const ModeSwitchButtons: React.FC = () => {
    const uiModeGroups = useAppSelector(selectUiModeGroups);

    return (
        <>
            {uiModeGroups.map((x) => (
                <>
                    <ModeSwitcherGroupButton groupId={x.group} availableModeIds={x.modes} />
                </>
            ))}
        </>
    );
};

export default ModeSwitchButtons;
