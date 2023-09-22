import React from "react";


export interface IRoute {
    id:number,
    name:string,
    path:string,
    layout:React.ComponentType<any>,
    component: React.ComponentType<any>; // Use React.ComponentType<any> for any kind of component
    isAdmin?:boolean,
    isPrivate?:isPrivate,
}