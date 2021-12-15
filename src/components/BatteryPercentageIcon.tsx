import Battery20Icon from '@mui/icons-material/Battery20';
import Battery50Icon from '@mui/icons-material/Battery50';
import Battery80Icon from '@mui/icons-material/Battery80';
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20';
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50';
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import { IconButton, Typography } from '@mui/material';

interface IProps {
    batteryPercentage: number;
    isCharging: boolean;
}

function getIconByLevelBar(batteryPercentage: number, isCharging: boolean): JSX.Element {
    // camera returned values defined in statusInternalBatteryLevel2
    if (batteryPercentage > 80) return isCharging ? <BatteryChargingFullIcon /> : <BatteryFullIcon />;
    if (batteryPercentage > 50) return isCharging ? <BatteryCharging80Icon /> : <Battery80Icon />;
    if (batteryPercentage > 20) return isCharging ? <BatteryCharging50Icon /> : <Battery50Icon />;
    return isCharging ? <BatteryCharging20Icon /> : <Battery20Icon />;
}

const BatteryPercentageIcon: React.FC<IProps> = (props) => {
    const { batteryPercentage, isCharging } = props;
    const icon = getIconByLevelBar(batteryPercentage, isCharging);

    return (
        <IconButton>
            <Typography variant="body1">{batteryPercentage}%</Typography>
            {icon}
        </IconButton>
    );
};

export default BatteryPercentageIcon;
