/**
 * @jest-environment jsdom
 */

import type { Manifest } from 'hooks/pwaGetBaseManifest';
import fetchMock from 'jest-fetch-mock';

import { act, render, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';

import { AppProvider } from '../AppProvider';

describe('<AppProvider />', () => {
    it('renders without errors', async () => {
        const htmlManifestEl = document.createElement('link');
        htmlManifestEl.setAttribute('rel', 'manifest');
        htmlManifestEl.setAttribute('href', 'manifest.json');
        document.head.appendChild(htmlManifestEl);

        const mockManifest: Manifest = {
            background_color: '#ffffff',
            icons: [
                {
                    src: 'https://example.com/icon.png',
                },
            ],
            scope: '/',
            start_url: '/react-unit-test',
            theme_color: '#ffffff',
        };
        fetchMock.mockResponseOnce(JSON.stringify(mockManifest));
        act(() => {
            render(<AppProvider />);
        });
        await waitFor(() => {
            expect(fetchMock.mock.calls.length).toBe(1);
            const manifestElement = Array.from(document.getElementsByTagName('link')).filter((l) => l.rel === 'manifest')[0];
            expect(manifestElement?.href.startsWith('data:application/json')).toBe(true);
        });
    });
});
