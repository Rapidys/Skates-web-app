import React, {FC, useContext, useEffect, useState} from 'react';
import axiosInstance from "../../settings/axios";
import {useErrorHandling} from "../ErrorHandlingContext";
import CardServices, {ICardServices, IUpdateCardInfo} from "./CardServices";
import Dashboard, {IDashboardServices} from "./DashboardServices";
import DashboardServices from "./DashboardServices";
import {IConsumeOrder} from "../../types/Dashboard";
import AuthServices, {IAuthServices} from "./AuthServices";
import {useAuth} from "../AuthContext";

const ServiceContext = React.createContext<any>({
    services: {
        Card: {
            getClientInfo: async (body: Record<"ClientId", number>) => {},
            updateCardInfo: async (body: IUpdateCardInfo) => {},
            getCardInfo: async (body: Record<"Identifier", string>) => {},
        },
        Dashboard: {
            getServices: async () => {},
            getPaymentTypes: async () => {},
            getTrainers: async () => {},
            makeOrder: async (data:any) => {},
            getClientOrders: async (clientId:number) => {},
            consumeOrder: async (data:IConsumeOrder) => {},
            updateOrder: async (data:any) => {},
        },
        Auth: {
            login: async () => {},
        }
    },
    setToken:() => {}
})

interface IServiceContextProvider {
    children: React.ReactNode
}

interface IServices {
    Card: ICardServices,
    Dashboard:IDashboardServices,
    Auth:IAuthServices
}

const ServiceContextProvider: FC<IServiceContextProvider> = ({children}) => {
    const {handleSetError} = useErrorHandling()

    const [token,setToken] = useState('')

    const axios = axiosInstance(handleSetError)
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`

    const Card = CardServices(axios)
    const Dashboard = DashboardServices(axios)
    const Auth = AuthServices(axios)

    const services: IServices = {
        Card,
        Dashboard,
        Auth
    }


    return (
        <ServiceContext.Provider
            value={{
                services,
                setToken
            }}
        >
            {children}
        </ServiceContext.Provider>
    );
};

export const useServices = () => useContext(ServiceContext)

export default ServiceContextProvider;