// {id:1,sectionName:'ბოლო დამატებული პროდუქტები',trainerName:'გენადი',description:'ფიზიკური მომზადება სასწავლად , პრაქტიკები კვირაში 2 გაკვეთილი...',price:'150',time:'1'},



export interface IData {
   sectionName:string,
   data:IServiceData[]
}

export interface IServiceData {
   id:number,
   serviceName?:string,
   description:string,
   price:string,
   time:string,
   img:string,
   title:string,
   serviceType:number,
   trainerName?:string,
}