import {ITableHead} from "../index";

export interface IAdminReferenceOptions {
    services: { head: ITableHead[], row: IService[] }
    paymentTypes: { head: ITableHead[], row: IPaymentTypes[] }
    users: { head: ITableHead[], row: IUsers[] }
    trainers: { head: ITableHead[], row: IPaymentTypes[] }
}


export interface IUsers {
    "id": number,
    "displayName": string,
    "username": string,
    "isAdmin": boolean,
    "isActive": boolean,
    "password"?: string,
}

export interface IPaymentTypes {
    "id": number,
    "displayName": string,
    "isActive": boolean
}

export interface IService {
    "id": number,
    "displayName": string,
    "needTrainer": boolean,
    "isInstant": boolean,
    "price": number,
    "serviceQuantity": number,
    "isActive": boolean
}



