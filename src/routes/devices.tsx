import {For, from} from 'solid-js';
import {useBleDevices, useRequestBleDevice} from '../bleDevicesProvider';
import {useNavigate} from 'solid-start';

export default function DeviceChoosePage() {
	const devices = from(useBleDevices());
	const requestBleDevice = useRequestBleDevice();
	const navigate = useNavigate();

	return (
		<div>
			<button
				onclick={() => {
					requestBleDevice();
				}}
			>
				Search
			</button>
			<For each={devices()}>
				{(device) => (
					<>
						<div
							onclick={() => {
								navigate(`/device/${device.id}`);
							}}
						>
							device {device.name ?? device.id}
						</div>
						<div>----------------------------------</div>
					</>
				)}
			</For>
		</div>
	);
}
