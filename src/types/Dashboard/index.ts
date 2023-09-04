// {id:1,sectionName:'ბოლო დამატებული პროდუქტები',trainerName:'გენადი',description:'ფიზიკური მომზადება სასწავლად , პრაქტიკები კვირაში 2 გაკვეთილი...',price:'150',time:'1'},




export interface headData {
   id: number,
   head?: string,
}

export interface ServiceData {
   id: number,
   serviceValue?: string,
   trainer?: string,
   price?: string,
   active?: string,
   checked?: boolean,
}
