import {MouseEvent} from "react";

export interface IItems {
    id:number,
    title:string,
    onClick:(e:MouseEvent) => void,
    icon:any
}