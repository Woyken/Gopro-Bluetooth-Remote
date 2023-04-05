/* eslint-disable @typescript-eslint/naming-convention */
import solid from 'solid-start/vite';
import solidStatic from 'solid-start-static';
import solidDevtools from 'solid-devtools/vite';
import {defineConfig} from 'vite';
import {VitePWA as vitePWA, type VitePWAOptions} from 'vite-plugin-pwa';

const pwaOptions: Partial<VitePWAOptions> = {
	mode: 'development',
	includeAssets: ['camera.ico', 'robots.txt'],
	manifest: {
		name: 'Gopro web-bluetooth remote',
		short_name: 'Gopro web-ble remote',
		description: 'Description of your app',
		theme_color: '#ffffff',
		icons: [
			{
				src: 'camera.ico',
				sizes: '64x64 32x32 24x24 16x16',
				type: 'image/x-icon',
			},
			{
				src: 'camera128.png',
				type: 'image/png',
				sizes: '128x128',
			},
			{
				src: 'camera512.png',
				type: 'image/png',
				sizes: '512x512',
			},
		],
	},
};

export default defineConfig({
	plugins: [
		solid({adapter: solidStatic()}),
		vitePWA(pwaOptions),
		solidDevtools({autoname: true}),
	],
});
