import React, {FC, useContext, useState} from 'react';
import {useServices} from "../Services/ServiceContextProvider";
import axiosInstance from "../../settings/axios";


const AuthContext = React.createContext({
   isLoggedIn:false,
   handleLogin:(data:any) => {},
   handleLogout:() => {},
   token:'',
})

interface IUserInfo {
  children:React.ReactNode
}
const AuthContextProvider:FC<IUserInfo> = ({children}) => {


    const [state,setState] = useState({
        isLoggedIn:false,
        token:''
    })

    const { services } = useServices()

    const handleLogin = (data:any) => {
        try {
            services.Auth.login(data).then(res => {
                const {token} = res?.data
                setState({
                    ...state,
                    isLoggedIn: true,
                    token:token
                })
                localStorage.setItem('token',token)
            })
        }catch (e){
            console.log(e)
        }
    }


    const handleLogout = () => {
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
            token:state.token
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext)