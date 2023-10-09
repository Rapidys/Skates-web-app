import { AxiosResponse , AxiosInstance } from "axios";
import {IPaymentTypes, IService} from "../../../types/admin";
import {IUsers} from "../../../types/auth";
import {ITrainers} from "../../../types";
import {IOrderPayload} from "../../../pages/Admin/orders/types";
import {IClientsPayload} from "../../../pages/Admin/clients/types";

export interface IAdminServices {
    getUsers: () => Promise<AxiosResponse>,
    updateUsers: (data:IUsers) => Promise<AxiosResponse>,
    updateService: (data:IService) => Promise<AxiosResponse>,
    updateTrainers: (data:ITrainers) => Promise<AxiosResponse>,
    updatePaymentTypes: (data:IPaymentTypes) => Promise<AxiosResponse>,
    getOrders: (data:IOrderPayload) => Promise<AxiosResponse>,
    getClients: (data:IClientsPayload) => Promise<AxiosResponse>,
}

interface MyAxios extends AxiosInstance {}

const AdminServices = (axios: MyAxios): IAdminServices => {

    const getUsers = (): Promise<AxiosResponse<IUsers[]>> =>  {
        return axios.get<IUsers[]>('/user/getUsers')
    }
    const updateUsers = (data:IUsers) : Promise<AxiosResponse> => {
        return axios.post('/user/UpdateUser',data)
    }

    const updateService = (data:IService): Promise<AxiosResponse> => {
        return axios.post('/reference/UpdateService',data)
    }

    const updateTrainers = (data:ITrainers): Promise<AxiosResponse> => {
        return axios.post('/reference/UpdateReference/Trainer',data)
    }
    const updatePaymentTypes = (data:IPaymentTypes): Promise<AxiosResponse> => {
        return axios.post('/reference/UpdateReference/PaymentType',data)
    }

    const getOrders = (data:IOrderPayload): Promise<AxiosResponse> => {
        return axios.post('/admin/getOrders',data)
    }
    const getClients = (data:IClientsPayload): Promise<AxiosResponse> => {
        return axios.post('/admin/GetClients',data)
    }

    return { getUsers,updateUsers,updateService,updateTrainers,updatePaymentTypes,getOrders,getClients }

}

export default AdminServices

