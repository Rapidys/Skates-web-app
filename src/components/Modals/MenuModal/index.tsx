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
        <div className={''}>
            <div
                onClick={handleOpen}
                className={'relative'}
            >
                {children}
            </div>
            <div className={`absolute p-2 rounded-lg top-110 text-white right-5 ${open ? 'opacity-1' : 'opacity-0 h-0 w-0'} transition  bg-custom_light`}
                 ref={ref}
            >
                <div>
                    {items.map((menuItem) => {
                        return (
                            <div onClick={menuItem.onClick} className={'cursor-pointer'}>
                                {menuItem.title}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default MenuModal;