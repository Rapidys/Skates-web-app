import React, {FC, useState} from 'react';
import {INavItem} from './types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

interface INavMenu {
    data?: INavItem[];
    level?: number; // Added level prop
    isOpened?: boolean;
}

interface MenuChildrenProps {
    item: INavItem;
    level: number; // Passed level prop
    isOpened?: boolean;
}

const NavMenu: FC<INavMenu> = ({data, level = 0, isOpened}) => {
    return (
        <div className={'cursor-pointer w-full'}>
            {data?.map((navItem, index) => (
                <MenuChildren
                    key={index}
                    item={navItem}
                    level={level} // Pass the current level
                    isOpened={isOpened}
                />
            ))}
        </div>
    );
};

const MenuChildren: FC<MenuChildrenProps> = ({item, level, isOpened}) => {
    const [isOpen, setOpen] = useState(isOpened || false);

    const navigate = useNavigate()
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' })


    const hasChildren = !!item?.children;

    const handleOpen = (url:string | undefined) => {
        if(hasChildren){
            setOpen(!isOpen);
            return
        }
        if(url){
            navigate(url)
        }
    };

    return (
        <div className={'w-full hover:border-l-4 border-l-custom_light box-border'}>
            <div
                className={`flex justify-between w-full items-center ml-4 py-1`}
                style={{marginLeft: `${level * 10}px`}} // Adjust the margin based on the level
                onClick={() => handleOpen(item.path)}
            >
                <div className={'flex items-center w-full'}>
                    <div className={`py-2 px-4`}>{item?.icon}</div>
                    {!isTabletOrMobile && (
                        <div className={`py-2 text-custom_button text-sm`}>{item?.title}</div>
                    )}
                </div>
                <div>
                    {hasChildren && !isTabletOrMobile && <FontAwesomeIcon icon={faArrowDown} className = {'text-sm text-custom_light pr-2'} /> }
                </div>
            </div>
            {hasChildren && isOpen && (
                <NavMenu data={item?.children} level={level + 1} isOpened={false}/> // Increment the level
            )}
        </div>
    );
};

export default NavMenu;
