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
   trainers:ITrainers,
   services:IServices[],
   paymentTypes:IPaymentTypes,
}


export interface IHeadData {
   id: number,
   head?: string,
   checked?:boolean
}

export interface ServiceData {
   id?: number,
   serviceValue?: string,
   trainer?: string,
   price?: string,
   active?: string,
   checked?: boolean,
   count?:number,
}

