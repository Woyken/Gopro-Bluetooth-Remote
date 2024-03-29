/* eslint-disable no-bitwise */
import { toast } from 'react-toastify';
import { bluetoothDeviceState } from 'store/goproBleServiceState';
import { queryResponseReceiverProvider } from 'store/packetParsing/goproPacketReaderQuery';
import { settingsResponseReceiverProvider } from 'store/packetParsing/goproPacketReaderSetting';
import { selectSettingsMetadataAllSettingsIdsList, selectSettingsMetadataAllStatusesIdsList } from 'store/selectors/settingsMetadataSelectors';
import { goproBluetoothSlice } from 'store/slices/goproBluetoothSlice';
import { goproSettingsMetadataSlice } from 'store/slices/goproSettingsMetadataSlice';
import { goproSettingsSlice } from 'store/slices/goproSettingsSlice';
import { RootState } from 'store/store';
import { SettingsJson } from 'utilities/definitions/goproTypes/settingsJson';
import { delay } from 'utilities/promiseUtilities';

import { Action, createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';

import { packetReaderProvider } from '../packetParsing/goproPacketReader';

import { fetchSettingsJson, getHardwareInfoCommand, getSettingsJsonCommand, openGoProGetVersionCommand } from './commands/commands';
import { subscribeToSettingsChangesCommand, subscribeToStatusChangesCommand } from './commands/queryCommands';
import { statusEncodingActive10, statusSystemBusy8, statusSystemReady82 } from './goproStatusMetadata';

interface SelectDeviceResult {
    deviceName: string;
}

function registerForGattDisconnectEvent(device: BluetoothDevice, dispatch: ThunkDispatch<RootState, void, Action>) {
    device.ongattserverdisconnected = () => {
        // On disconnect, invalidate all GATT services and characteristics https://web.dev/bluetooth/#disconnect
        bluetoothDeviceState.characteristics = undefined;
        bluetoothDeviceState.gattServer = undefined;

        dispatch(goproBluetoothSlice.actions.gattDisconnected('Connection lost'));
        toast.error('Gopro disconnected, connection lost');
    };
}

export const getKnownDevice = createAsyncThunk<SelectDeviceResult, void, { state: RootState }>('bluetoothDevice/getKnownDevice', async (_, { dispatch }) => {
    if (!('bluetooth' in navigator) || !('getDevices' in navigator.bluetooth)) throw new Error('Browser does not support getDevices');
    const knownDevices = await navigator.bluetooth.getDevices();
    // Should probably eventually support multiple devices...
    const knownDevice = knownDevices[0];
    if (!knownDevice) throw new Error("Couldn't find any known devices");
    const onAdvertisementEvRecevied = (e: Event) => {
        const bluetoothEvent = e as BluetoothAdvertisingEvent;
        dispatch(goproBluetoothSlice.actions.savedDeviceAvailable(knownDevice.name ?? knownDevice.id));
        registerForGattDisconnectEvent(bluetoothEvent.device, dispatch);
        bluetoothDeviceState.device = bluetoothEvent.device;
        knownDevice.removeEventListener('advertisementreceived', onAdvertisementEvRecevied);
    };
    knownDevice.addEventListener('advertisementreceived', onAdvertisementEvRecevied);
    knownDevice.watchAdvertisements();
    return {
        deviceName: knownDevice.name ?? knownDevice.id,
    };
});

export const requestDevice = createAsyncThunk<SelectDeviceResult, void, { state: RootState }>('bluetoothDevice/requestDevice', async (_, { dispatch }) => {
    const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['0000fea6-0000-1000-8000-00805f9b34fb'] }],
        optionalServices: ['0000fea6-0000-1000-8000-00805f9b34fb', 'b5f90001-aa8d-11e3-9046-0002a5d5c51b'],
    });

    registerForGattDisconnectEvent(device, dispatch);

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
    await bluetoothDeviceState.characteristics.commandResponseCharacteristic.startNotifications();
    bluetoothDeviceState.characteristics.queryResponseCharacteristic.oncharacteristicvaluechanged = packetReaderProvider(queryResponseReceiverProvider(dispatch));
    await bluetoothDeviceState.characteristics.queryResponseCharacteristic.startNotifications();
    bluetoothDeviceState.characteristics.settingsResponseCharacteristic.oncharacteristicvaluechanged = packetReaderProvider(settingsResponseReceiverProvider(dispatch));
    await bluetoothDeviceState.characteristics.settingsResponseCharacteristic.startNotifications();

    dispatch(goproSettingsSlice.actions.settingsRequested());
    // Fetch settings first, so we know what commands and settings camera supports
    await dispatch(getSettingsJsonCachedCommand());
    await dispatch(subscribeToAllStatusesChangesCommand());
    await dispatch(subscribeToAllSettingsChangesCommand());

    await dispatch(openGoProGetVersionCommand());
    await dispatch(getHardwareInfoCommand());
});

const subscribeToAllSettingsChangesCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/subscribeToSettingsChangesCommand', async (_, { dispatch, getState }) => {
    const allSettingsIds = selectSettingsMetadataAllSettingsIdsList(getState());
    if (allSettingsIds.length === 0) return;
    await dispatch(subscribeToSettingsChangesCommand(allSettingsIds));
});

const subscribeToAllStatusesChangesCommand = createAsyncThunk<void, void, { state: RootState }>('bluetoothDevice/subscribeToStatusesChangesCommand', async (_, { dispatch, getState }) => {
    const allStatusIds = selectSettingsMetadataAllStatusesIdsList(getState());
    if (allStatusIds.length === 0) return;
    await dispatch(subscribeToStatusChangesCommand(allStatusIds));
});

function getSettingsJsonCached() {
    // TODO cache should be per device
    const settingsJsonString = window.localStorage.getItem('settingsJson');
    if (!settingsJsonString) return undefined;
    const settingsJson = JSON.parse(settingsJsonString) as SettingsJson;
    return settingsJson;
}

async function fetchSettingsJsonBle() {
    const settingsJson = await fetchSettingsJson();
    window.localStorage.setItem('settingsJson', JSON.stringify(settingsJson));
    return settingsJson;
}

export const fetchSettingsJsonBleCommand = createAsyncThunk<SettingsJson, void, { state: RootState }>('bluetoothDevice/fetchSettingsJsonBleCommand', async () => {
    const settingsJson = await fetchSettingsJsonBle();
    return settingsJson;
});

export const getSettingsJsonCachedCommand = createAsyncThunk<SettingsJson | undefined, void, { state: RootState }>('bluetoothDevice/getSettingsJsonCachedCommand', async (_, { dispatch }) => {
    const settingsJson = getSettingsJsonCached();
    if (!settingsJson) await dispatch(fetchSettingsJsonBleCommand());
    // TODO if we asynchronously start fetching settingsJson
    // Actions like subscribe to settings and statuses will not respond at all
    // Consider adding semaphore like thing to limit all bluetooth actions to one at a time
    // else dispatch(fetchSettingsJsonBleCommand());
    return settingsJson;
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
