import DynamicManifestProvider from 'components/pwa/DynamicManifestProvider';
import { ServiceWorkerContainer } from 'components/pwa/ServiceWorkerContainer';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useAppTheme } from 'theme/makeStyles';
import { GlobalStyles } from 'tss-react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { store } from './store/store';
import App from './App';

import 'react-toastify/dist/ReactToastify.css';

export const AppProvider: React.FC = () => {
    const theme = useAppTheme();
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
                <DynamicManifestProvider />
                <ServiceWorkerContainer />
                <ToastContainer />
                <CssBaseline />
                <App />
            </ThemeProvider>
        </Provider>
    );
};
