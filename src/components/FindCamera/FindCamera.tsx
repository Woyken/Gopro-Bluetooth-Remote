import React, { Component } from 'react';

import { Button } from '@mui/material';

function bin2String(array: Uint8Array) {
    let result = '';
    for (let i = 0; i < array.length; i++) {
        result += String.fromCharCode(array[i]);
    }
    return result;
}
class FindCamera extends Component<unknown, unknown> {
    constructor(props: unknown) {
        super(props);
        this.state = {};
        this.handleFindCamera = this.handleFindCamera.bind(this);
    }

    // eslint-disable-next-line class-methods-use-this
    async handleFindCamera(): Promise<void> {
        try {
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['0000fea6-0000-1000-8000-00805f9b34fb'] }],
                // acceptAllDevices: true,
                optionalServices: ['0000fea6-0000-1000-8000-00805f9b34fb', 'b5f90001-aa8d-11e3-9046-0002a5d5c51b'],
            });
            if (!device || !device.gatt) {
                console.log('device is undefined');
                return;
            }
            const server = await device.gatt.connect();
            const wifiAccessPointService = await server.getPrimaryService('b5f90001-aa8d-11e3-9046-0002a5d5c51b');
            const wifiApSSIDcharacteristic = await wifiAccessPointService.getCharacteristic('b5f90002-aa8d-11e3-9046-0002a5d5c51b');
            const controlQueryService = await server.getPrimaryService('0000fea6-0000-1000-8000-00805f9b34fb');

            const commandCharacteristic = await controlQueryService.getCharacteristic('b5f90072-aa8d-11e3-9046-0002a5d5c51b');
            const y = new Uint8Array([0x01, 0x05]);
            await commandCharacteristic.writeValue(y);

            // const services = (await server.getPrimaryServices());
            // alert(services.map((s) => s.uuid).reduce((s) => s + " "));
            // const characteristics = await services[0].getCharacteristics();
            // alert(characteristics.map((s) => s.uuid).reduce((s) => s + " "));
            alert('value');
            const value = await wifiApSSIDcharacteristic.readValue();
            alert(`teext ${bin2String(new Uint8Array(value.buffer))}`);
            console.log(`> Battery Level is ${value.getUint8(0)}%`);
            console.log(device.name);
        } catch (err) {
            alert(err);
        }
    }

    render(): React.ReactNode {
        return (
            <div>
                <div>
                    <Button variant="contained" color="primary" onClick={this.handleFindCamera}>
                        Find camera
                    </Button>
                </div>
            </div>
        );
    }
}

export default FindCamera;
