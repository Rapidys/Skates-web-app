import React, {FC} from 'react';
import {Dropdown} from "flowbite-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth} from "../../context/AuthContext";


interface IDropdown {
    items: any[],
    label: string,
    renderTrigger: any
}

const MyDropDown: FC<IDropdown> = ({items, label, renderTrigger, ...props}) => {
    const {isAdmin} = useAuth()



    return (
        <Dropdown label={label} className={'bg-gray-900 border-gray-700'} renderTrigger={renderTrigger} {...props}>
            {items.map(element => {
                if (element?.forAdmin && !isAdmin) {
                    return
                }
                return <Dropdown.Item onClick={element.action}
                                      key = {element.id}
                                      className={'flex text-white hover:!bg-gray-800'}>
                    <div className={'mr-3'}>
                        <FontAwesomeIcon icon={element?.icon}
                                         className={'text-sm'}/>
                    </div>
                    <div className={'text-left'}>
                        {element.label}
                    </div>
                </Dropdown.Item>
            })}
        </Dropdown>
    );
};

export default MyDropDown;