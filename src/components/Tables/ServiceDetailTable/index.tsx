import React, {FC} from 'react';
import {ServiceData} from "../../../types/Dashboard";
import Select from "react-select";
import {IOptions} from "../../../pages/Admin/orders/types";

interface IServiceDetails {
    data: ServiceData,
    trainers: IOptions[],
    value: any,
    handleChangeTrainer: (option: IOptions) => void
}

const ServiceDetails: FC<IServiceDetails> = ({data, trainers, value, handleChangeTrainer}) => {
    return (
        <div className={'w-full px-2 text-custom_ocean'}>
            <Item text={data?.displayName} title={'სერვისის სახელი'}/>
            <Item text={data?.quantity} title={'რაოდენობა'}/>
            <Item
                text={data?.trainer}
                title={'ტრენერი'}
                withEditMode={true}
                options={trainers}
                value={value}
                handleChange={handleChangeTrainer}/>
        </div>
    );
};

interface IItem {
    text: string | number | undefined,
    title: string,
    withEditMode?: boolean,
    options?: IOptions[],
    handleChange?: (option: IOptions) => void,
    value?: IOptions,
}

const Item: FC<IItem> = ({text, title, withEditMode, options, value,handleChange}) => {
    return (
        <div
            className={'pb-2 border-b border-b-custom_light flex items-end justify-between mt-2 rounded-lg shadow px-2'}>
            <div className={'font-bold'}>
                {title} : {' '}
            </div>
            <div className={'text-sm'}>
                {!withEditMode ? (
                    <>
                        {text}
                    </>
                ) : (
                    <>
                        <Select value={value} options={options} onChange={handleChange}/>
                    </>
                )}
            </div>
        </div>
    )
}

export default ServiceDetails;