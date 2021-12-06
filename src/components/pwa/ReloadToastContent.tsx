import { makeStyles } from 'theme/makeStyles';

import { Box, Button, Typography } from '@mui/material';

const useStyles = makeStyles()({
    flexContent: {
        display: 'flex',
        flexDirection: 'row',
    },
});

interface IProps {
    updateServiceWorker: (force: boolean) => void;
}

export const ReloadToastContent: React.FC<IProps> = (props) => {
    const { classes } = useStyles();
    const handleReloadButton = () => {
        props.updateServiceWorker(true);
    };
    return (
        <Box className={classes.flexContent}>
            <Typography variant="body1">App was updated, reload to see the changes</Typography>
            <Button style={{ display: 'inline' }} onClick={handleReloadButton}>
                Reload
            </Button>
        </Box>
    );
};
