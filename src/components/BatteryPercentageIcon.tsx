import Battery20Icon from '@mui/icons-material/Battery20';
import Battery60Icon from '@mui/icons-material/Battery60';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import { IconButton, Typography } from '@mui/material';

interface IProps {
    batteryPercentage: number;
    batteryLevelBars: number;
}

function getIconByLevelBar(levelBar: number): JSX.Element {
    // camera returned values defined in statusInternalBatteryLevel2
    switch (levelBar) {
        case 0:
            return <BatteryAlertIcon />;
        case 1:
            return <Battery20Icon />;
        case 2:
            return <Battery60Icon />;
        case 3:
            return <BatteryFullIcon />;
        default:
            return <BatteryAlertIcon />;
    }
}

const BatteryPercentageIcon: React.FC<IProps> = (props) => {
    const { batteryPercentage, batteryLevelBars } = props;
    const icon = getIconByLevelBar(batteryLevelBars);

    return (
        <IconButton>
            <Typography variant="body1">{batteryPercentage}%</Typography>
            {icon}
        </IconButton>
    );
};

export default BatteryPercentageIcon;
