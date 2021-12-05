interface BluetoothDeviceState {
    device?: BluetoothDevice;
    gattServer?: BluetoothRemoteGATTServer;
    characteristics?: {
        wifiApSsidCharacteristic: BluetoothRemoteGATTCharacteristic;
        wifiApPasswordCharacteristic: BluetoothRemoteGATTCharacteristic;
        wifiApPowerCharacteristic: BluetoothRemoteGATTCharacteristic;
        wifiApStateCharacteristic: BluetoothRemoteGATTCharacteristic;
        commandCharacteristic: BluetoothRemoteGATTCharacteristic;
        commandResponseCharacteristic: BluetoothRemoteGATTCharacteristic;
        settingsCharacteristic: BluetoothRemoteGATTCharacteristic;
        settingsResponseCharacteristic: BluetoothRemoteGATTCharacteristic;
        queryCharacteristic: BluetoothRemoteGATTCharacteristic;
        queryResponseCharacteristic: BluetoothRemoteGATTCharacteristic;
    };
}

export const bluetoothDeviceState: BluetoothDeviceState = {};
