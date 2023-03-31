export {useColorMode, useColorModeValue} from '@kobalte/core';

import {
	ColorModeProvider,
	ColorModeProviderProps,
	useColorMode,
} from '@kobalte/core';
import '@picocss/pico/scss/themes/default.scss';
import {
	createEffect,
	type ParentProps,
} from 'solid-js';

function GlobalThemeSwitcher() {
	const {colorMode} = useColorMode();

	createEffect(() => {
		document.querySelector('html')?.setAttribute('data-theme', colorMode());
	});

	return <></>;
}

export default function ThemeProvider(
	props: ParentProps<ColorModeProviderProps>,
) {
	return (
		<ColorModeProvider {...props}>
			<GlobalThemeSwitcher />
			{props.children}
		</ColorModeProvider>
	);
}
