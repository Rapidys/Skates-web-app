import React, {FC} from 'react';
import {Card, Tooltip} from "flowbite-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import {IState} from "../../../pages/Admin/groups/types";
import {IOptions} from "../../../pages/Admin/orders/types";
import RangeDatePicker from "../../fields/RangeDatePicker";
import {DateRangeType} from "react-tailwindcss-datepicker";
import MySelect from "../../fields/select";

interface IFilter {
    handleClearFilters:() => void,
    trainers:IOptions[],
    state:IState,
    handleChangeTrainer:(option:IOptions) => void,
    handleChangeDate:(values:DateRangeType) => void
}
const Filter:FC<IFilter> = ({handleClearFilters,trainers,state,handleChangeTrainer,handleChangeDate}) => {
    return (
        <Card className={'shadow-lg mx-2 my-2'}>
            <div className={'flex justify-between'}>
                <div>ფილტრაცია</div>
                <div>
                    <Tooltip content={'ფილტრის გასუფთავება'}>
                        <FontAwesomeIcon icon={faTrash} className={'hover:text-gray-700 cursor-pointer'}
                                         onClick={handleClearFilters}/>
                    </Tooltip>
                </div>
            </div>
            <div className={'flex w-full gap-2'}>

                <div className={'w-1/3'}>
                    <div className={'text-gray-500 mb-2 text-sm font-light'}>ჯგუფები / ტრენერები</div>
                    <MySelect
                        options={trainers}
                        value = {state.trainer}
                        onSelectChange = {handleChangeTrainer}
                        placeholder={'აირჩიეთ ჯგუფი / ტრენერი'}
                    />

                </div>

                <div className={'w-1/3'}>
                    <RangeDatePicker
                        startDate={state.OrderDateFrom}
                        endDate={state.OrderDateTo}
                        onChange={handleChangeDate}
                        label={'თარიღი'}
                    />
                </div>

            </div>
        </Card>
    );
};

export default Filter;