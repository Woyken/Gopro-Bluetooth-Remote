import { useReducer } from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';

const ToggleWifiOffOnConnect: React.FC = () => {
    const [isTurnOffWiFiEnabled, setIsTurnOffWiFiEnabled] = useReducer((_: boolean, cur: boolean) => {
        localStorage.setItem('isTurnOffWiFiEnabled', JSON.stringify(cur));
        return cur;
    }, localStorage.getItem('isTurnOffWiFiEnabled') === 'true');

    const handleChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setIsTurnOffWiFiEnabled(checked);
    };
    return (
        <>
            <FormControlLabel control={<Checkbox checked={isTurnOffWiFiEnabled} onChange={handleChange} />} label="Turn off WiFi hotspot on connect" />
        </>
    );
};

export default ToggleWifiOffOnConnect;
