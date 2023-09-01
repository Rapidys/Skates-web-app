import React, {FC} from 'react';
import Header from "./header";
import NavMenu from "../components/NavMenu";
import {INavItem} from "../components/NavMenu/types";
import {faHistory, faHome, faIdCard, faShoppingCart, faStore} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useMediaQuery} from "react-responsive";


interface ILayout {
    children:React.ReactNode,
}
const Layout:FC<ILayout> = ({children}) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' })

    const iconColor = 'text-custom_button'

    const MenuItems:INavItem[] = [
        {id:2,title:'მთავარი' , path: '/dashboard',icon:<FontAwesomeIcon icon={faHome} className={iconColor} />,},
        {id:1,title:'ჩემი სერვისები',path:'/myServices',icon:<FontAwesomeIcon icon={faIdCard} className={iconColor}/>},
        {id:3,title:'სერვისები' , icon:<FontAwesomeIcon icon={faStore} className={iconColor}/>,children : [
                {id:31,title:'აქსესუარები' , path:'services/accessories'},
                {id:32,title:'ტრენერები', path:'services/trainers'},
                {id:33,title:'აბონიმენტები' , path:'services/subscription'},
         ]},
        {id:4,title:'ისტორია',path:'/history',icon:<FontAwesomeIcon icon={faHistory} className={iconColor}/>},
    ]


    return (
        <div>
            <div className = {'w-full flex'}>
                <div className={`flex ${isTabletOrMobile ? 'w-0' : 'w-1/5'}`}>
                    <div className={`${isTabletOrMobile ? 'w-0' : 'w-1/5'} bg-custom_dark`}>
                        <div className={`${isTabletOrMobile ? 'w-0' : 'w-1/5' } bg-custom_dark fixed top-0 bottom-0 left-0 flex-row`}>
                            <div className={'h-20 bg-custom_dark border-b-2 border-b-custom_light text-italic text-custom_ocean flex items-center justify-center text-xl transition'}>
                                <div>
                                    Finder
                                </div>
                            </div>
                            <div className = {'py-8 px-1'}>
                                <NavMenu data={MenuItems} />
                            </div>
                        </div>
                    </div>
                </div>


                <div className={`${isTabletOrMobile ? 'w-full' : 'w-4/5'}`}>
                    <Header />
                    {children}
                </div>

            </div>

        </div>
    );
};

export default Layout;