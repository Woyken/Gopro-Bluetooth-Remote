import { useEffect, useState } from 'react';

interface Manifest {
    start_url: string;
    scope: string;
    theme_color: string;
    background_color: string;
    icons: {
        src: string;
    }[];
}

export const useGetBaseManifest = () => {
    const [manifest, setManifest] = useState<Manifest>();
    useEffect(() => {
        fetch('manifest.webmanifest')
            .then((r) => r.json())
            .then(setManifest);
    }, []);
    return manifest;
};
