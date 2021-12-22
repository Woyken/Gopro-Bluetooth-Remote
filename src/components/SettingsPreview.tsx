import { useState } from 'react';
import { setSettingValueCommand } from 'store/goproBluetoothServiceActions/commands/settingsCommands';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCurrentModeSettings } from 'store/selectors/settingsSelectors';
import { makeStyles } from 'theme/makeStyles';

import { Container, Dialog, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent } from '@mui/material';

import CurrentModeSettingsPreview from './CurrentModeSettingsPreview';

const useStyles = makeStyles()({
    temp: {
        display: 'flex',
    },
});

const SettingsPreview: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const [previewElevation, setPreviewElevation] = useState(1);
    useStyles();
    return (
        <>
            <SettingsPreviewModal isOpen={isModalOpen} onClose={handleCloseModal} />
            <Container maxWidth="sm" sx={{ width: 'fit-content', marginBottom: '1rem' }}>
                <Paper
                    elevation={previewElevation}
                    onMouseOver={() => setPreviewElevation(3)}
                    onMouseOut={() => setPreviewElevation(1)}
                    onClick={handleOpenModal}
                    sx={{ minWidth: '40vw', minHeight: '2em' }}
                >
                    <CurrentModeSettingsPreview />
                </Paper>
            </Container>
        </>
    );
};

interface IPropss {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsPreviewModal: React.FC<IPropss> = (props) => {
    const { isOpen, onClose } = props;
    const currentModeSettings = useAppSelector(selectCurrentModeSettings);
    return (
        <>
            <Dialog open={isOpen} onClose={onClose}>
                <DialogTitle>Change current mode settings</DialogTitle>
                {currentModeSettings.map((setting) => (
                    <SingleSetting key={setting.settingId} setting={setting} />
                ))}
            </Dialog>
        </>
    );
};

export default SettingsPreview;

interface IProps {
    setting: ReturnType<typeof selectCurrentModeSettings>[0];
}

const SingleSetting: React.FC<IProps> = (props) => {
    const dispatch = useAppDispatch();
    const { setting } = props;
    const currentSettingValue = useAppSelector((state) => state.goproSettingsReducer.settings[setting.settingId]);

    const handleChange = (event: SelectChangeEvent) => {
        const selectedSettingValue = parseInt(event.target.value, 10);
        dispatch(setSettingValueCommand({ settingId: setting.settingId, valueId: selectedSettingValue }));
    };
    useStyles();

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
