import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider, useTheme } from '@mui/material';

import { store } from './store/store';
import App from './App';

import 'react-toastify/dist/ReactToastify.css';

export const AppProvider: React.FC = () => {
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
