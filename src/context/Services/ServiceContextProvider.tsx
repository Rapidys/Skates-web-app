import React, {FC, useContext, useEffect, useState} from 'react';
import axiosInstance from "../../settings/axios";
import {useErrorHandling} from "../ErrorHandlingContext";
import CardServices, {ICardServices, IUpdateCardInfo} from "./CardServices";
import Dashboard, {IDashboardServices} from "./DashboardServices";
import DashboardServices from "./DashboardServices";
import {IConsumeOrder} from "../../types/Dashboard";
import AuthServices, {IAuthServices} from "./AuthServices";
import {useAuth} from "../AuthContext";
import AdminServices, {IAdminServices} from "./AdminServices";
import { AxiosInstance } from "axios";

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
        },
        AdminServices: {
            getUsers: async () => {},
            updateUsers: async () => {},
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
    Admin:IAdminServices
}
export interface MyAxios extends AxiosInstance {}


const ServiceContextProvider: FC<IServiceContextProvider> = ({children}) => {
    const {handleSetError} = useErrorHandling()

    const { handleLogout} = useAuth()

    const [token,setToken] = useState('')

    const axios = axiosInstance(handleSetError,handleLogout)
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`

    const Card = CardServices(axios)
    const Dashboard = DashboardServices(axios)
    const Auth = AuthServices(axios)
    const Admin = AdminServices(axios)

    const services: IServices = {
        Card,
        Dashboard,
        Auth,
        Admin
    }


    return (
        <ServiceContext.Provider
            value={{
                services,
                token,
                setToken
            }}
        >
            {children}
        </ServiceContext.Provider>
    );
};

export const useServices = () => useContext(ServiceContext)

export default ServiceContextProvider;