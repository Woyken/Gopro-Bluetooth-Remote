/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';

import { visualizer } from 'rollup-plugin-visualizer';
import { UserConfig } from 'vite';
import Checker from 'vite-plugin-checker';
import { ManifestOptions, VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

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

function pathResolve(dir: string) {
    return resolve(__dirname, '.', dir);
}

const mode = process.env.APP_ENV;
const isDev = mode === 'development';

// https://vitejs.dev/config/
const config: () => UserConfig = () => ({
    mode,
    base: isDev ? '/' : '/Gopro-Bluetooth-Remote/',
    server: {
        hmr: { port: 443 },
        https: true,
    },
    preview: {
        https: true,
    },
    build: {
        sourcemap: isDev,
        minify: isDev ? false : undefined,
        rollupOptions: {
            plugins: [isDev ? visualizer({ filename: 'moduleVisualizerOutput.html' }) : undefined],
            output: {
                manualChunks: (id, api): string | undefined => {
                    if (id.includes('node_modules')) {
                        if (id.includes('@mui')) return 'vendor_mui';
                        if (id.includes('pako')) return 'vendor_pako';
                        if (id.includes('i18next')) return 'vendor_i18next';
                        return 'vendor'; // all other package goes here
                    }
                    return undefined;
                },
            },
        },
    },
    resolve: {
        alias: [
            {
                find: /@\//,
                replacement: `${pathResolve('src')}/`,
            },
        ],
    },
    plugins: [
        VitePWA(pwaOptions),
        tsconfigPaths(),
        react({
            jsxRuntime: 'classic',
            babel: {
                plugins: [
                    [
                        '@emotion',
                        {
                            importMap: {
                                '@mui/material': {
                                    styled: {
                                        canonicalImport: ['@emotion/styled', 'default'],
                                        styledBaseImport: ['@mui/material', 'styled'],
                                    },
                                },
                                '@mui/material/styles': {
                                    styled: {
                                        canonicalImport: ['@emotion/styled', 'default'],
                                        styledBaseImport: ['@mui/material/styles', 'styled'],
                                    },
                                },
                            },
                        },
                    ],
                ],
            },
        }),
        Checker({
            typescript: true,
            overlay: true,
            eslint: {
                files: 'src',
                extensions: ['.ts', '.tsx'],
            },
        }),
    ],
});

export default config;
