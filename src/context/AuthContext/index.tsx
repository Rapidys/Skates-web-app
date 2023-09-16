import React, {FC, useContext, useEffect, useState} from 'react';
import {useServices} from "../Services/ServiceContextProvider";
import axiosInstance from "../../settings/axios";
import jwt_decode from "jwt-decode";


const AuthContext = React.createContext({
   isLoggedIn:false,
   handleLogin:(data:any) => {},
   handleLogout:() => {},
   isAdmin:false,
})

interface IUserInfo {
  children:React.ReactNode
}
const AuthContextProvider:FC<IUserInfo> = ({children}) => {


    const [state,setState] = useState({
        isLoggedIn:false,
        isAdmin:false,
        token:''
    })

    const { services,setToken } = useServices()


    useEffect(() => {
        const token = localStorage.getItem('token')
        const decodedToken = token ? jwt_decode(token) : false;
        const isAdmin = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin'
        if(token){
            setState({
                ...state,
                isLoggedIn: true,
                token:token,
                isAdmin
            })
            setToken(token)
        }
    }, []);

    const handleLogin = (data:any) => {
        try {
            services.Auth.login(data).then((res:any) => {
                const {token} = res?.data
                const decodedToken = token ? jwt_decode(token) : false;
                const isAdmin = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin'
                if(token){
                    setState({
                        ...state,
                        isLoggedIn: true,
                        token:token,
                        isAdmin
                    })
                    setToken(token)
                    localStorage.setItem('token',token)
                }
            })
        }catch (e){
            console.log(e)
        }
    }


    const handleLogout = () => {
        localStorage.removeItem('token')
        setToken('')
        setState({
            ...state,
            isLoggedIn: false,
            isAdmin:false,
            token:''
        })
    }


    return (
        <AuthContext.Provider value={{
            isLoggedIn:state.isLoggedIn,
            handleLogin,
            handleLogout,
            isAdmin:state?.isAdmin,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext)