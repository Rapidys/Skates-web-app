import React from 'react';
import {Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import {AdminRoutes, PrivateRoutes, PublicRoutes} from './routing/routs'
import {IRoute} from "./routing/types";
import {useAuth} from "./context/AuthContext";
import {useServices} from "./context/Services/ServiceContextProvider";
import jwt_decode from "jwt-decode";

const App = () => {

    const {isLoggedIn ,isAdmin} = useAuth()

    return (
        <div className={'h-full'}>
            {
                isLoggedIn ? (
                    <>
                        {isAdmin ? (
                            <Routes>
                                {
                                    AdminRoutes.map((route: IRoute) => {
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
                                    PrivateRoutes.map((route: IRoute) => {
                                        return (
                                            <Route path={route.path} element={<route.layout><route.component/></route.layout>} key={route.id}/>
                                        )
                                    })
                                }
                                <Route path="*" element={<Navigate to="/findAccount" replace />} />
                            </Routes>
                        )}
                    </>

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