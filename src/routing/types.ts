import React from "react";


export interface IRoute {
    id:number,
    name:string,
    path:string,
    component: React.ComponentType<any>; // Use React.ComponentType<any> for any kind of component
}