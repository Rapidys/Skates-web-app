import React, {FC, useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useServices} from "../Services/ServiceContextProvider";


const AccountContext = React.createContext({
    HasAccount: false,
    AccountServices: [],
    DisplayName: '',
    cardNumber: '',
    ClientId: -1000,
    CheckAccount: (accountId: string) => {
    }
})

interface IAccountContext {
    children: React.ReactNode
}

const AccountContextProvider: FC<IAccountContext> = ({children}) => {

    const [state, setState] = useState({
        HasAccount: false,
        AccountServices: [],
        Identifier: '',
        ClientId: -1000,
        DisplayName: '',
    })
    const {services} = useServices()


    const navigate = useNavigate()
    const CheckAccount = (accountId: string) => {

        try {
            services.Card.getCardInfo({Identifier: accountId}).then(res => {
                const {clientId, displayName} = res?.data
                if (clientId === -1000) {
                    setState({
                        ...state,
                        ClientId: clientId,
                        Identifier: accountId
                    })
                    navigate(('/createAccount'))
                    return
                }
                // user exists
                setState({
                    ...state,
                    ClientId: clientId,
                    DisplayName: displayName,
                    Identifier: accountId
                })
                navigate(('/dashboard'))
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <AccountContext.Provider value={{
            HasAccount: state.HasAccount,
            AccountServices: state.AccountServices,
            cardNumber: state.Identifier,
            ClientId:state.ClientId,
            DisplayName:state.DisplayName,
            CheckAccount
        }}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountContextProvider;

export const useAccount = () => useContext(AccountContext)