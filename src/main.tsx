import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom'

import App from './app';
import AuthContextProvider from "./context/authContext";
import AccountContextProvider from "./context/accountContext";
import AlertContextProvider from "./context/alertContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
        <Router>
            <AlertContextProvider>
                <AuthContextProvider>
                    <AccountContextProvider>
                        <App/>
                    </AccountContextProvider>
                </AuthContextProvider>
            </AlertContextProvider>
        </Router>
);
