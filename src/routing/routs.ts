import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";


export const PublicRoutes = [
    {id:1,name:'login',route:<Login />},
]

export const PrivateRoutes = [
    {id:1,name:'dashboard',route:<Dashboard />},
]