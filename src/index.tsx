/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

import { AppProvider } from 'AppProvider';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
if (!container) throw new Error("Couldn't find root container");
const root = createRoot(container);
root.render(<AppProvider />);
