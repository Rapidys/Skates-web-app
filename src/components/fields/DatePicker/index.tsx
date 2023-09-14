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
    const [open, setOpen] = useState(false)
    const ref = useRef<any>()

    useOnClickOutside(ref, () => setOpen(false))

    const handleDateChange = (day: any,isDay:string | undefined) => {
        if(onChange){
            onChange(day)
        }
        if(!onChange){
            setDate(format(day, 'yyyy-MM-dd'))
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
                onChange={() => null}
                renderIcon={() => {
                    return (
                        <span className={'absolute right-5 cursor-pointer'} style={{transform: 'translateY(-50%)', top: '50%'}}
                          onClick={() => setOpen(true)}
                        >
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
                disableOldDates = {false}
            />

        </>

    );
};

export default DatePicker;