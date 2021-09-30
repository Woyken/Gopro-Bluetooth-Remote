import React, { Component } from 'react';
import { Button } from "@material-ui/core";

class FindCamera extends Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        this.state = {};
        this.handleFindCamera = this.handleFindCamera.bind(this);
    }

    async handleFindCamera(): Promise<void> {
        try {

            const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true, optionalServices: ['0000fea6-0000-1000-8000-00805f9b34fb'] });
            if (!device || !device.gatt) {
                console.log("device is undefined");
                return;
            }
            const server = await device.gatt.connect();
            const services = (await server.getPrimaryServices());
            alert(services.map((s) => s.uuid).reduce((s) => s + " "));
            const characteristics = await services[0].getCharacteristics();
            alert(characteristics.map((s) => s.uuid).reduce((s) => s + " "));
            // const service = await server.getPrimaryService('0000fea6-0000-1000-8000-00805f9b34fb');
            // const characteristic = await services[0].getCharacteristic('b5f90072-aa8d-11e3-9046-0002a5d5c51b');
            const value = await characteristics[0].readValue();
            console.log('> Battery Level is ' + value.getUint8(0) + '%');
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
