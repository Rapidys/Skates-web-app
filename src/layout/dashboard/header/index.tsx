import React, {FC, useEffect, useState} from 'react';
import {
    faBars,
    faHome,
    faSignOutAlt,
    faUser,
    faUsersCog,
    faUserSecret,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth} from "../../../context/AuthContext";
import {useLocation, useNavigate} from "react-router-dom";
import {useAccount} from "../../../context/AccountContext";
import IceSkating from '../../../assets/skating.jpg'
import NavMenu from "../../../components/NavMenu";
import MyDropDown from "../../../components/dropdown";
import s from './animation.module.css'

interface IHeader {
    MenuItems:any,
}
const Header:FC<IHeader> = ({MenuItems}) => {
    const {handleLogout} = useAuth()
    const {handleClear} = useAccount()

    const location = useLocation()

    //employee user
    const {displayName} = useAuth()

    const [isMouseEntered, setMouseEntered] = useState(false)
    const [jump,setJump] = useState(0)

    const [isOpenBurger,setIsOpenBurger] = useState(false)
    const navigate = useNavigate()

    // client user
    const {DisplayName, Clients} = useAccount()

    const clientItems = [
        {
            id: 2, label: 'პროფილი', action: () => navigate('/profile'), icon:faUser
        },
        {
            id: 5, label: 'მთავარი გვერდი', action: () => navigate('/dashboard'), icon: faHome
        },
        {
            id: 13, label: 'ახალი მომხმარებლის გვერდი', action: () => {
                handleClear()
                navigate('/findAccount')
            }, icon:faUserSecret
        }
    ]
    const itemsForAdminRoute = [
        {
            id: 3, label: 'ახალი მომხმარებლის გვერდი', action: () => navigate('/findAccount'), icon: faUserSecret
        },
        {id: 1, label: 'გასვლა', action: handleLogout, icon: faSignOutAlt},
    ]

    const checkItems = location.pathname.toLowerCase().includes('admin') ? itemsForAdminRoute : clientItems


    const [items, setItems] = useState<any[]>(checkItems)

    useEffect(() => {
        if (Clients?.length > 1) {
            const newItems = [...items]
            newItems.push({
                id: 3, label: 'მომხმარებლის შეცვლა', action: () => navigate('/chooseUser'), icon: <FontAwesomeIcon
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

    const handleJump = () => {
        setJump(1)
    }


    return (
        <div className={'w-full h-20 border-b-2 shadow-lg'} onMouseEnter={handleMouseEnter}
             onClick = {handleJump}
             onMouseLeave={handleMouseleave}>
            <div className={"flex justify-between items-center h-full px-4"}>
                {
                    location.pathname.includes('admin') && (
                        <div className={'block md:hidden'} onClick={() => setIsOpenBurger(true)}>
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                    )
                }
                <div className={'flex items-center'}>
                    <div className={`${isOpenBurger ? 'fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-30' : ''}`}
                         onClick={() => setIsOpenBurger(false)}
                    />
                    <div className={`${isOpenBurger ? 'fixed left-0 top-0 bottom-0 z-40 transition-all w-2/3 bg-custom_dark' : 'w-0'}`}>
                        <div className={'text-white px-5 py-5 text-xl'} onClick={() => setIsOpenBurger(false)}>
                            <FontAwesomeIcon icon={faXmark} className={'cursor-pointer'}/>

                            {isOpenBurger && (
                                <div className={'h-14 bg-custom_dark border-b border-b-white text-italic text-custom_ocean flex items-center  text-xl transition'}>
                                    <div className={'font-mono text-gray-300 tracking-widest px-6 text-3xl'}>
                                        Arena
                                    </div>
                                </div>
                            )}

                            <div className = {'py-8 px-1'}>
                                <NavMenu data={MenuItems} isBurgerMenu = {isOpenBurger}/>
                            </div>
                        </div>
                    </div>
                    {!location.pathname.includes('admin') && (
                        <div className={isMouseEntered ? s.animationIceSkating : ''}>
                            <img src={IceSkating} alt="#" width={40} height={40}/>
                        </div>
                    )}
                </div>


                <div className={'flex items-center'}>
                    <div className={'mr-2'}>
                        {location.pathname.includes('admin')
                            ? displayName
                            : DisplayName
                        }
                    </div>

                    <MyDropDown
                        label=""
                        renderTrigger={() => (
                            <div className={'flex items-center cursor-pointer'}>
                                <div
                                    className={'w-10 h-10 rounded-full bg-custom_dark cursor-pointer flex items-center justify-center'}>
                                    <FontAwesomeIcon icon={faUser} className={`text-white`}/>
                                </div>
                            </div>
                        )}
                        items = {items}
                    />
                </div>
            </div>

        </div>
    );
};

export default Header;