import React, {FC, useEffect, useState} from 'react';
import {Transition} from "@headlessui/react";


interface ICard {
    children: React.ReactNode,
    className?: string,
    slide?: boolean
}

const Card: FC<ICard> = ({children, slide = false, className}) => {

    const [ show,setShow ] = useState(slide ? slide : false)

    useEffect(() => {
        setShow(true)
    },[])

    return (
        <div
            className={`shadow-sm w-full shadow-custom_button border-b-2 border-b-custom_light p-8 rounded-lg ${className}`}>
            <Transition
                className="h-full"
                show={show}
                enter="transition-all ease-in-out duration-500 delay-[200ms]"
                enterFrom="opacity-0 scale-50"
                enterTo="opacity-100 scale-100"
                leave="transition-all ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className={'w-full h-full '}>
                    {children}
                </div>

            </Transition>
        </div>
    );
};

export default Card;

