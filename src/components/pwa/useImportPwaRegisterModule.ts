/* eslint-disable import/no-unresolved */
import { useEffect, useState } from 'react';

export type ModuleVirtualPwaRegisterReact = typeof import('virtual:pwa-register/react');

export function useImportPwaRegisterModule() {
    const [module, setModule] = useState<ModuleVirtualPwaRegisterReact>();
    useEffect(() => {
        // Jest will complain a lot about missing virtual:pwa-register module
        // It's complicated marrying those two together.
        // Those virtual functions are injected via vite, so they are not available for jest.
        if (process.env.JEST_WORKER_ID !== undefined) return;
        import('virtual:pwa-register/react').then(setModule);
    }, [setModule]);
    return module;
}
