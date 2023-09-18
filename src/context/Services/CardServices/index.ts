import {MyAxios} from "../ServiceContextProvider";
import {AxiosResponse} from "axios";

export interface IUpdateCardInfo {
    ClientId:number,
    CardNumber:string,
    FirstName:string,
    LastName:string,
    BrithDate:Date | number,
    Mobile:string
}

export interface ICardServices {
    getClientInfo: (body: Record<'ClientId',number>) => Promise<AxiosResponse>;
    updateCardInfo:(body:IUpdateCardInfo) => Promise<AxiosResponse>,
    getCardInfo:(body:Record<'Identifier',string>) => Promise<AxiosResponse>,
}

const CardServices = (axios: MyAxios):ICardServices => {

    const getCardInfo = (body: Record<'Identifier',string>) : Promise<AxiosResponse> => {
        return axios.post('/Card/GetCardInfo', body)
    }

    const getClientInfo = (body: Record<'ClientId',number>): Promise<AxiosResponse> => {
        return axios.post('/card/GetClientInfo', body)
    }
    const updateCardInfo = (body:IUpdateCardInfo): Promise<AxiosResponse> => {
        return axios.post('/card/UpdateCard', body)
    }

    return {getClientInfo,updateCardInfo,getCardInfo}

}

export default CardServices