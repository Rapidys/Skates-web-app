// {id:1,sectionName:'ბოლო დამატებული პროდუქტები',trainerName:'გენადი',description:'ფიზიკური მომზადება სასწავლად , პრაქტიკები კვირაში 2 გაკვეთილი...',price:'150',time:'1'},


export interface IServices {
   "id": number,
   "displayName": string,
   "needTrainer": boolean,
   "quantity": number,
   "price": number
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
