import { useEffect, useState } from 'react';

export function usePwaInstallPrompt() {
    const [prompt, setState] = useState<BeforeInstallPromptEvent>();
    const shouldShowPrompt = !!prompt;
    const [isInstalled, setIsInstalled] = useState(false);
    const [userAccepted, setUserAccepted] = useState(false);
    const [userDismissed, setUserDismissed] = useState(false);

    const promptToInstall = () => {
        if (prompt) {
            setUserAccepted(false);
            setUserDismissed(false);
            return prompt.prompt().then(({ outcome }) => {
                setUserAccepted(outcome === 'accepted');
                setUserDismissed(outcome === 'dismissed');
            });
        }
        return Promise.reject(new Error('Tried installing before browser sent "beforeinstallprompt" event'));
    };

    useEffect(() => {
        const ready = (e: BeforeInstallPromptEvent) => {
            // e.preventDefault();
            setState(e);
        };

        window.addEventListener('beforeinstallprompt', ready);

        return () => {
            window.removeEventListener('beforeinstallprompt', ready);
        };
    }, []);

    useEffect(() => {
        const onInstall = () => {
            setIsInstalled(true);
        };

        window.addEventListener('appinstalled', onInstall);

        return () => {
            window.removeEventListener('appinstalled', onInstall);
        };
    }, []);

    return [shouldShowPrompt, userAccepted, userDismissed, isInstalled, promptToInstall] as const;
}
