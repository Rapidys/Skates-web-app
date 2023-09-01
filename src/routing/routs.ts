import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import {IRoute} from "./types";
import MyServices from "../pages/MyServices";
import Admin from "../pages/Admin";


export const PublicRoutes: IRoute[] = [
    {id:1,name:'login',path:'/login',component:Login},
]

export const PrivateRoutes : IRoute[] = [
    {id:1,name:'dashboard', path:'/dashboard',component:Dashboard},
    {id:1,name:'my_services', path:'/MyServices',component:MyServices},
]

export const AdminRoutes : IRoute[] = [
    {id:1,name:'admin', path:'/admin',component:Admin},
]