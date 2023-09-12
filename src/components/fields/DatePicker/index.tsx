import React, {FC, useRef, useState} from 'react';
import Input from "../input";
import Calendar from "../Calendar";
import useOnClickOutside from "../../../utils/hooks/useOnClickOtside";
import {format} from "date-fns";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";


interface IDatePicker {
    date:Date | number,
    setDate?:any,
    onFocus?:() => void,
    label :string,
    labelClassName? :string,
    className? :string,
    onChange?:(day:Date) => void
}

const DatePicker:FC<IDatePicker> = ({date,setDate,label,onChange,labelClassName,...props}) => {
    // const [date, setDate] = useState<number | Date>(new Date())
    const [open, setOpen] = useState(false)
    const ref = useRef<any>()

    useOnClickOutside(ref, () => setOpen(false))

    const handleDateChange = (day: Date,isDay:string | undefined) => {
        if(onChange){
            onChange(day)
        }
        if(!onChange){
            setDate(day)
        }
        if(isDay){
            setOpen(false)
        }
    }

    return (
        <>
            <Input
                label={label ? label : 'თარიღი'}
                value={format(date, 'yyyy-MM-dd')}
                renderIcon={() => {
                    return (
                        <span className={'absolute right-5'} style={{transform: 'translateY(-50%)', top: '50%'}}>
                                 <FontAwesomeIcon icon={faCalendar} className={'text-custom_light'}/>
                            </span>
                    )
                }}
                onFocus={() => {
                    setOpen(true)
                    if (props?.onFocus) {
                        props?.onFocus()
                    }
                }}
                labelClassName = {labelClassName}
                {...props}
            />

            <Calendar
                onChange={handleDateChange}
                value={date}
                open={open}
                ref={ref}
            />

        </>

    );
};

export default DatePicker;