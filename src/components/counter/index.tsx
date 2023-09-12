import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleDown, faArrowAltCircleUp} from "@fortawesome/free-solid-svg-icons";

interface ICounter {
    counter:number,
    onChange:(num:number) => void
}
const Counter:FC<ICounter> = ({counter,onChange}) => {
    return (
        <div className={'flex items-center'}>
            <div className={'text-lg font-bold mr-2'}>
                    {counter}
            </div>
            <div>
                <div onClick={() => onChange(counter + 1)} className={'cursor-pointer hover:text-custom_light'}>
                    <FontAwesomeIcon icon={faArrowAltCircleUp} />
                </div>
                <div onClick={() => onChange(counter - 1)} className={'cursor-pointer hover:text-custom_light'}>
                    <FontAwesomeIcon icon={faArrowAltCircleDown} />
                </div>
            </div>
        </div>
    );
};

export default Counter;