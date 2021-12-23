import { useEffect, useState } from 'react';

import { useTheme } from '@mui/material';

import { useGetBaseManifest } from './pwaGetBaseManifest';

const manifestBaseUrl = window.location.href;

export const useDynamicManifest = () => {
    const manifestTemplate = useGetBaseManifest();
    const theme = useTheme();
    const [manifestEl, setmanifestEl] = useState<HTMLLinkElement>();

    useEffect(() => {
        // Manifest should exist in index.html
        const manifestElement = Array.from(document.getElementsByTagName('link')).filter((l) => l.rel === 'manifest')[0];
        setmanifestEl(manifestElement);
        // Cleanup template manifest url, we'll be new dynamic one
        if (manifestElement) manifestElement.href = '';
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
            // If using URL.createObjectURL, it creates unique guid url each time and it fails to install pwa on android
            // manifest href will be full file in base64
            if (manifestEl) manifestEl.href = reader.result as string;
        };
    }, [manifestTemplate, theme]);
};
