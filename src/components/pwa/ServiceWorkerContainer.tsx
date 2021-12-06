import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
// eslint-disable-next-line import/no-unresolved
import { useRegisterSW } from 'virtual:pwa-register/react';

import { ReloadToastContent } from './ReloadToastContent';

// It's unlikely that someone will use this app for long periods, but just in case, let's check for updates once in a while.
const updateCheckIntervalMS = 60 * 60 * 1000;

export const ServiceWorkerContainer: React.FC = () => {
    const {
        offlineReady: [offlineReady],
        needRefresh: [needRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        immediate: true,
        onRegistered(r) {
            console.log('SW registered', r);
            if (!r) return;
            setInterval(() => {
                r.update();
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
