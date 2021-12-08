/* eslint-disable no-bitwise */
import { toast } from 'react-toastify';
import { bluetoothDeviceState } from 'store/goproBleServiceState';
import { goproBluetoothSlice } from 'store/goproBluetoothSlice';
import { commandResponseReceiverProvider } from 'store/packetParsing/goproPacketReaderCommand';
import { queryResponseReceiverProvider } from 'store/packetParsing/goproPacketReaderQuery';
import { settingsResponseReceiverProvider } from 'store/packetParsing/goproPacketReaderSetting';
import { RootState } from 'store/store';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { goproBlePacketDataReaderProvider } from '../packetParsing/goproPacketReader';

import { getHardwareInfoCommand, openGoProGetVersionCommand } from './commands/commands';
import { subscribeToSettingsChangesCommand, subscribeToStatusChangesCommand } from './commands/queryCommands';
import { statusEncodingActive10, statusSystemBusy8, statusSystemReady82 } from './goproStatusMetadata';

interface SelectDeviceResult {
    deviceName: string;
}

export const requestDevice = createAsyncThunk<SelectDeviceResult, void, { state: RootState }>('bluetoothDevice/requestDevice', async (_, { dispatch }) => {
    const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['0000fea6-0000-1000-8000-00805f9b34fb'] }],
        optionalServices: ['0000fea6-0000-1000-8000-00805f9b34fb', 'b5f90001-aa8d-11e3-9046-0002a5d5c51b'],
    });
    device.ongattserverdisconnected = () => {
        // On disconnect, invalidate all GATT services and characteristics https://web.dev/bluetooth/#disconnect
        bluetoothDeviceState.characteristics = undefined;
        bluetoothDeviceState.gattServer = undefined;

        dispatch(goproBluetoothSlice.actions.gattDisconnected('Connection lost'));
        toast.error('Gopro disconnected, connection lost');
    };
    bluetoothDeviceState.device = device;
    dispatch(gattConnect());
    return {
        deviceName: device.name ?? device.id,
    };
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GattConnectResult {}

export const gattConnect = createAsyncThunk<GattConnectResult, void, { state: RootState }>('bluetoothDevice/gattConnect', async (_, { dispatch }) => {
    const { device } = bluetoothDeviceState;
    if (!device) throw new Error('device not found to connect to');
    if (!device?.gatt) throw new Error(`gatt missing for this device ${device.name ?? device.id}`);
    const gattServer = await device.gatt.connect();

    const wifiApServicePromise = gattServer.getPrimaryService('b5f90001-aa8d-11e3-9046-0002a5d5c51b');
    const wifiApSsidCharacteristicPromise = wifiApServicePromise.then((x) => x.getCharacteristic('b5f90002-aa8d-11e3-9046-0002a5d5c51b'));
    const wifiApPasswordCharacteristicPromise = wifiApServicePromise.then((x) => x.getCharacteristic('b5f90003-aa8d-11e3-9046-0002a5d5c51b'));
    const wifiApPowerCharacteristicPromise = wifiApServicePromise.then((x) => x.getCharacteristic('b5f90004-aa8d-11e3-9046-0002a5d5c51b'));
    const wifiApStateCharacteristicPromise = wifiApServicePromise.then((x) => x.getCharacteristic('b5f90005-aa8d-11e3-9046-0002a5d5c51b'));

    const cqServicePromise = gattServer.getPrimaryService('0000fea6-0000-1000-8000-00805f9b34fb');
    const commandCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic('b5f90072-aa8d-11e3-9046-0002a5d5c51b'));
    const commandResponseCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic('b5f90073-aa8d-11e3-9046-0002a5d5c51b'));
    const settingsCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic('b5f90074-aa8d-11e3-9046-0002a5d5c51b'));
    const settingsResponseCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic('b5f90075-aa8d-11e3-9046-0002a5d5c51b'));
    const queryCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic('b5f90076-aa8d-11e3-9046-0002a5d5c51b'));
    const queryResponseCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic('b5f90077-aa8d-11e3-9046-0002a5d5c51b'));

    bluetoothDeviceState.gattServer = gattServer;
    bluetoothDeviceState.characteristics = {
        wifiApSsidCharacteristic: await wifiApSsidCharacteristicPromise,
        wifiApPasswordCharacteristic: await wifiApPasswordCharacteristicPromise,
        wifiApPowerCharacteristic: await wifiApPowerCharacteristicPromise,
        wifiApStateCharacteristic: await wifiApStateCharacteristicPromise,
        commandCharacteristic: await commandCharacteristicPromise,
        commandResponseCharacteristic: await commandResponseCharacteristicPromise,
        settingsCharacteristic: await settingsCharacteristicPromise,
        settingsResponseCharacteristic: await settingsResponseCharacteristicPromise,
        queryCharacteristic: await queryCharacteristicPromise,
        queryResponseCharacteristic: await queryResponseCharacteristicPromise,
    };
    bluetoothDeviceState.characteristics.commandResponseCharacteristic.oncharacteristicvaluechanged = goproBlePacketDataReaderProvider(commandResponseReceiverProvider(dispatch));
    await bluetoothDeviceState.characteristics.commandResponseCharacteristic.startNotifications();
    bluetoothDeviceState.characteristics.queryResponseCharacteristic.oncharacteristicvaluechanged = goproBlePacketDataReaderProvider(queryResponseReceiverProvider(dispatch));
    await bluetoothDeviceState.characteristics.queryResponseCharacteristic.startNotifications();
    bluetoothDeviceState.characteristics.settingsResponseCharacteristic.oncharacteristicvaluechanged = goproBlePacketDataReaderProvider(settingsResponseReceiverProvider(dispatch));
    await bluetoothDeviceState.characteristics.settingsResponseCharacteristic.startNotifications();

    // Explicitly first subscribe to ones needed to know of we can send commands
    await dispatch(subscribeToStatusChangesCommand([statusSystemReady82.id, statusEncodingActive10.id, statusSystemBusy8.id]));

    // Subscribe to status and setting changes, will be useful to know when the device is ready to receive commands
    // TODO Reconsider this subscribing logic
    await dispatch(subscribeToStatusChangesCommand([...new Array(88).keys()]));
    await dispatch(subscribeToSettingsChangesCommand([...new Array(112).keys()]));

    await dispatch(openGoProGetVersionCommand());
    await dispatch(getHardwareInfoCommand());
    // TODO maybe subscribe only when UI requires it? With current interface we literally always need it...
    // For now subscribe to all known settings, last setting ID is 112, last status id is 88
});

async function writeGoProPacketDataRaw(characteristic: BluetoothRemoteGATTCharacteristic, data: number[]) {
    // console.log('writing raw data', data);
    return characteristic.writeValue(new Uint8Array(data));
}

function getPacketHeaderForData(dataLength: number, chunkIndex: number) {
    if (chunkIndex > 0) return [0b10000000 + (chunkIndex & 0b00111111)];
    if (dataLength <= 0x1f) return [dataLength & 0b00011111];
    if (dataLength <= 0x1fff) return [0b00100000 + ((dataLength >> 8) & 0b00011111), dataLength & 0b11111111];
    if (dataLength <= 0xffff) return [0b01000000, (dataLength >> 8) & 0b11111111, dataLength & 0b11111111];

    toast.error('packet too large');
    throw new Error('data length too large');
}

export async function writeGoProPacketData(characteristic: BluetoothRemoteGATTCharacteristic, data: number[]) {
    console.log('writing data, before appending headers', data);
    const dataCopy = [...data];
    let chunkIndex = 0;
    while (dataCopy.length > 0) {
        dataCopy.unshift(...getPacketHeaderForData(data.length, chunkIndex));
        const chunk = dataCopy.splice(0, 20);
        // Intentional await inside loop, this can only be done synchronously
        // eslint-disable-next-line no-await-in-loop
        await writeGoProPacketDataRaw(characteristic, chunk);
        chunkIndex++;
    }
    return undefined;
}
