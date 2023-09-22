import Login from "../pages/onBoarding/Login";
import {IRoute} from "./types";
import Admin from "../pages/Admin";
import FindAccount from "../pages/onBoarding/FindAccount";
import CreateAccount from "../pages/onBoarding/CreateAccount";
import OnBoardingLayout from "../layout/onBoarding";
import Dashboard from "../pages/Dashboard";
import Layout from "../layout/dashboard";
import Profile from "../pages/Profile";
import ChooseUser from "../pages/onBoarding/ChooseUser";
import AdminLayout from "../layout/admin/index";


export const PublicRoutes: IRoute[] = [
    {id:1,name:'login',path:'/login',component:Login,layout:OnBoardingLayout},
]

export const PrivateRoutes : IRoute[] = [
    {id:2,name:'findAccount', path:'/findAccount',component:FindAccount,layout:OnBoardingLayout},
    {id:3,name:'createAccount', path:'/createAccount',component:CreateAccount,layout:OnBoardingLayout},
    {id:4,name:'chooseUser', path:'/chooseUser',component:ChooseUser,layout:OnBoardingLayout},
    {id:5,name:'dashboard', path:'/dashboard',component:Dashboard,layout:Layout},
    {id:6,name:'profile', path:'/profile',component:Profile,layout:Layout},
    {id:7,name:'admin', path:'/admin',component:Admin,layout:AdminLayout},
]

