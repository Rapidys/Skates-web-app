import React, {FC, useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";


const AccountContext = React.createContext({
    HasAccount:false,
    AccountServices:[],
    CheckAccount:(accountId:string)=>{}
})

interface IAccountContext {
    children:React.ReactNode
}
const AccountContextProvider:FC<IAccountContext> = ({children}) => {

   const [state,setState] = useState({
       HasAccount:false,
       AccountServices:[],
   })

    const navigate = useNavigate()
    const CheckAccount = (accountId:string) => {
       const HasAccount = false
       if(!HasAccount){
          navigate(('/createAccount'))
       }
    }

    return (
        <AccountContext.Provider value={{
            HasAccount:state.HasAccount,
            AccountServices:state.AccountServices,
            CheckAccount
        }}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountContextProvider;

export const useAccount = () => useContext(AccountContext)