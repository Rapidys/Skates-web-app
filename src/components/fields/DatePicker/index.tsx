import React, {useRef, useState} from 'react';
import Input from "../input";
import Calendar from "../Calendar";
import useOnClickOutside from "../../../utils/hooks/useOnClickOtside";
import {format} from "date-fns";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";


interface IDatePicker {

}

const DatePicker = ({...props}) => {

    const [date, setDate] = useState<number | Date>(new Date())
    const [open, setOpen] = useState(false)
    const ref = useRef<any>()

    useOnClickOutside(ref, () => setOpen(false))

    const handleDateChange = (day: Date) => {
        setDate(day)
    }

    return (
        <>
            <Input
                label={'თარიღი'}
                {...props}
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