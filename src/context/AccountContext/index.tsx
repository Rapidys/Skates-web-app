import React, {FC, useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useServices} from "../Services/ServiceContextProvider";


const AccountContext = React.createContext({
    AccountServices: [],
    DisplayName: '',
    cardNumber: '',
    ClientId: 0,
    Clients: [],
    handleCloseNewUserModal:() => {},
    setCurrentUser: (param:any) => {},
    CheckAccount: (accountId: string) => {
    }
})

interface IAccountContext {
    children: React.ReactNode
}

const AccountContextProvider: FC<IAccountContext> = ({children}) => {

    const [state, setState] = useState({
        AccountServices: [],
        Identifier: '',
        ClientId: -1,
        DisplayName: '',
        Clients:[],
    })
    const {services} = useServices()


    const navigate = useNavigate()
    const CheckAccount = async (accountId: string) => {
        try {
            services.Card.getCardInfo({Identifier: accountId}).then(res => {
                if (res?.data.length === 0) {
                    setState({
                        ...state,
                        Identifier: accountId,
                        ClientId:-1000,
                    })
                    navigate(('/createAccount'))
                    return
                }
                ///more then one user
                if(res?.data.length > 1){
                    setState({
                        ...state,
                        Clients:res?.data,
                        Identifier: accountId
                    })
                    navigate(('/chooseUser'))
                    return
                }
                // user exists
                setState({
                    ...state,
                    ClientId: res?.data[0].clientId,
                    DisplayName: res?.data[0].displayName,
                    Identifier: accountId
                })
                navigate(('/dashboard'))
            })
        } catch (e) {
            console.log(e)
        }
    }

    const setCurrentUser = (account:any) => {
        setState({
            ...state,
            ClientId:account?.clientId,
            DisplayName: account?.displayName,
        })
        navigate(('/dashboard'))
    }

    const handleCloseNewUserModal = () => {
        setState({
            ...state,
            ClientId: -1,
        })
    }

    return (
        <AccountContext.Provider value={{
            AccountServices: state.AccountServices,
            cardNumber: state.Identifier,
            ClientId:state.ClientId,
            DisplayName:state.DisplayName,
            Clients:state?.Clients,
            setCurrentUser,
            CheckAccount,
            handleCloseNewUserModal
        }}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountContextProvider;

export const useAccount = () => useContext(AccountContext)