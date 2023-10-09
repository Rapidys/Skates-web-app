import * as ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom'

import App from './app';
import AuthContextProvider from "./context/AuthContext";
import AccountContextProvider from "./context/AccountContext";
import ErrorHandlingContextProvider from "./context/ErrorHandlingContext";
import ServiceContextProvider from "./context/Services/ServiceContextProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
        <Router>
            <ErrorHandlingContextProvider>
                <ServiceContextProvider>
                    <AuthContextProvider>
                        <AccountContextProvider>
                            <App/>
                        </AccountContextProvider>
                    </AuthContextProvider>
                </ServiceContextProvider>
            </ErrorHandlingContextProvider>
        </Router>
);
