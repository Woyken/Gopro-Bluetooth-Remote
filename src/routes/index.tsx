import Counter from '~/components/Counter';
import ThemeProvider from '~/components/lowLevel/theme/themeProvider';
import './index.css';

export default function Home() {
	return (
		<ThemeProvider>
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
