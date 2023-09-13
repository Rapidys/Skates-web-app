import React from 'react';
import MenuModal from "../../../components/Modals/MenuModal";
import {faDashboard, faHome, faQrcode, faSignOutAlt, faUser, faUserSecret} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useAccount} from "../../../context/AccountContext";

const Header = () => {
    const {handleLogout} = useAuth()

    const navigate = useNavigate()

    const {DisplayName} = useAccount()

    const items = [
        {id:2,title:'პროფილი',onClick:() => navigate('/profile'),icon:<FontAwesomeIcon icon={faUser} className={'hover:text-opacity-100'} />},
        {id:3,title:'მთავარი გვერდი',onClick:() => navigate('/dashboard'),icon:<FontAwesomeIcon icon={faHome} className={'hover:text-opacity-100'} />},
        {id:3,title:'ახალი მომხმარებლის გვერდი',onClick:() => navigate('/findAccount'),icon:<FontAwesomeIcon icon={faUserSecret} className={'hover:text-opacity-100'} />},
        {id:1,title:'გასვლა',onClick:handleLogout,icon:<FontAwesomeIcon icon={faSignOutAlt} />},
    ]

    return (
        <div className={'w-full h-20 border-b-2 border-b-custom_dark '}>
            <div className={"flex justify-between items-center h-full px-4"}>
                <div className={'text-custom_ocean'}>
                    <FontAwesomeIcon icon={faQrcode} className={'cursor-pointer text-3xl'}/>
                </div>
                <div className={'flex items-center'}>
                    <div className={'mr-2'}>
                        {DisplayName}
                    </div>
                    <MenuModal items={items}>
                        <div className={'w-10 h-10 rounded-full bg-custom_dark cursor-pointer flex items-center justify-center'}>
                            <FontAwesomeIcon icon={faUser} className = {'text-custom_secondary'}/>
                        </div>
                    </MenuModal>
                </div>
            </div>

        </div>
    );
};

export default Header;