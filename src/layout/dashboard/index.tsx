import React, {FC} from 'react';
import Header from "./header";
import NavMenu from "../../components/NavMenu";
import {INavItem} from "../../components/NavMenu/types";
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
        {id:1,title:'ადმინი',path:'/admin',icon:<FontAwesomeIcon icon={faIdCard} className={iconColor}/>},
    ]


    return (
        <div className = {'h-full'}>
            <div className = {'w-full h-full flex'}>
                <div className={`flex ${isTabletOrMobile ? 'w-0' : 'w-1/12'}`}>
                    <div className={`${isTabletOrMobile ? 'w-0' : 'w-1/12'} bg-custom_dark`}>
                        <div className={`${isTabletOrMobile ? 'w-0' : 'w-1/12' } bg-custom_dark fixed top-0 bottom-0 left-0 flex-row z-20`}>
                            <div className={'h-20 bg-custom_dark border-b-2 border-b-custom_light text-italic text-custom_ocean flex items-center justify-center text-xl transition'}>
                                <div className={'text-custom_light text-center'}>
                                    ვლადიმერ დოლიძე
                                </div>
                            </div>
                            <div className = {'py-8 px-1'}>
                                <NavMenu data={MenuItems} />
                            </div>
                        </div>
                    </div>
                </div>


                <div className={`${isTabletOrMobile ? 'w-full' : 'w-11/12'}`}>
                    <Header />
                    {children}
                </div>

            </div>

        </div>
    );
};

export default Layout;