import React, {ChangeEvent, FC, useRef, useState} from 'react';
import {DayPicker, SelectSingleEventHandler} from "react-day-picker";
import {format, parse, isValid} from "date-fns";
import {ka} from 'date-fns/locale';
import FocusTrap from "focus-trap-react";
// @ts-ignore
import {usePopper, PopperAttributes} from 'react-popper';
import Input from "../input";
import {Portal} from "@headlessui/react";

interface DatePickerProps {
    value: any;
    handleChange: (newVal: any) => void;
    label?: string;
    error?: string;
    name?: string,
    labelClassName?: string,
}

const css = `
  .my-selected:not([disabled]) { 
    background-color:#d946ef;
    color:white;
  }
  .my-selected:hover:not([disabled]) { 
  }
 .my-today:hover{
  }
  .my-today { 
    color:#d946ef;
  }
`;
const MyDatePicker: FC<DatePickerProps> = ({value, handleChange, label, error, name,labelClassName}) => {

    const [isPopperOpen, setIsPopperOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(format(value ? new Date(value) : new Date(), 'y-MM-dd'));

    const popperRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
        null
    );

    const popper = usePopper(popperRef.current, popperElement, {
        placement: 'bottom-start'
    });

    const closePopper = () => {
        setIsPopperOpen(false);
        setTimeout(() => {
            inputRef?.current.blur()
        }, 200)
    };

    const handleDaySelect: SelectSingleEventHandler = (date) => {
        if (date) {
            handleChange(format(date, 'y-MM-dd'));
            setInputValue(format(date, 'y-MM-dd'));
            closePopper();
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
        const date = parse(e.currentTarget.value, 'y-MM-dd', new Date());
        if (isValid(date)) {
            handleChange(date)
        }
    };

    const handleBlur = () => {
        if (!isValid(inputValue)) {
            setInputValue(format(value ? new Date(value) : new Date(), 'y-MM-dd'))
        }
    }

    return (
        <>
            <label htmlFor="labelId" className={`block text-white text-sm mb-2 ${labelClassName}`}>
                {label} {error && <span className={'text-custom_light'}> / {error}</span>}
            </label>
            <style>{css}</style>
            <div ref={popperRef}>
                <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    onClick={() => {
                        setTimeout(() => {
                            inputRef.current?.focus()
                        }, 200)
                        setIsPopperOpen(true)
                    }}
                    onBlur={handleBlur}
                    name={name}
                    id={'labelId'}
                    withCalendar={true}
                    onCalendarClick={() => setIsPopperOpen(true)}
                />
            </div>
            {isPopperOpen && (
                <Portal>
                    <FocusTrap
                        active
                        focusTrapOptions={{
                            initialFocus: false,
                            allowOutsideClick: true,
                            clickOutsideDeactivates: true,
                            onDeactivate: closePopper,
                            fallbackFocus: inputRef.current || undefined
                        }}
                    >
                        <div
                            tabIndex={-1}
                            style={popper.styles.popper}
                            className="dialog-sheet z-[999999] bg-white border border-custom_date_border rounded-lg mb-2 mt-2 shadow-lg"
                            {...popper.attributes.popper as PopperAttributes}
                            ref={setPopperElement}
                            role="dialog"
                            aria-label="DayPicker calendar"
                        >
                            <DayPicker
                                mode="single"
                                defaultMonth={value ? new Date(value) : new Date()}
                                selected={value ? new Date(value) : new Date()}
                                onSelect={handleDaySelect}
                                captionLayout="dropdown-buttons"
                                fromYear={1900}
                                toYear={2090}
                                locale={ka}
                                modifiersClassNames={{
                                    selected: 'my-selected',
                                    today: 'my-today',
                                }}
                                showOutsideDays
                            />
                        </div>
                    </FocusTrap>
                </Portal>
            )}
        </>
    );
};

export default MyDatePicker;

