import React, { FC } from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from "../../context/AuthContext";

interface IPrivateRoute {
    children:React.ReactNode,
    path:string,
    isPrivate?:boolean
}
const PrivateRoute:FC<IPrivateRoute> = ({children,isPrivate,path,...props}):any => {


    const {isAdmin} = useAuth()

    const adminRoutes = ['/admin']

    if(adminRoutes.includes(path) && !isAdmin){
        return <Navigate to="/findAccount"/>
    }


    return <>
        {children}
    </>
};

export default PrivateRoute;