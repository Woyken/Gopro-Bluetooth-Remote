import { useCallback, useState } from 'react';

function useGoproBluetooth() {
    const [cameraDevice, setCameraDevice] = useState<BluetoothDevice | undefined>(undefined);

    const selectCamera = useCallback(async () => {
        try {
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['0000fea6-0000-1000-8000-00805f9b34fb'] }],
                // acceptAllDevices: true,
                optionalServices: ['0000fea6-0000-1000-8000-00805f9b34fb', 'b5f90001-aa8d-11e3-9046-0002a5d5c51b'],
            });
            setCameraDevice(device);
        } catch (error) {
            setCameraDevice(undefined);
        }
    }, []);
    return { cameraDevice, selectCamera };
}

export default useGoproBluetooth;
