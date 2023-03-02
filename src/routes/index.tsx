import {createEffect, createSignal, onCleanup, untrack} from 'solid-js';
import Counter from '~/components/Counter';
import ThemeProvider, {type ThemeMode} from '~/components/theme/themeProvider';
import './index.css';

export default function Home() {
	const [mode, setMode] = createSignal<ThemeMode>('dark');

	createEffect(() => {
		const interval = setInterval(() => {
			setMode((m) => (m === 'dark' ? 'light' : 'dark'));
		}, 10000);
		onCleanup(() => {
			clearInterval(interval);
		});
	});

	return (
		<ThemeProvider mode={mode()}>
			<main>
				<h1>Hello world!</h1>
				<Counter />
				<p>
					Visit{' '}
					<a href="https://solidjs.com" target="_blank">
						solidjs.com
					</a>{' '}
					to learn how to build Solid apps.
				</p>
			</main>
		</ThemeProvider>
	);
}
