/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

import { AppProvider } from 'AppProvider';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-unresolved
import { registerSW } from 'virtual:pwa-register';

// import * as serviceWorker from './serviceWorker';

const intervalMS = 60 * 60 * 1000;

// eslint-disable-next-line react-hooks/rules-of-hooks
registerSW({
    onRegistered(r) {
        if (!r) return;
        setInterval(() => {
            r.update();
        }, intervalMS);
    },
});

ReactDOM.render(<AppProvider />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
