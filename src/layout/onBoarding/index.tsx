import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {useNavigate,useLocation} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";


interface IOnBoarding {
    children:React.ReactNode
}
const OnBoardingLayout:FC<IOnBoarding> = ({children}) => {

    const { handleLogout } = useAuth()
    const location = useLocation()


    return (
        <div className={'w-screen h-screen bg-custom_dark flex justify-center items-center'}>
            {location?.pathname.includes('/findAccount') && (
                <div className={'absolute top-5 left-5 text-custom_light rotate-180 cursor-pointer hover:text-custom_loading'}
                     onClick = {handleLogout}
                >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </div>
            )}
            {children}
        </div>
    );
};

export default OnBoardingLayout;