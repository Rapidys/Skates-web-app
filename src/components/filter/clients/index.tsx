import React, {FC} from 'react';
import Input from "../../fields/input";
import {Card, Tooltip} from "flowbite-react";
import {IState} from "../../../pages/Admin/clients/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {DateRangeType} from "react-tailwindcss-datepicker";
import RangeDatePicker from "../../fields/RangeDatePicker";


interface IFilter {
    state: IState,
    handleChange: (value: string | DateRangeType, type: string) => void,
    handleClearFilters: () => void,
}

const Filter: FC<IFilter> = ({state, handleChange, handleClearFilters}) => {
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

            <div className={'flex flex-col md:flex-row gap-2 w-full'}>
                <div className={'w-full md:w-1/3 flex-col space-y-2'}>
                    <div>
                        <Input
                            placeholder={'შეიყვანეთ სახელი'}
                            label={'კლიენტის სახელი'}
                            textColor={'gray-500'}
                            value={state.firstName}
                            onChange={(e) => handleChange(e.target.value, 'firstName')}
                        />
                    </div>
                    <div>
                        <Input
                            placeholder={'შეიყვანეთ გვარი'}
                            label={'კლიენტის გვარი'}
                            textColor={'gray-500'}
                            value={state.lastName}
                            onChange={(e) => handleChange(e.target.value, 'lastName')}
                        />
                    </div>
                    <div>
                        <Input
                            placeholder={'შეიყვანეთ მობილური'}
                            label={'მობილური'}
                            textColor={'gray-500'}
                            value={state.mobile}
                            onChange={(e) => handleChange(e.target.value, 'mobile')}
                        />
                    </div>

                </div>
                <div className={'w-full md:w-1/3 flex-col space-y-2'}>
                    <div>
                        <Input
                            placeholder={'შეიყვანეთ პირადი ნომერი'}
                            label={'პირადი ნომერი'}
                            textColor={'gray-500'}
                            value={state.identificationNumber}
                            onChange={(e) => handleChange(e.target.value, 'identificationNumber')}
                        />
                    </div>
                    <div>
                        <Input
                            placeholder={'შეიყვანეთ ბარათის ნომერი'}
                            label={'ბარათის ნომერი'}
                            textColor={'gray-500'}
                            value={state.cardNumber}
                            onChange={(e) => handleChange(e.target.value, 'cardNumber')}
                        />
                    </div>
                </div>
                <div className={'w-full md:w-1/3 flex-col space-y-2'}>

                    <div>
                        <RangeDatePicker
                            label={'დაბადების თარიღი'}
                            startDate={state.birthDateFrom}
                            endDate={state.birthDateTo}
                            onChange={(value) => handleChange(value, 'birthDate')}
                        />
                    </div>

                    <div>
                        <RangeDatePicker
                            label={'რეგისტრირებულია'}
                            startDate={state.dateCreatedFrom}
                            endDate={state.dateCreatedTo}
                            onChange={(value) => handleChange(value, 'register')}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Filter;