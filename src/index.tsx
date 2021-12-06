/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

import { AppProvider } from 'AppProvider';
import ReactDOM from 'react-dom';

ReactDOM.render(<AppProvider />, document.getElementById('root'));
