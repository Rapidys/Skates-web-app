import React, {FC} from 'react';
import Datepicker, {DateRangeType} from "react-tailwindcss-datepicker";


interface IRangeDatePicker{
    startDate:string,
    endDate:string,
    onChange:(values:DateRangeType) => void,
    label:string,
}
const RangeDatePicker:FC<IRangeDatePicker> = ({startDate,endDate,onChange,label,...props}) => {
    return (
        <>
            <label htmlFor="labelId" className={'block text-gray-500 font-light text-sm mb-2'}>{label}</label>
            <Datepicker
                i18n={"ka"}
                configs={{
                    shortcuts: {
                        today: "დღეს",
                        yesterday: "გუშინ",
                        past: period => `ბოლო ${period} დღე`,
                        currentMonth: "მიმდინარე თვე",
                        pastMonth: "წინა თვე",
                    },
                }}
                value={{startDate,endDate}}
                onChange={onChange}
                inputId = {'labelId'}
                inputClassName={`w-full disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 text-gray-900 font-light focus:border-cyan-500 focus:ring-cyan-500 text-sm border-gray-300 rounded-md`}
                primaryColor={"fuchsia"}
                showShortcuts={true}
                {...props}
            />
        </>
    );
};

export default RangeDatePicker;