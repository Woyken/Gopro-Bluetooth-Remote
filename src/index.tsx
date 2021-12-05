/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
// eslint-disable-next-line import/no-unresolved
import { registerSW } from 'virtual:pwa-register';

import { ThemeProvider, useTheme } from '@mui/material';

import { store } from './store/store';
import App from './App';

// import * as serviceWorker from './serviceWorker';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

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

const ProviderComponent: React.FC = () => {
    const theme = useTheme();
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <ToastContainer />
                <App />
            </ThemeProvider>
        </Provider>
    );
};

ReactDOM.render(<ProviderComponent />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
