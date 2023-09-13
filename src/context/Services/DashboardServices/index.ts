import {IConsumeOrder} from "../../../types/Dashboard";

export interface IDashboardServices {
    getServices: () => Promise<any>,
    getPaymentTypes: () => Promise<any>,
    getTrainers: () => Promise<any>,
    makeOrder: (data:any) => Promise<any>,
    getClientOrders: (clientId:number) => Promise<any>,
    consumeOrder: (data:IConsumeOrder) => Promise<any>,
    updateOrder: (data:any) => Promise<any>,
}


const DashboardServices = (axios: any): IDashboardServices => {

    const getServices = () => {
        return axios.get('/Reference/GetServices')
    }
    const getPaymentTypes = () => {
        return axios.get('/Reference/GetPaymentTypes')
    }
    const getTrainers = () => {
        return axios.get('/Reference/GetTrainers')
    }
    const makeOrder = (data:any) => {
        return axios.post('/Orders/MakeOrder',data)
    }
    const getClientOrders = (clientId:number) => {
        return axios.post('/Orders/GetClientOrders', {ClientId:clientId,OnlyActive:true})
    }
    const consumeOrder = (data:IConsumeOrder) => {
        return axios.post('/Orders/ConsumeOrder', data)
    }

    const updateOrder = (data:any) => {
        return axios.post('/Orders/UpdateClientOrder', data)
    }

    return {getServices,getPaymentTypes,getTrainers,makeOrder,getClientOrders,consumeOrder,updateOrder}

}

export default DashboardServices