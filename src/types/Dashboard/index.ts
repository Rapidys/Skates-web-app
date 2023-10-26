import {IPaymentTypes, ITrainers} from "../index";
import {format} from "date-fns";

export interface IServices {
    "id": 1,
    "displayName": string,
    "needTrainer": boolean,
    "isInstant": boolean,
    "quantity": number,
    "price": number,
    trainerId?: number,
    StartDate?: Date,
    EndDate?: Date,
    label?: string,
    value?: string
    trainerInfo?: string
    serviceQuantity?: number
}

export interface IOptions {
    services: IServices[],
    trainers: ITrainers[],
    paymentTypes: IPaymentTypes[],
}

export interface ISelectedValues {
    trainers: ITrainers[],
    services: IServices[],
    paymentTypes: any,
}


export interface IHeadData {
    id: number,
    head?: string,
    checked?: boolean
}

export interface ServiceData {
    orderId?: number,
    displayName?: string,
    trainer?: string,
    quantity?: string,
    usedQuantity?: string,
    startDate?: Date,
    endDate?: Date,
    checked?: boolean,
    paymentType:string,
}

export interface IConsumeOrder {
    "ClientId": number,
    "identifier": string,
    "orders": any[],
    "instantOrders": any[]
}

export interface IMakeOrder {
    ClientId: number
    Services: IServices,
    PaymentType: IPaymentTypes,
}

export interface IUpdateOrder {
   orderId:number,
   startDate:string,
   endDate:string
}

export interface ICommentData {
    Orderid:number,
    Content:string,
}