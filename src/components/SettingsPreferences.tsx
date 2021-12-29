import { useState } from 'react';
import { setSettingValueCommand } from 'store/goproBluetoothServiceActions/commands/settingsCommands';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectGeneralSettings } from 'store/selectors/settingsSelectors';

import SettingsIcon from '@mui/icons-material/Settings';
import { Dialog, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import ToggleWifiOffOnConnect from './preferences/ToggleWiFiOffOnConnect';

export const SettingsPreferencesButton: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleOpenModal = () => setIsModalOpen(true);

    return (
        <>
            <SettingsPreferencesDialog isOpen={isModalOpen} onClose={handleCloseModal} />
            <IconButton onClick={handleOpenModal}>
                <SettingsIcon />
            </IconButton>
        </>
    );
};

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

// TODO redo these settings, some settings need sliders, some would work better with checkboxes
export const SettingsPreferencesDialog: React.FC<IProps> = (props) => {
    const { isOpen, onClose } = props;
    const generalSettings = useAppSelector(selectGeneralSettings);
    return (
        <>
            <Dialog open={isOpen} onClose={onClose}>
                <DialogTitle>Preferences</DialogTitle>
                <DialogContent>
                    <ToggleWifiOffOnConnect />
                    {generalSettings.map((setting) => (
                        <SingleSetting key={setting.settingId} setting={setting} />
                    ))}
                </DialogContent>
            </Dialog>
        </>
    );
};

interface ISingleSettingProps {
    setting: ReturnType<typeof selectGeneralSettings>[0];
}

const SingleSetting: React.FC<ISingleSettingProps> = (props) => {
    const dispatch = useAppDispatch();
    const { setting } = props;
    const currentSettingValue = useAppSelector((state) => state.goproSettingsReducer.settings[setting.settingId]);

    const handleChange = (event: SelectChangeEvent) => {
        const selectedSettingValue = parseInt(event.target.value, 10);
        dispatch(setSettingValueCommand({ settingId: setting.settingId, valueId: selectedSettingValue }));
    };

    if (!currentSettingValue) return <div>something went wrong... known setting missing</div>;
    return (
        <>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">{setting.settingLabel}</InputLabel>
                <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={currentSettingValue.value.toString()} onChange={handleChange} label={setting.settingLabel}>
                    {setting.possibleValues.map((possibleValue) => (
                        <MenuItem key={possibleValue.id} value={possibleValue.id}>
                            {possibleValue.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};
