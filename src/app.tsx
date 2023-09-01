import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import {AdminRoutes, PrivateRoutes, PublicRoutes} from './routing/routs'
import {IRoute} from "./routing/types";
import Layout from "./layout";

const App = () => {
    const isLoggedIn = true

    const role = 'admin'


    return (
        <div>
            {
                isLoggedIn ? (
                    <Layout>
                        <Routes>
                            {
                                PrivateRoutes.map((route: IRoute) => {
                                    return (
                                        <Route path={route.path} element={<route.component/>} key={route.id}/>
                                    )
                                })
                            }
                            {role === 'admin' && (
                                AdminRoutes.map((route: IRoute) => {
                                    return (
                                        <Route path={route.path} element={<route.component/>} key={route.id}/>
                                    )
                                })
                            )}
                            <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                    </Layout>
                ) : (
                    <Routes>
                        {
                            PublicRoutes.map((route: IRoute) => {
                                return (
                                    <Route path={route.path} element={<route.component/>} key={route.id}/>
                                )
                            })
                        }
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                )
            }
        </div>
    );
};

export default App;