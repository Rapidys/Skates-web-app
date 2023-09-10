import React, {FC, useContext, useState} from 'react';


const AuthContext = React.createContext({
   isLoggedIn:false,
   handleLogin:() => {},
   handleLogout:() => {}
})

interface IUserInfo {
  children:React.ReactNode
}
const AuthContextProvider:FC<IUserInfo> = ({children}) => {


    const [state,setState] = useState({
        isLoggedIn:false,
    })

    const handleLogin = () => {
        setState({
            ...state,
            isLoggedIn: true,
        })
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
            handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext)