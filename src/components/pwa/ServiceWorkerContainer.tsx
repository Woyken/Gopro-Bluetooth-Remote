import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import { ReloadToastContent } from './ReloadToastContent';
import { ModuleVirtualPwaRegisterReact, useImportPwaRegisterModule } from './useImportPwaRegisterModule';

// It's unlikely that someone will use this app for long periods, but just in case, let's check for updates once in a while.
const updateCheckIntervalMS = 60 * 60 * 1000;

export const ServiceWorkerContainer: React.FC = () => {
    const pwaRegisterModule = useImportPwaRegisterModule();

    if (!pwaRegisterModule) return null;
    return <ServiceWorkerContainerSafe pwaRegisterModule={pwaRegisterModule} />;
};

interface IProps {
    pwaRegisterModule: ModuleVirtualPwaRegisterReact;
}

export const ServiceWorkerContainerSafe: React.FC<IProps> = ({ pwaRegisterModule }) => {
    const {
        offlineReady: [offlineReady],
        needRefresh: [needRefresh],
        updateServiceWorker,
    } = pwaRegisterModule.useRegisterSW({
        immediate: true,
        onRegistered(registration) {
            console.log('SW registered', registration);
            if (!registration) return;
            setInterval(() => {
                registration.update();
            }, updateCheckIntervalMS);
        },
        onRegisterError(error) {
            console.log('SW registration error', error);
        },
    });

    useEffect(() => {
        if (offlineReady) toast('App was installed and now will work offline');
    }, [offlineReady]);
    useEffect(() => {
        if (needRefresh) toast(<ReloadToastContent updateServiceWorker={updateServiceWorker} />, { autoClose: false });
    }, [needRefresh, updateServiceWorker]);

    return <div />;
};
