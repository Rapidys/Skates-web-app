import React, {FC} from 'react';
import {INavItem} from "../../components/NavMenu/types";
import {faMoneyBill1Wave, faNetworkWired, faPeopleGroup, faUserFriends} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import NavMenu from "../../components/NavMenu";
import Header from "../dashboard/header";


interface ILayout {
    children:React.ReactNode,
}
const AdminLayout:FC<ILayout> = ({children}) => {

    const iconColor = 'text-white'
     const MenuItems:INavItem[] = [
        {id:1,title:'მთავარი',path:'/admin/orders',icon:<FontAwesomeIcon icon={faMoneyBill1Wave} className={iconColor}/>},
        {id:3,title:'კლიენტები',path:'/admin/clients',icon:<FontAwesomeIcon icon={faUserFriends} className={iconColor}/>},
         {id:5,title:'ჯგუფები' , path: '/admin/groups',icon:<FontAwesomeIcon icon={faPeopleGroup} className={iconColor} />,},
        {id:2,title:'ადმინისტრირება' , path: '/admin/referenceManage',icon:<FontAwesomeIcon icon={faNetworkWired} className={iconColor} />,},
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