import Login from "../pages/onBoarding/Login";
import {IRoute} from "./types";
import Admin from "../pages/Admin";
import FindAccount from "../pages/onBoarding/FindAccount";
import CreateAccount from "../pages/onBoarding/CreateAccount";
import OnBoardingLayout from "../layout/onBoarding";
import Dashboard from "../pages/Dashboard";
import Layout from "../layout/dashboard";
import Profile from "../pages/Profile";


export const PublicRoutes: IRoute[] = [
    {id:1,name:'login',path:'/login',component:Login,layout:OnBoardingLayout},
]

export const PrivateRoutes : IRoute[] = [
    {id:1,name:'findAccount', path:'/findAccount',component:FindAccount,layout:OnBoardingLayout},
    {id:2,name:'createAccount', path:'/createAccount',component:CreateAccount,layout:OnBoardingLayout},
    {id:3,name:'dashboard', path:'/dashboard',component:Dashboard,layout:Layout},
    {id:3,name:'dashboard', path:'/profile',component:Profile,layout:Layout},
    {id:3,name:'dashboard', path:'/admin',component:Admin,layout:Layout},
]

// export const AdminRoutes : IRoute[] = [
//     {id:1,name:'admin', path:'/admin',component:Admin},
// ]