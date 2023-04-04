import {
	Subject,
	BehaviorSubject,
	type Observable,
	switchMap,
	fromEvent,
	shareReplay,
	map,
	merge,
} from 'rxjs';
import {
	createContext,
	type ParentProps,
	useContext,
	createEffect,
	onCleanup,
} from 'solid-js';

type Ctx = {
	clickGattConnect$: Subject<unknown>;
	wifiApSsidCharacteristic: Observable<
		BluetoothRemoteGATTCharacteristic | undefined
	>;
	wifiApPasswordCharacteristic: Observable<
		BluetoothRemoteGATTCharacteristic | undefined
	>;
	wifiApPowerCharacteristic: Observable<
		BluetoothRemoteGATTCharacteristic | undefined
	>;
	wifiApStateCharacteristic: Observable<
		BluetoothRemoteGATTCharacteristic | undefined
	>;
	commandCharacteristic: Observable<
		BluetoothRemoteGATTCharacteristic | undefined
	>;
	commandResponseCharacteristic: Observable<
		BluetoothRemoteGATTCharacteristic | undefined
	>;
	settingsCharacteristic: Observable<
		BluetoothRemoteGATTCharacteristic | undefined
	>;
	settingsResponseCharacteristic: Observable<
		BluetoothRemoteGATTCharacteristic | undefined
	>;
	queryCharacteristic: Observable<
		BluetoothRemoteGATTCharacteristic | undefined
	>;
	queryResponseCharacteristic: Observable<
		BluetoothRemoteGATTCharacteristic | undefined
	>;
};

const BleCharacteristicsContext = createContext<Ctx>();

// This is not required to be done by user action, but probably preferable, since it will turn on GoPro device
export function useConnectGatt() {
	const ctx = useContext(BleCharacteristicsContext);
	if (!ctx) throw new Error('Missing BleDeviceProvider');
	return () => {
		ctx.clickGattConnect$.next(1);
	};
}

type Props = {
	device: BluetoothDevice;
};

function solidToRxjs(props: Props) {
	const subject$ = new BehaviorSubject(props.device);
	createEffect(() => {
		subject$.next(props.device);
	});
	onCleanup(() => {
		subject$.complete();
	});
	return subject$.asObservable();
}

export function BleCharacteristicsProvider(props: ParentProps<Props>) {
	const device$ = solidToRxjs(props);
	const clickGattConnect$ = new Subject();

	const gattDisconnected$ = device$.pipe(
		switchMap((x) =>
			fromEvent(x, 'gattserverdisconnected').pipe(map(() => undefined)),
		),
	);
	const gattServerConnect$ = clickGattConnect$.pipe(
		switchMap(() => device$.pipe(switchMap(async (x) => x.gatt?.connect()))),
	);
	const gattServer$ = merge(gattDisconnected$, gattServerConnect$).pipe(
		shareReplay(1),
	);

	const wifiApService = gattServer$.pipe(
		switchMap(async (x) =>
			x?.getPrimaryService('b5f90001-aa8d-11e3-9046-0002a5d5c51b'),
		),
		shareReplay(1),
	);
	const wifiApSsidCharacteristic = wifiApService.pipe(
		switchMap(async (x) =>
			x?.getCharacteristic('b5f90002-aa8d-11e3-9046-0002a5d5c51b'),
		),
		shareReplay(1),
	);
	const wifiApPasswordCharacteristic = wifiApService.pipe(
		switchMap(async (x) =>
			x?.getCharacteristic('b5f90003-aa8d-11e3-9046-0002a5d5c51b'),
		),
		shareReplay(1),
	);
	const wifiApPowerCharacteristic = wifiApService.pipe(
		switchMap(async (x) =>
			x?.getCharacteristic('b5f90004-aa8d-11e3-9046-0002a5d5c51b'),
		),
		shareReplay(1),
	);
	const wifiApStateCharacteristic = wifiApService.pipe(
		switchMap(async (x) =>
			x?.getCharacteristic('b5f90005-aa8d-11e3-9046-0002a5d5c51b'),
		),
		shareReplay(1),
	);

	const cqService = gattServer$.pipe(
		switchMap(async (x) =>
			x?.getPrimaryService('0000fea6-0000-1000-8000-00805f9b34fb'),
		),
		shareReplay(1),
	);
	const commandCharacteristic = cqService.pipe(
		switchMap(async (x) =>
			x?.getCharacteristic('b5f90072-aa8d-11e3-9046-0002a5d5c51b'),
		),
		shareReplay(1),
	);
	const commandResponseCharacteristic = cqService.pipe(
		switchMap(async (x) =>
			x?.getCharacteristic('b5f90073-aa8d-11e3-9046-0002a5d5c51b'),
		),
		shareReplay(1),
	);
	const settingsCharacteristic = cqService.pipe(
		switchMap(async (x) =>
			x?.getCharacteristic('b5f90074-aa8d-11e3-9046-0002a5d5c51b'),
		),
		shareReplay(1),
	);
	const settingsResponseCharacteristic = cqService.pipe(
		switchMap(async (x) =>
			x?.getCharacteristic('b5f90075-aa8d-11e3-9046-0002a5d5c51b'),
		),
		shareReplay(1),
	);
	const queryCharacteristic = cqService.pipe(
		switchMap(async (x) =>
			x?.getCharacteristic('b5f90076-aa8d-11e3-9046-0002a5d5c51b'),
		),
		shareReplay(1),
	);
	const queryResponseCharacteristic = cqService.pipe(
		switchMap(async (x) =>
			x?.getCharacteristic('b5f90077-aa8d-11e3-9046-0002a5d5c51b'),
		),
		shareReplay(1),
	);

	return (
		<BleCharacteristicsContext.Provider
			value={{
				clickGattConnect$,
				wifiApSsidCharacteristic,
				wifiApPasswordCharacteristic,
				wifiApPowerCharacteristic,
				wifiApStateCharacteristic,
				commandCharacteristic,
				commandResponseCharacteristic,
				settingsCharacteristic,
				settingsResponseCharacteristic,
				queryCharacteristic,
				queryResponseCharacteristic,
			}}
		>
			{props.children}
		</BleCharacteristicsContext.Provider>
	);
}
