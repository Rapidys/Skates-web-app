import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay, isBefore,
    isEqual,
    isSameMonth,
    isToday,
    parse,
    startOfToday,
} from 'date-fns'
import {
    faArrowDown,
    faLeftLong,
    faRightLong
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FC, forwardRef, useEffect, useState} from 'react'
import {GetYearsArray, months, TranslateMonth} from "../../../utils/helpers/datePicker";


function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

interface ICalendar {
    onChange: (day: Date) => void,
    value: number | Date,
    open: boolean
    ref?: any
}

const Calendar: FC<ICalendar> = forwardRef(({onChange, value, open}, ref:any) => {
    let today = startOfToday()
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    const [calendarType, setCalendarType] = useState(0) // 0 - days / 1 - month / 2-  years
    const [portions,setPortions] = useState<any>([])
    const [leftOffset,setLeftOffset] = useState(new Date().getFullYear())

    useEffect(() => {
        const portion = GetYearsArray().slice(leftOffset-16,leftOffset)
        setPortions(portion)
    },[leftOffset])

    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    let startOfWeek = parse(format(firstDayCurrentMonth, 'yyyy-MM-01'), 'yyyy-MM-dd', new Date())
    startOfWeek = startOfWeek.getDay() === 0 ? startOfWeek : add(startOfWeek, {days: -getDay(startOfWeek)})
    let days = eachDayOfInterval({
        start: startOfWeek,
        end: endOfMonth(firstDayCurrentMonth),
    })

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, {months: -1})
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, {months: 1})
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function handleChangeYear() {
        if(calendarType !== 2){
            setCalendarType(calendarType + 1)
        }else{
            setCalendarType(0)
        }
    }


    return (
        open && (
            <div className={`absolute w-full`} ref={ref} style={{zIndex: 9999}}>
                <div
                    className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6 py-2 bg-custom_dark_secondary rounded-lg">
                    <div className="md:grid md:grid-cols-1 md:divide-x md:divide-gray-200">
                        <div className="">
                            {calendarType !== 0 && (
                                <div className={'flex items-center'}>
                                    <button
                                        type="button"
                                        onClick={() => setCalendarType(calendarType - 1)}
                                        className="-my-1.5 flex m-2 mt-1 flex-none items-center justify-center p-1.5 text-custom_secondary hover:text-white"
                                    >
                                        <span className="sr-only">Previous month</span>
                                        <FontAwesomeIcon icon={faLeftLong}/>
                                    </button>
                                    <h2 className="flex-auto font-semibold text-custom_light mt-2 cursor-pointer"
                                        onClick={handleChangeYear}
                                    >
                                        {TranslateMonth(format(firstDayCurrentMonth, 'MMMM yyyy'))}
                                        <span className={'ml-2 cursor-pointer'} >
                                            <FontAwesomeIcon icon={faArrowDown}/>
                                        </span>
                                    </h2>
                                </div>
                            )}
                            {calendarType === 0 && (
                                <>
                                    <div className="flex items-center">

                                        <h2 className="flex-auto font-semibold text-custom_light mt-2 cursor-pointer"
                                            onClick={handleChangeYear}
                                        >
                                            {TranslateMonth(format(firstDayCurrentMonth, 'MMMM yyyy'))}
                                            <span className={'ml-2 cursor-pointer'} >
                                        <FontAwesomeIcon icon={faArrowDown}/>
                                    </span>
                                        </h2>
                                        <button
                                            type="button"
                                            onClick={previousMonth}
                                            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-custom_secondary hover:text-white"
                                        >
                                            <span className="sr-only">Previous month</span>
                                            <FontAwesomeIcon icon={faLeftLong}/>
                                        </button>
                                        <button
                                            onClick={nextMonth}
                                            type="button"
                                            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-custom_secondary hover:text-white"
                                        >
                                            <span className="sr-only">Next month</span>
                                            <FontAwesomeIcon icon={faRightLong}/>
                                        </button>
                                    </div>
                                    <div
                                        className="grid grid-cols-7 mt-5 text-xs leading-6 text-center text-custom_secondary">
                                        <div>ორშ.</div>
                                        <div>სამ.</div>
                                        <div>ოთხ.</div>
                                        <div>ხუთშ.</div>
                                        <div>პარ.</div>
                                        <div>შაბ.</div>
                                        <div>კვ.</div>
                                    </div>
                                </>


                            )}

                            {calendarType === 1 && (
                                <div className={'flex flex-wrap w-full mt-2 justify-center'}>
                                    {
                                        months.map((item, index) => {
                                            return (
                                                <div
                                                    className={'text-white w-22 text-sm rounded-lg bg-custom_loading p-2 mb-2 mr-2 cursor-pointer flex-wrap'}
                                                    onClick={() => {
                                                        let oldVal = new Date(value)
                                                        const day = oldVal.getDate()
                                                        const year = oldVal.getFullYear()
                                                        onChange(new Date(year, index, day))
                                                    }}
                                                >
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )}
                            {calendarType === 2 && (
                                <div className={''}>
                                    <div className={'flex justify-end mb-4'}>
                                        <button
                                            type="button"
                                            onClick={() => leftOffset !== 16 && setLeftOffset(leftOffset-16)}
                                            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-custom_secondary hover:text-white"
                                        >
                                            <span className="sr-only">Previous month</span>
                                            <FontAwesomeIcon icon={faLeftLong}/>
                                        </button>
                                        <button
                                            onClick={() => leftOffset !== new Date().getFullYear() && setLeftOffset(leftOffset+16)}
                                            type="button"
                                            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-custom_secondary hover:text-white"
                                        >
                                            <span className="sr-only">Next month</span>
                                            <FontAwesomeIcon icon={faRightLong}/>
                                        </button>
                                    </div>
                                    <div className={'flex flex-wrap w-full mt-2 justify-center'}>
                                        {
                                            portions?.map((item:any, index:any) => {
                                                    return (
                                                        <div
                                                            className={'text-white text-sm rounded-lg bg-custom_loading p-2 mb-2 mr-2 cursor-pointer flex-wrap'}
                                                            onClick={() => {
                                                                let oldVal = new Date(value)
                                                                const day = oldVal.getDate()
                                                                const month = oldVal.getMonth()
                                                                onChange(new Date(item, month, day))
                                                            }}
                                                        >
                                                            {item}
                                                        </div>
                                                    )
                                            })
                                        }
                                    </div>

                                </div>
                            )}


                            <div className="grid grid-cols-7 mt-2 text-sm">
                                {calendarType === 0 && days.map((day, dayIdx) => (
                                    <div
                                        key={day.toString()}
                                        className={classNames(
                                            dayIdx === 0 && colStartClasses[getDay(day)],
                                            'py-1.5'
                                        )}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (isBefore(day, startOfToday())) {
                                                    return;
                                                }
                                                onChange(day)
                                            }}
                                            className={classNames(
                                                isEqual(day, value) && 'text-white',
                                                !isEqual(day, value) &&
                                                isToday(day) &&
                                                'text-custom_light',
                                                !isEqual(day, value) &&
                                                !isToday(day) &&
                                                isSameMonth(day, firstDayCurrentMonth) &&
                                                'text-white',
                                                !isEqual(day, value) &&
                                                !isToday(day) &&
                                                !isSameMonth(day, firstDayCurrentMonth) &&
                                                'text-custom_ocean',
                                                isBefore(day, startOfToday()) &&
                                                'text-custom_ocean',
                                                isEqual(day, value) && isToday(day) && 'bg-red-500',
                                                isEqual(day, value) &&
                                                !isToday(day) &&
                                                'bg-custom_loading',
                                                !isEqual(day, value) && 'hover:bg-custom_secondary',
                                                (isEqual(day, value) || isToday(day)) &&
                                                'font-semibold',
                                                'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                            )}
                                        >
                                            <time dateTime={format(day, 'yyyy-MM-dd')}>
                                                {format(day, 'd')}
                                            </time>
                                        </button>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    )
})

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]


// Example usage:


export default Calendar