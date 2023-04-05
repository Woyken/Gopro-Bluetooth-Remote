// @refresh reload
import {Route, Routes} from '@solidjs/router';
import {Suspense} from 'solid-js';
import {
	Body,
	FileRoutes,
	Head,
	Html,
	Meta,
	Scripts,
	Title,
	useNavigate,
} from 'solid-start';
import {ErrorBoundary} from 'solid-start/error-boundary';
import {BleDevicesProvider} from './bleDevicesProvider';

function PageNotfound() {
	const navigate = useNavigate();
	return (
		<button
			onclick={() => {
				navigate('/');
			}}
		>
			Page not found, go home?
		</button>
	);
}

export default function Root() {
	return (
		<Html lang="en">
			<Head>
				<Title>SolidStart - With Vitest</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta name="color-scheme" content="dark light" />
			</Head>
			<Body>
				<Suspense>
					<ErrorBoundary>
						<BleDevicesProvider>
							<Routes>
								<FileRoutes />
								<Route path="*" component={PageNotfound} />
							</Routes>
						</BleDevicesProvider>
					</ErrorBoundary>
				</Suspense>
				<Scripts />
			</Body>
		</Html>
	);
}
