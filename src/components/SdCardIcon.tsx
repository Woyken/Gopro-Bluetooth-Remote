import { SdCardStatus } from 'store/selectors/statusSelectors';

import SdStorageIcon from '@mui/icons-material/SdStorage';
import SimCardAlertIcon from '@mui/icons-material/SimCardAlert';
import { IconButton, Typography } from '@mui/material';

interface IProps {
    sdCardStatus: SdCardStatus;
    storageRemainingTimeText: string;
}

function getIconByStatus(sdCardStatus: SdCardStatus): JSX.Element {
    switch (sdCardStatus) {
        case SdCardStatus.Unknown:
        case SdCardStatus.SdCardFormatError:
            return <SimCardAlertIcon color="error" />;
        default:
            return <SdStorageIcon />;
    }
}

const SdCardIcon: React.FC<IProps> = (props) => {
    const { sdCardStatus, storageRemainingTimeText } = props;
    const icon = getIconByStatus(sdCardStatus);
    const isError = sdCardStatus === SdCardStatus.SdCardFormatError || sdCardStatus === SdCardStatus.Unknown;
    const text = sdCardStatus === SdCardStatus.SdCardFormatError ? 'Format Error' : storageRemainingTimeText;
    return (
        <IconButton color={isError ? 'error' : undefined}>
            {icon}
            <Typography variant="body1">{text}</Typography>
        </IconButton>
    );
};

export default SdCardIcon;
