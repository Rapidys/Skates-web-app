import React, {FC, useContext, useEffect, useState} from 'react';
import {useServices} from "../Services/ServiceContextProvider";
import axiosInstance from "../../settings/axios";


const AuthContext = React.createContext({
   isLoggedIn:false,
   handleLogin:(data:any) => {},
   handleLogout:() => {},
})

interface IUserInfo {
  children:React.ReactNode
}
const AuthContextProvider:FC<IUserInfo> = ({children}) => {


    const [state,setState] = useState({
        isLoggedIn:false,
    })

    const { services,setToken } = useServices()


    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            setState({
                ...state,
                isLoggedIn: true
            })
            setToken(token)
        }
    }, []);

    const handleLogin = (data:any) => {
        try {
            services.Auth.login(data).then((res:any) => {
                const {token} = res?.data
                if(token){
                    setState({
                        ...state,
                        isLoggedIn: true,
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
        })
    }


    return (
        <AuthContext.Provider value={{
            isLoggedIn:state.isLoggedIn,
            handleLogin,
            handleLogout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext)