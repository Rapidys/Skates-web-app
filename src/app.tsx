import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import {PrivateRoutes, PublicRoutes} from './routing/routs'
import {IRoute} from "./routing/types";
import Layout from "./layout/dashboard";
import {useAuth} from "./context/authContext";

const App = () => {
    const {isLoggedIn} = useAuth()


    return (
        <div className={'h-full'}>
            {
                isLoggedIn ? (
                        <Routes>
                            {
                                PrivateRoutes.map((route: IRoute) => {
                                    return (
                                            <Route path={route.path} element={<route.layout><route.component/></route.layout>} key={route.id}/>
                                    )
                                })
                            }
                            <Route path="*" element={<Navigate to="/findAccount" replace />} />
                        </Routes>
                ) : (
                    <Routes>
                        {
                            PublicRoutes.map((route: IRoute) => {
                                return (
                                    <Route path={route.path} element={<route.layout><route.component/></route.layout>} key={route.id}/>
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