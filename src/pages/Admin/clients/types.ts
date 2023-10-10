import {IOptions} from "../orders/types";

export interface IState {
    firstName:string,
    lastName:string,
    mobile:string,
    cardNumber:string,
    identificationNumber:string,
    birthDateFrom:string,
    birthDateTo:string,
    dateCreatedFrom:string,
    dateCreatedTo:string,
    pageSize:IOptions,
    pageNumber:number,
    total:number
}

export interface IClientsPayload {
    "RegisteredFrom":string,
    "RegisteredTo": string,
    "FirstName": string,
    "LastName": string,
    "BirthDayFrom": string | null,
    "BirthDayTo": string | null,
    "CardNumber": string,
    "Mobile": string,
    "IdentificationNumber": string,
    "PageSize": number,
    "PageNumber":number
}

export interface IGroupOrders {
    "TrainerId": number,
    "OrderDateFrom": string,
    "OrderDateTo": string,
    "PageSize": number,
    "PageNumber":number
}
