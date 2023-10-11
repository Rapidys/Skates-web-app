import React, {FC} from 'react';
import Datepicker, {DateRangeType} from "react-tailwindcss-datepicker";

interface DatePickerProps {
    value: DateRangeType,
    handleChange: (newVal: DateRangeType) => void,
    label:string,
    isValid?:boolean,
    error?:string,
}
const MyDatePicker:FC<DatePickerProps> = ({value, handleChange,label,isValid,error,...props}) => {
    return (
        <>
            <label htmlFor="labelId" className={'block text-gray-500 font-light text-sm mb-2'}>
                {label} {!isValid && <span className = {'text-custom_light'}> / {error}</span>}
            </label>
            <Datepicker
                i18n={"ka"}
                asSingle={true}
                useRange={false}
                value={value}
                onChange={(newVal) => handleChange(newVal)}
                inputId={'labelId'}
                primaryColor={"fuchsia"}
            />
        </>
    );
};

export default MyDatePicker;