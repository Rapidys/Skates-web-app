import React, {FC, useContext, useState} from 'react';
import axiosInstance from "../../settings/axios";
import {useErrorHandling} from "../ErrorHandlingContext";
import CardServices, {ICardServices, IUpdateCardInfo} from "./CardServices";
import Dashboard, {IDashboardServices} from "./DashboardServices";
import DashboardServices from "./DashboardServices";
import {IConsumeOrder} from "../../types/Dashboard";

const ServiceContext = React.createContext<Record<'services', IServices>>({
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
        }
    }
})

interface IServiceContextProvider {
    children: React.ReactNode
}

interface IServices {
    Card: ICardServices,
    Dashboard:IDashboardServices
}

const ServiceContextProvider: FC<IServiceContextProvider> = ({children}) => {
    const {handleSetError} = useErrorHandling()

    const axios = axiosInstance(handleSetError)

    const Card = CardServices(axios)
    const Dashboard = DashboardServices(axios)

    const services: IServices = {
        Card,
        Dashboard
    }

    return (
        <ServiceContext.Provider
            value={{
                services
            }}
        >
            {children}
        </ServiceContext.Provider>
    );
};

export const useServices = () => useContext(ServiceContext)

export default ServiceContextProvider;