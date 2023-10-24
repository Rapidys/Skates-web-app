import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faHome,
    faIdCard,
    faSignOutAlt,
    faUser,
    faUserEdit,
    faUserSecret
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useLocation} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {useServices} from "../../context/Services/ServiceContextProvider";
import jwt_decode from "jwt-decode";
import {Dropdown, Tooltip} from "flowbite-react";
import {INavItem} from "../../components/NavMenu/types";
import NavMenu from "../../components/NavMenu";
import MenuModal from "../../components/Modals/MenuModal";
import MyDropDown from "../../components/dropdown";


interface IOnBoarding {
    children: React.ReactNode
}

const OnBoardingLayout: FC<IOnBoarding> = ({children}) => {

    const {handleLogout} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const {isAdmin} = useAuth()
    const iconColor = 'text-custom_button'

    const {displayName} = useAuth()


    const items = [
        {
            id: 3, title: 'ახალი მომხმარებლის გვერდი', onClick: () => navigate('/findAccount'), icon: <FontAwesomeIcon
                icon={faUserSecret} className={'hover:text-opacity-100'}/>
        },
        {id: 1, title: 'გასვლა', onClick: handleLogout, icon: <FontAwesomeIcon icon={faSignOutAlt}/>},
    ]

    return (
        <div className={'w-screen h-screen bg-custom_dark flex justify-center items-center'}>
            {(location.pathname === '/findAccount' || location.pathname === '/changePassword') && (
                <div
                    className={'absolute top-5 left-5 text-2xl text-white cursor-pointer hover:text-custom_loading'}
                    onClick={handleLogout}
                >
                    <Tooltip content="გასვლა"
                             placement="bottom"
                    >

                        <div className={'rotate-180 '}>
                            <FontAwesomeIcon icon={faSignOutAlt}/>
                        </div>
                    </Tooltip>

                </div>

            )}
            {(location.pathname.includes('/findAccount') || location.pathname.includes('/changePassword')) && (
                <div className={'absolute top-5 right-5'}>
                    <div>
                        <MyDropDown
                            label=""
                            renderTrigger={() => (
                                <div className={'flex items-center cursor-pointer'}>
                                    <div className={'text-white mr-4'}>
                                        {displayName}
                                    </div>
                                    <span>
                                <FontAwesomeIcon icon={faUser}
                                                 className={'text-2xl cursor-pointer text-white hover:text-opacity-100 hover:text-custom_loading'}/>
                            </span>
                                </div>
                            )}
                            items = {[
                                {id:1,icon:faUserEdit,label:'ადმინისტრირება',forAdmin:true,action:() => navigate('/admin/orders')},
                                {id:2,icon:faEdit,label:'პაროლის შეცვლა',forAdmin:false,action:() => navigate('/changePassword')},
                                {id:3,icon:faUserSecret,label:'ახალი მომხმარებლის გვერდი',forAdmin:false,action:() => navigate('/findAccount')},
                            ]}
                        />
                    </div>
                </div>
            )}
            {children}
        </div>
    );
};

export default OnBoardingLayout;