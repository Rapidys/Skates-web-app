import React from 'react';
import MenuModal from "../../../components/Modals/MenuModal";
import {faQrcode, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth} from "../../../context/authContext";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const {handleLogout} = useAuth()

    const navigate = useNavigate()

    const items = [
        {id:2,title:'პროფილი',onClick:() => navigate('/profile'),icon:<FontAwesomeIcon icon={faUser} className={'hover:text-opacity-100'} />},
        {id:1,title:'გასვლა',onClick:handleLogout,icon:<FontAwesomeIcon icon={faSignOutAlt} />},
    ]

    return (
        <div className={'w-full h-20 border-b-2 border-b-custom_dark '}>
            <div className={"flex justify-between items-center h-full px-4"}>
                <div className={'text-custom_ocean'}>
                    <FontAwesomeIcon icon={faQrcode} className={'cursor-pointer text-3xl'}/>
                </div>
                <div>
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