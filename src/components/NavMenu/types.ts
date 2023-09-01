export interface INavItem {
    id:number,
    title:string,
    path?:string,
    children?:INavItem[],
    isOpen?:boolean,
    icon?:any,
}



// {id:2,title:'მთავარი' , path: '/dashboard'},
// {id:1,title:'ჩემი სერვისები',path:'/services'},
// {id:3,title:'სერვისები' , children : [
//     {id:31,title:'აქსესუარები' , path:'/accessories'},
//     {id:32,title:'ტრენერები', path:'/trainers'},
//     {id:33,title:'აბონიმენტები' , path:'/subscription'},
// ]},
// {id:4,title:'ისტორია'},