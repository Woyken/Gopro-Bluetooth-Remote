import { usePwaInstallPrompt } from 'hooks/pwaInstallPrompt';
import { useEffect, useState } from 'react';

import { Button } from '@mui/material';

const InstallPwaButton: React.FC = () => {
    const [shouldShowPrompt, _userAccepted, userDismissed, _isInstalled, promptToInstall] = usePwaInstallPrompt();
    const [showSad, setShowSad] = useState(false);
    const [dismissedInstall, setDismissedInstall] = useState(false);

    useEffect(() => {
        let timeoutHandle: number | undefined;
        if (userDismissed) {
            setShowSad(true);
            timeoutHandle = window.setTimeout(() => {
                // Let's dismiss it after couple of seconds, user has rejected install, just remove the button for now
                setDismissedInstall(true);
            }, 3000);
        }
        return () => {
            window.clearTimeout(timeoutHandle);
        };
    }, [userDismissed]);

    const handleInstallClick = () => {
        promptToInstall();
    };
    if (!shouldShowPrompt || dismissedInstall) {
        return null;
    }
    return (
        <Button color="inherit" onClick={handleInstallClick}>
            Install{showSad ? ' 💔' : ''}
        </Button>
    );
};

export default InstallPwaButton;
