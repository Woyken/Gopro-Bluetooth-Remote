import { useEffect, useState } from 'react';
import { apControlWiFiApOffCommand } from 'store/goproBluetoothServiceActions/commands/commands';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectIsConnectedAndInitialized } from 'store/selectors/bluetoothStateSelectors';
import { selectIsWifiApEnabled } from 'store/selectors/statusSelectors';

export const useToggleWiFiOffOnConnect = () => {
    const [isFirstRun, setIsFirstRun] = useState(false);
    const [shouldToggleWiFi, setShouldToggleWiFi] = useState(false);
    const isWifiApEnabled = useAppSelector(selectIsWifiApEnabled);
    const isInitialized = useAppSelector(selectIsConnectedAndInitialized);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Only after initialization we should send the command
        if (isInitialized) setIsFirstRun(true);

        setShouldToggleWiFi(localStorage.getItem('isTurnOffWiFiEnabled') === 'true');
    }, [isInitialized]);

    useEffect(() => {
        if (!isFirstRun) return;

        // On first run, if wifi is enabled, turn it off
        if (shouldToggleWiFi && isWifiApEnabled) dispatch(apControlWiFiApOffCommand());
        setIsFirstRun(false);
    }, [isFirstRun, shouldToggleWiFi, isWifiApEnabled, dispatch]);
};
