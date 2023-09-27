import {ICommentData, IConsumeOrder, IMakeOrder, IServices, IUpdateOrder} from "../../../types/Dashboard";
import {MyAxios} from "../ServiceContextProvider";
import {AxiosResponse} from "axios";
import {IPaymentTypes, ITrainers} from "../../../types";

export interface IDashboardServices {
    getServices: (all: boolean) => Promise<AxiosResponse>,
    getPaymentTypes: (all: boolean) => Promise<AxiosResponse>,
    getTrainers: () => Promise<AxiosResponse>,
    makeOrder: (data: IMakeOrder) => Promise<AxiosResponse>,
    getClientOrders: (clientId: number) => Promise<AxiosResponse>,
    consumeOrder: (data: IConsumeOrder) => Promise<AxiosResponse>,
    updateOrder: (data: IUpdateOrder) => Promise<AxiosResponse>,
    comment: (data: ICommentData) => Promise<AxiosResponse>,
    getComments: (Orderid: { Orderid: number }) => Promise<AxiosResponse>,
    deleteOrder: (Orderid: { Orderid: number }) => Promise<AxiosResponse>,
    getServiceConsumes: (Orderid: { Orderid: number }) => Promise<AxiosResponse>,
}


const DashboardServices = (axios: MyAxios): IDashboardServices => {

    const getServices = (all = false) => {
        return axios.get<IServices[]>(`/Reference/GetServices?all=${all}`)
    }
    const getPaymentTypes = (all = false) => {
        return axios.get<IPaymentTypes[]>(`/Reference/GetPaymentTypes?all=${all}`)
    }
    const getTrainers = (all = false) => {
        return axios.get<ITrainers[]>(`/Reference/GetTrainers?all=${all}`)
    }
    const makeOrder = (data: IMakeOrder) => {
        return axios.post('/Orders/MakeOrder', data)
    }
    const getClientOrders = (clientId: number) => {
        return axios.post('/Orders/GetClientOrders', {ClientId: clientId, OnlyActive: true})
    }
    const consumeOrder = (data: IConsumeOrder) => {
        return axios.post('/Orders/ConsumeOrder', data)
    }

    const updateOrder = (data: IUpdateOrder) => {
        return axios.post('/Orders/UpdateClientOrder', data)
    }

    const deleteOrder = (Orderid: { Orderid: number }) => {
        return axios.post('/Orders/DeleteOrder', {Orderid})
    }

    const comment = (data: ICommentData) => {
        return axios.post('/Orders/Comment', data)
    }
    const getComments = (Orderid: { Orderid: number }) => {
        return axios.post('/Orders/GetComments', {Orderid})
    }
    const getServiceConsumes = (Orderid: { Orderid: number }) => {
        return axios.post('/Orders/GetServiceConsumes', {Orderid})
    }

    return {getServices, getPaymentTypes, getTrainers, makeOrder, getClientOrders, consumeOrder, updateOrder, comment, getComments, deleteOrder,getServiceConsumes}

}

export default DashboardServices