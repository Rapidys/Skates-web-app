import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import {PrivateRoutes, PublicRoutes} from './routing/routs'
import {IRoute} from "./routing/types";
import {useServices} from "./context/Services/ServiceContextProvider";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {

    const {token} = useServices()

    return (
        <div className={'h-full'}>
            {
                token ? (
                    <Routes>
                        {
                            PrivateRoutes.map((route: IRoute) => {
                                return (
                                    <Route
                                        path={route.path}
                                        element={
                                            <PrivateRoute path={route.path}>
                                                <route.layout>
                                                    <route.component/>
                                                </route.layout>
                                            </PrivateRoute>
                                        }
                                        key={route.id}
                                    />
                                )
                            })
                        }
                        <Route path="*" element={<Navigate to="/findAccount" replace/>}/>
                    </Routes>

                ) : (
                    <Routes>
                        {
                            PublicRoutes.map((route: IRoute) => {
                                return (
                                    <Route path={route.path} element={<route.layout>
                                        <route.component/>
                                    </route.layout>} key={route.id}/>
                                )
                            })
                        }
                        <Route path="*" element={<Navigate to="/login" replace/>}/>
                    </Routes>
                )
            }
        </div>
    );
};

export default App;