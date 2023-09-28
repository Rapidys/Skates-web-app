import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useLocation} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {useServices} from "../../context/Services/ServiceContextProvider";
import jwt_decode from "jwt-decode";
import {Tooltip} from "flowbite-react";


interface IOnBoarding {
    children: React.ReactNode
}

const OnBoardingLayout: FC<IOnBoarding> = ({children}) => {

    const {handleLogout} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const {isAdmin} = useAuth()

    const {displayName} = useAuth()



    return (
        <div className={'w-screen h-screen bg-custom_dark flex justify-center items-center'}>
            {location.pathname === '/findAccount' && (
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
            {isAdmin && location.pathname.includes('/findAccount') && (
                <div className={'absolute top-5 right-5'} >
                    <div className={'flex items-center'}>
                        <div className={'text-white mr-4'}>
                            {displayName}
                        </div>
                        <div onClick={() => navigate('/admin')}>
                            <Tooltip content="ადმინისტრირება"
                                     placement="bottom"

                            >
                                <FontAwesomeIcon icon={faUserEdit}
                                                 className={'text-2xl cursor-pointer text-white hover:text-opacity-100 hover:text-custom_loading'}/>
                            </Tooltip>
                        </div>

                    </div>

                </div>

            )}
            {children}
        </div>
    );
};

export default OnBoardingLayout;