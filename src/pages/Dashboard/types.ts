export interface IServiceItem {
    "id": number,
    "displayName": string,
    "needTrainer": boolean,
    "isInstant": boolean,
    "price": number,
    "isActive": boolean,
    "serviceQuantity"?:number,
}