import {map} from 'rxjs';
import {createEffect, from, Show} from 'solid-js';
import {useParams} from 'solid-start';
import {
	BleCharacteristicsProvider,
	useCommandResponseCharacteristic,
	useConnectGatt,
} from '~/bleCharacteristicsProvider';
import {useBleDevices} from '~/bleDevicesProvider';

function Comp1(props: {device: BluetoothDevice}) {
	const connect = useConnectGatt();
	const temp$ = useCommandResponseCharacteristic();
	createEffect(() => {
		setTimeout(() => {
			console.log(from(temp$)()?.uuid);
		}, 5000);
	});
	return (
		<div>
			{props.device?.name} {props.device?.id} todo, display stuff
			<button onclick={connect}>Connect</button>
		</div>
	);
}

// Todo, I would love to display settings view without connecting to device
// But first we do have to fetch settings
// After first time paired and connected to device, save settings json in localstorage
// Next time, if user picks same device, don't even connect to it, go straight to settings view.
// Connect probably in the background, maybe even schedule in a queue actions user clicks

export default function DeviceChoosePage() {
	const params = useParams();
	const device = from(
		useBleDevices().pipe(map((x) => x.find((d) => d.id === params.id))),
	);
	return (
		<>
			<Show when={device()}>
				<BleCharacteristicsProvider device={device()!}>
					<Comp1 device={device()!}></Comp1>
				</BleCharacteristicsProvider>
			</Show>
			<Show when={!device()}>
				<div>Device not found</div>
			</Show>
		</>
	);
}
