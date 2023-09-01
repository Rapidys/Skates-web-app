import React from 'react';
import MenuModal from "../../components/Modals/MenuModal";
import {faQrcode, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Header = () => {

    const items = [
        {id:1,title:'გასვლა',onClick:() => console.log('logout')}
    ]

    return (
        <div className={'w-full h-20 border-b-2 border-b-custom_dark'}>
            <div className={"flex justify-between items-center h-full px-4"}>
                <div className={'text-custom_ocean'}>
                    <FontAwesomeIcon icon={faQrcode} className={'cursor-pointer text-3xl'}/>
                </div>
                <div>
                    <MenuModal items={items}>
                        <div className={'w-10 h-10 rounded-full bg-custom_light cursor-pointer flex items-center justify-center'}>
                            <FontAwesomeIcon icon={faUser} className = {'text-custom_loading'}/>
                        </div>
                    </MenuModal>
                </div>
            </div>

        </div>
    );
};

export default Header;