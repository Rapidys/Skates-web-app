export interface IOrderPayload {
        "StartDate": string,
        "EndDate": string,
        "ServiceId": number | null,
        "UserId": number | null,
        "ClientIdentifier":string,
        "PageSize": number,
        "PageNumber": number
}



export interface IOrder{
    "dateCreated":string,
    "startDate":string,
    "endDate": string,
    "quantity": number,
    "usedQuantity": number,
    "trainer": string,
    "clientName":string,
    "serviceName": string,
    "operatorName": string,
    "price":number,
    "discount": number
}

export interface IState {
    dateCreated:string,
    startDate:string,
    endDate:string,
    clientIdentifier:string | null,
}

export interface IOptions {
    id:number,
    label:string,
    value:string,
}
export interface IPageInfo {
    totalCount:number,
    pageNumber:number,
    pageSize:IOptions,
}
