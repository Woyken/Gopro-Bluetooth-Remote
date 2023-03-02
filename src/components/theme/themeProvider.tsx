import '@picocss/pico/scss/themes/default.scss';
import {
	type Accessor,
	createContext,
	createEffect,
	useContext,
	type ParentProps,
} from 'solid-js';

export type ThemeMode = 'dark' | 'light';

const ThemeModeContext = createContext<ThemeMode>('dark');

export function useThemeMode() {
	const themeMode = useContext(ThemeModeContext);
	return themeMode;
}

type Props = {
	mode: ThemeMode;
};

function useGlobalThemeSwitcher(mode: Accessor<ThemeMode>) {
	createEffect(() => {
		document.querySelector('html')?.setAttribute('data-theme', mode());
	});
}

export default function ThemeProvider(props: ParentProps<Props>) {
	useGlobalThemeSwitcher(() => props.mode);

	return (
		<ThemeModeContext.Provider value={props.mode}>
			{props.children}
		</ThemeModeContext.Provider>
	);
}
