import { ServiceWorkerContainer } from 'components/pwa/ServiceWorkerContainer';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { GlobalStyles } from 'tss-react';

import { ThemeProvider, useTheme } from '@mui/material';

import { store } from './store/store';
import App from './App';

import 'react-toastify/dist/ReactToastify.css';

export const AppProvider: React.FC = () => {
    const theme = useTheme();
    return (
        <Provider store={store}>
            <GlobalStyles
                styles={{
                    body: {
                        margin: 0,
                        padding: 0,
                    },
                }}
            />
            <ThemeProvider theme={theme}>
                <ServiceWorkerContainer />
                <ToastContainer />
                <App />
            </ThemeProvider>
        </Provider>
    );
};
