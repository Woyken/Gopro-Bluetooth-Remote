import {map} from 'rxjs';
import {from} from 'solid-js';
import {useParams} from 'solid-start';
import {useBleDevices} from '~/bleDevicesProvider';

export default function DeviceChoosePage() {
	const params = useParams();
	const device = from(
		useBleDevices().pipe(map((x) => x.find((d) => d.id === params.id))),
	);
	return (
		<div>
			{device()?.name} {device()?.id} todo, display stuff
		</div>
	);
}
