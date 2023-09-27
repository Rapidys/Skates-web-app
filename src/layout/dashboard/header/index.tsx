import React, {useEffect, useState} from 'react';
import MenuModal from "../../../components/Modals/MenuModal";
import {
    faDashboard,
    faHome, faPersonCirclePlus,
    faQrcode,
    faSignOutAlt,
    faUser,
    faUserEdit, faUsersCog,
    faUserSecret
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth} from "../../../context/AuthContext";
import {useLocation, useNavigate} from "react-router-dom";
import {useAccount} from "../../../context/AccountContext";
import IceSkating from '../../../assets/skating.jpg'
import s from './animation.module.css'
import jwt_decode from "jwt-decode";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {deepCopy} from "../../../utils/helpers/deepCopy";

const Header = () => {
    const {handleLogout} = useAuth()
    const { handleClear } = useAccount()

    const location = useLocation()

    const [isMouseEntered, setMouseEntered] = useState(false)

    const navigate = useNavigate()

    const {DisplayName, Clients} = useAccount()

    const clientItems = [
        {
            id: 2, title: 'პროფილი', onClick: () => navigate('/profile'), icon: <FontAwesomeIcon icon={faUser}
                                                                                                 className={'hover:text-opacity-100'}/>
        },
        {
            id: 5, title: 'მთავარი გვერდი', onClick: () => navigate('/dashboard'), icon: <FontAwesomeIcon icon={faHome}
                                                                                                          className={'hover:text-opacity-100'}/>
        },
        {
            id: 13, title: 'ახალი მომხმარებლის გვერდი', onClick: () => {
                handleClear()
                navigate('/findAccount')
            }, icon: <FontAwesomeIcon
                icon={faUserSecret} className={'hover:text-opacity-100'}/>
        }
    ]
    const itemsForAdminRoute = [
        {
            id: 4, title: 'ადმინისტრირება', onClick: () => navigate('/admin'), icon: <FontAwesomeIcon icon={faUserEdit}
                                                                                                      className={'hover:text-opacity-100'}/>
        },
        {
            id: 3, title: 'ახალი მომხმარებლის გვერდი', onClick: () => navigate('/findAccount'), icon: <FontAwesomeIcon
                icon={faUserSecret} className={'hover:text-opacity-100'}/>
        },
        {id: 1, title: 'გასვლა', onClick: handleLogout, icon: <FontAwesomeIcon icon={faSignOutAlt}/>},
    ]

    const checkItems = location.pathname.toLowerCase().includes('admin') ? itemsForAdminRoute : clientItems


    const [items, setItems] = useState(checkItems)

    useEffect(() => {
        if (Clients?.length > 1) {
            const newItems = [...items]
            newItems.push({
                id: 3, title: 'მომხმარებლის შეცვლა', onClick: () => navigate('/chooseUser'), icon: <FontAwesomeIcon
                    icon={faUsersCog} className={'hover:text-opacity-100'}/>,
            },)
            setItems(newItems)
        }
    }, [Clients]);

    const handleMouseEnter = () => {
        setMouseEntered(true)
    }

    const handleMouseleave = () => {
        setMouseEntered(false)
    }


    return (
        <div className={'w-full h-20 border-b-2 shadow-lg'} onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseleave}>
            <div className={"flex justify-between items-center h-full px-4"}>
                <div className={'text-custom_ocean'}>
                    <img src={IceSkating} alt="#" width={40} height={40}/>
                </div>
                <div className={'flex items-center'}>
                    <div className={'mr-2'}>
                        {DisplayName}
                    </div>

                    <MenuModal items={items}>
                        <div
                            className={'w-10 h-10 rounded-full bg-custom_dark cursor-pointer flex items-center justify-center'}>
                            <FontAwesomeIcon icon={faUser} className={`text-white`}/>
                        </div>
                    </MenuModal>

                </div>
            </div>

        </div>
    );
};

export default Header;