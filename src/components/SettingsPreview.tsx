import { useState } from 'react';
import { setSettingValueCommand } from 'store/goproBluetoothServiceActions/commands/settingsCommands';
import { SettingMetadata, videoModeKnownSettings } from 'store/goproBluetoothServiceActions/goproSettingsMetadata';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { makeStyles } from 'theme/makeStyles';

import { Container, Dialog, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent } from '@mui/material';

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
            <SettingsPreviewModal isOpen={isModalOpen} onClose={handleCloseModal} settings={videoModeKnownSettings} />
            <Container maxWidth="sm" sx={{ width: 'fit-content', minWidth: '40vw' }}>
                <Paper elevation={previewElevation} onMouseOver={() => setPreviewElevation(3)} onMouseOut={() => setPreviewElevation(1)} onClick={handleOpenModal}>
                    <p style={{ textAlign: 'center' }}>
                        2.7K|60|W
                        <br />
                        PT, ICON, ICON
                    </p>
                </Paper>
            </Container>
        </>
    );
};

interface IPropss {
    isOpen: boolean;
    onClose: () => void;
    settings: SettingMetadata[];
}

const SettingsPreviewModal: React.FC<IPropss> = (props) => {
    const { isOpen, onClose, settings } = props;
    return (
        <>
            <Dialog open={isOpen} onClose={onClose}>
                <DialogTitle>Change current mode settings</DialogTitle>
                {settings.map((setting) => (
                    <SingleSetting key={setting.id} setting={setting} />
                ))}
                <div>actual view todo</div>
            </Dialog>
        </>
    );
};

export default SettingsPreview;

interface IProps {
    setting: SettingMetadata;
}

const SingleSetting: React.FC<IProps> = (props) => {
    const dispatch = useAppDispatch();
    const { settings } = useAppSelector((state) => state.goproSettingsReducer);
    const { setting } = props;
    const currentSettingValue = settings[setting.id];

    const handleChange = (event: SelectChangeEvent) => {
        const selectedSettingValue = parseInt(event.target.value, 10);
        dispatch(setSettingValueCommand({ setting, valueId: selectedSettingValue }));
    };
    useStyles();

    if (!currentSettingValue) return <div>something went wrong... known setting missing</div>;
    return (
        <>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">{setting.label}</InputLabel>
                <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={currentSettingValue.value.toString()} onChange={handleChange} label={setting.label}>
                    {setting.values.map((value) => (
                        <MenuItem key={value.id} value={value.id}>
                            {value.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};
