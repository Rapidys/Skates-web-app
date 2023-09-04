import React, {FC, MouseEvent, RefObject, useCallback, useRef, useState} from 'react';
import useOnClickOtside from "../../../utils/hooks/useOnClickOtside";
import {JSXElement} from "@swc/core";
import {IItems} from "./types";


interface IMenuModal {
    children: React.ReactNode,
    items: IItems[];
}

const MenuModal: FC<IMenuModal> = ({children,items}) => {


    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)


    useOnClickOtside(ref, () => {
        setOpen(false)
    })
    const handleOpen = (e: MouseEvent<HTMLDivElement>) => {
        setOpen(true)
    }


    return (
        <>
            <div
                onClick={handleOpen}
                className={'relative'}
            >
                {children}
            </div>
            {
                open && (
                    <div className={`absolute p-2 rounded-lg top-110 text-white right-5 ${open ? 'opacity-1' : 'opacity-0 h-0'} transition  bg-custom_dark`}
                         ref={ref}
                         style = {{zIndex:999999}}
                    >
                        <div>
                            {items.map((menuItem) => {
                                return (
                                    <div onClick={(e) => {
                                        menuItem.onClick(e)
                                        setOpen(false)
                                    }} className={'cursor-pointer px-2 flex py-2 items-center'}>
                                        <div className={'mr-2'}>
                                            {menuItem.icon}
                                        </div>
                                        <div className = {'text-sm'}>
                                            {menuItem.title}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            }

        </>
    );
};

export default MenuModal;