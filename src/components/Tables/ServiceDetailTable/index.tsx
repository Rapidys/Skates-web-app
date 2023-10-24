import React, {FC} from 'react';
import {ServiceData} from "../../../types/Dashboard";
import {IOptions} from "../../../pages/Admin/orders/types";
import MySelect from "../../fields/select";
import {ITrainers} from "../../../types";

interface IServiceDetails {
    data: ServiceData,
    trainers: ITrainers[],
    value: any,
    handleChangeTrainer: (option: ITrainers) => void
}

const ServiceDetails: FC<IServiceDetails> = ({data, trainers, value, handleChangeTrainer}) => {
    return (
        <div className={'w-full text-custom_ocean'}>
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
    options?: ITrainers[],
    handleChange?: (option: IOptions) => void,
    value?: IOptions,
}

const Item: FC<IItem> = ({text, title, withEditMode, options, value,handleChange}) => {
    return (
        <div
            className={'pb-2 border-b border-b-custom_light flex items-end justify-between mt-2 rounded-lg shadow px-2'}
           style = {{backgroundColor:'#f9fafb'}}
        >
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
                        <MySelect
                            value={value}
                            options={options}
                            onSelectChange={handleChange}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default ServiceDetails;