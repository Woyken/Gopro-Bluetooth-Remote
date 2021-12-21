import { useEffect } from 'react';

import { useTheme } from '@mui/material';

import { useGetBaseManifest } from './pwaGetBaseManifest';

const manifestBaseUrl = window.location.href;
// Manifest should exist in index.html
const manifestElement = Array.from(document.getElementsByTagName('link')).filter((l) => l.rel === 'manifest')[0];
if (!manifestElement) throw new Error("Couldn't find manifest element");

export const useDynamicManifest = () => {
    const manifestTemplate = useGetBaseManifest();
    const theme = useTheme();

    useEffect(() => {
        // Cleanup template manifest url, we'll be new dynamic one
        manifestElement.href = '';
    }, []);

    useEffect(() => {
        if (!manifestTemplate) return;
        // Manifest theme color to match current theme
        manifestTemplate.theme_color = theme.palette.primary.main;
        manifestTemplate.background_color = theme.palette.background.default;
        // Manifest url will be blob:..... it no longer matches location.href, need to update urls to full paths
        manifestTemplate.start_url = manifestBaseUrl;
        manifestTemplate.scope = manifestBaseUrl;
        manifestTemplate.icons.forEach((icon) => {
            icon.src = `${manifestBaseUrl}${icon.src}`;
        });
        const stringManifest = JSON.stringify(manifestTemplate);
        const blob = new Blob([stringManifest], { type: 'application/json' });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
            manifestElement.href = reader.result as string;
        };
    }, [manifestTemplate, theme]);
};
