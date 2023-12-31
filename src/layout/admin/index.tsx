import React, {FC} from 'react';
import {INavItem} from "../../components/NavMenu/types";
import {faHome, faIdCard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useMediaQuery} from "react-responsive";
import {useAccount} from "../../context/AccountContext";
import NavMenu from "../../components/NavMenu";
import Header from "../dashboard/header";
import {useAuth} from "../../context/AuthContext";


interface ILayout {
    children:React.ReactNode,
}
const AdminLayout:FC<ILayout> = ({children}) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' })

    const iconColor = 'text-white'
     const MenuItems:INavItem[] = [
        {id:2,title:'ადმინისტრირება' , path: '/admin',icon:<FontAwesomeIcon icon={faHome} className={iconColor} />,},
        {id:1,title:'ლოგები',path:'/admin',icon:<FontAwesomeIcon icon={faIdCard} className={iconColor}/>},
    ]


    return (
        <div className = {'h-full'}>
            <div className = {'w-full h-full flex'}>
                <div className={`flex w-0 md:w-2/12`}>
                    <div className={`w-0 md:w-2/12 bg-custom_dark`}>
                        <div className={`w-2/12 hidden md:block bg-custom_dark fixed top-0 bottom-0 left-0 flex-row z-20`}>
                            <div className={'h-20 bg-custom_dark border-b-2 border-b-white text-italic text-custom_ocean flex items-center  text-xl transition'}>
                                <div className={'font-mono text-gray-300 tracking-widest px-6 text-3xl hidden md:block'}>
                                    Arena
                                </div>
                            </div>
                            <div className = {'py-8 px-1'}>
                                <NavMenu data={MenuItems} />
                            </div>
                        </div>
                    </div>
                </div>


                <div className={`w-full md:w-10/12`}>
                    <Header MenuItems = {MenuItems}/>
                    {children}
                </div>

            </div>

        </div>
    );
};

export default AdminLayout;