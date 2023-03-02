import {switchMap, of, catchError} from 'rxjs';
import {fromFetch} from 'rxjs/fetch';
import {createEffect, createSignal, onCleanup} from 'solid-js';
import {createQuery} from '@tanstack/solid-query';

export type Manifest = {
	start_url: string;
	scope: string;
	theme_color: string;
	background_color: string;
	icons: {
		src: string;
	}[];
};

export function useManifestQuery() {
	return createQuery(
		() => ['manifest.webmanifest'],
		async () => {
			const response = await fetch('manifest.webmanifest');
			if (!response.ok) throw new Error(`HTTP status code: ${response.status}`);
			return response.json().then((x) => x as Manifest);
		},
	);
}
