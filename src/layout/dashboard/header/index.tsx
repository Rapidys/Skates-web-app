import React, {useState} from 'react';
import MenuModal from "../../../components/Modals/MenuModal";
import {faDashboard, faHome, faQrcode, faSignOutAlt, faUser, faUserSecret} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useAccount} from "../../../context/AccountContext";
import IceSkating from '../../../assets/skating.jpg'
import s from './animation.module.css'
const Header = () => {
    const {handleLogout} = useAuth()

    const [isMouseEntered,setMouseEntered] = useState(false)

    const navigate = useNavigate()

    const {DisplayName} = useAccount()

    const items = [
        {id:2,title:'პროფილი',onClick:() => navigate('/profile'),icon:<FontAwesomeIcon icon={faUser} className={'hover:text-opacity-100'} />},
        {id:3,title:'მთავარი გვერდი',onClick:() => navigate('/dashboard'),icon:<FontAwesomeIcon icon={faHome} className={'hover:text-opacity-100'} />},
        {id:3,title:'ახალი მომხმარებლის გვერდი',onClick:() => navigate('/findAccount'),icon:<FontAwesomeIcon icon={faUserSecret} className={'hover:text-opacity-100'} />},
        {id:1,title:'გასვლა',onClick:handleLogout,icon:<FontAwesomeIcon icon={faSignOutAlt} />},
    ]


    const handleMouseEnter = () => {
        setMouseEntered(true)
    }

    const handleMouseleave = () => {
        setMouseEntered(false)
    }

    return (
        <div className={'w-full h-20 border-b-2 border-b-custom_dark '} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseleave}>
            <div className={"flex justify-between items-center h-full px-4"}>
                <div className={'text-custom_ocean'}>
                    <img src={IceSkating} alt="#" width={40} height = {40} />
                </div>

                <div className={'cursor-pointer text-custom_dark hover:text-custom_light'}
                  onClick={() => navigate('/findAccount')}
                >
                    <FontAwesomeIcon icon={faUserSecret} className = {`mr-2`}/>
                    <span>
                        ახალი მომხმარებლის გვერდი
                    </span>
                </div>
                <div className={'flex items-center'}>
                    <div className={'mr-2'}>
                        {DisplayName}
                    </div>
                    <MenuModal items={items}>
                        <div className={'w-10 h-10 rounded-full bg-custom_dark cursor-pointer flex items-center justify-center'}>
                            <FontAwesomeIcon icon={faUser} className = {`text-custom_secondary`}/>
                        </div>
                    </MenuModal>
                </div>
            </div>

        </div>
    );
};

export default Header;