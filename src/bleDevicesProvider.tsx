import {
	Subject,
	type Observable,
	switchMap,
	shareReplay,
	from,
	of,
	mergeMap,
	merge,
	scan,
} from 'rxjs';
import {createContext, type ParentProps, useContext, onMount} from 'solid-js';

type Ctx = {
	requestBleDevice$: Subject<unknown>;
	devices$: Observable<BluetoothDevice[]>;
};

const BleDeviceContext = createContext<Ctx>();

/**
 * Trigger this on user input
 */
export function useRequestBleDevice() {
	const ctx = useContext(BleDeviceContext);
	if (!ctx) throw new Error('Missing BleDevicesProvider');
	return () => {
		ctx.requestBleDevice$.next(1);
	};
}

/**
 * Provides, saved and newly requested devices in single list
 */
export function useBleDevices() {
	const ctx = useContext(BleDeviceContext);
	if (!ctx) throw new Error('Missing BleDevicesProvider');
	return ctx.devices$;
}

async function requestGoProBle() {
	return navigator.bluetooth.requestDevice({
		filters: [{services: ['0000fea6-0000-1000-8000-00805f9b34fb']}],
		optionalServices: [
			'0000fea6-0000-1000-8000-00805f9b34fb',
			'b5f90001-aa8d-11e3-9046-0002a5d5c51b',
		],
	});
}

function onMountObs() {
	const mount$ = new Subject();
	onMount(() => {
		mount$.next(1);
		mount$.complete();
	});

	return mount$.asObservable();
}

export function BleDevicesProvider(props: ParentProps) {
	const requestBleDevice$ = new Subject<unknown>();

	const requestedDevice$ = requestBleDevice$.pipe(
		switchMap(async () => requestGoProBle()),
	);

	const savedDeviceList$ = onMountObs().pipe(
		switchMap(() =>
			'bluetooth' in navigator && 'getDevices' in navigator.bluetooth
				? from(navigator.bluetooth.getDevices())
				: of([]),
		),
		mergeMap((x) => x),
	);

	const mergedDevices$ = merge(requestedDevice$, savedDeviceList$);

	const combinedMergedDevices$ = mergedDevices$.pipe(
		scan((acc, x) => [...acc, x], [] as BluetoothDevice[]),
		shareReplay(1),
	);

	return (
		<BleDeviceContext.Provider
			value={{
				requestBleDevice$,
				devices$: combinedMergedDevices$,
			}}
		>
			{props.children}
		</BleDeviceContext.Provider>
	);
}
