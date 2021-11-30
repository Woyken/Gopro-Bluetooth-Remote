/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';

import { UserConfig } from 'vite';
import Checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

function pathResolve(dir: string) {
    return resolve(__dirname, '.', dir);
}

// https://vitejs.dev/config/
const config: () => UserConfig = () => ({
    server: {
        hmr: { port: 443 },
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
        tsconfigPaths(),
        react({
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
