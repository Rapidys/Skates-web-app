import React, {FC} from 'react';
import {ServiceData} from "../../../types/Dashboard";

interface IServiceDetails {
    data: ServiceData
}

const ServiceDetails: FC<IServiceDetails> = ({data}) => {
    return (
        <div className={'w-full px-2 text-custom_ocean'}>
            <Item text={data?.displayName} title = {'სერვისის სახელი'}/>
            <Item text={data?.quantity} title = {'რაოდენობა'}/>
            <Item text={data?.trainer} title = {'ტრენერი'}/>
        </div>
    );
};

interface IItem {
    text:string | number | undefined,
    title:string
}
const Item:FC<IItem> = ({text,title}) => {
    return (
        <div className={'pb-2 border-b border-b-custom_light flex items-end justify-between mt-2 rounded-lg shadow px-2'}>
            <div className={'font-bold'}>
                {title} : {' '}
            </div>
            <div className={'text-sm'}>
                {text}
            </div>
        </div>
    )
}

export default ServiceDetails;