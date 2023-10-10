import {IOptions} from "../orders/types";

export interface IState {
    trainer:IOptions | null,
    OrderDateFrom:string,
    OrderDateTo:string,
    PageSize:IOptions,
    PageNumber:number,
    total:number,
}

export interface IOrder {
    "startDate": string,
    "endDate": string
}
export interface IGroupOrder {
    "displayName": string,
    "orders": IOrder[]
}