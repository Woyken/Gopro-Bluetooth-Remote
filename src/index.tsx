import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider, useTheme } from '@mui/material';

import { store } from './store/store';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

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
serviceWorker.register();
