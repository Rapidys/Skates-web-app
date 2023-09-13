// {id:1,sectionName:'ბოლო დამატებული პროდუქტები',trainerName:'გენადი',description:'ფიზიკური მომზადება სასწავლად , პრაქტიკები კვირაში 2 გაკვეთილი...',price:'150',time:'1'},


export interface IServices {
   "id": 1,
   "displayName": string,
   "needTrainer": boolean,
   "isInstant": boolean,
   "quantity": number,
   "price": number,
   trainerId?:number,
   StartDate?:Date,
   EndDate?:Date,
   label?:string,
   value?:string
   trainerInfo?:string
}
export interface ITrainers {
   "id"?: number,
   "displayName"?: string
}
export interface IPaymentTypes {
   "id"?: number,
   "displayName"?: string
}

export interface IOptions  {
   services:IServices[],
   trainers:ITrainers[],
   paymentTypes:IPaymentTypes[],
}

export interface ISelectedValues {
   trainers:ITrainers[],
   services:IServices[],
   paymentTypes:any,
}


export interface IHeadData {
   id: number,
   head?: string,
   checked?:boolean
}

export interface ServiceData {
   orderId?: number,
   displayName?: string,
   trainer?: string,
   quantity?: string,
   usedQuantity?: string,
   startDate?: Date,
   endDate?:Date,
   checked?:boolean


}


export interface IConsumeOrder {
   "ClientId": number,
   "identifier":string,
   "orders":any[],
   "instantOrders": any[]
}
// {
//    "orderId": 1,
//     "displayName": "დილის საათები სრიალი",
//     "trainer": "ქეთი",
//     "quantity": 64,
//     "usedQuantity": 0,
//     "startDate": "2023-09-13T11:55:21.911",
//     "endDate": "2023-10-13T11:55:19.298"
// }