export interface IUpdateCardInfo {
    ClientId:number,
    CardNumber:string,
    FirstName:string,
    LastName:string,
    BrithDate:Date | number,
    Mobile:string
}

export interface ICardServices {
    getClientInfo: (body: Record<'ClientId',number>) => Promise<any>;
    updateCardInfo:(body:IUpdateCardInfo) => Promise<any>,
    getCardInfo:(body:Record<'Identifier',string>) => Promise<any>,
}

const CardServices = (axios: any):ICardServices => {

    const getCardInfo = (body: Record<'Identifier',string>) => {
        return axios.post('/Card/GetCardInfo', body)
    }

    const getClientInfo = (body: Record<'ClientId',number>) => {
        return axios.post('/card/GetClientInfo', body)
    }
    const updateCardInfo = (body:IUpdateCardInfo) => {
        return axios.post('/card/UpdateCard', body)
    }

    return {getClientInfo,updateCardInfo,getCardInfo}

}

export default CardServices