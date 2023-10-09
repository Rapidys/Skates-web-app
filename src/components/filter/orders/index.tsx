import React, {FC} from 'react';
import DatePicker from "../../fields/DatePicker";
import Select from "react-select";
import {IService, IUsers} from "../../../types/admin";
import {Card, Tooltip} from "flowbite-react";
import Input from "../../fields/input";
import {IState} from "../../../pages/Admin/orders/types";
import {format} from "date-fns";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface IFilter {
    handleOptionChange: (options: IService, type: string) => void,
    productServices: IService[],
    selectedService: IService,
    selectedUser: IUsers,
    users: IUsers[],
    handleChange: (value: string, type) => void,
    state: IState,
    handleClearFilters:() => void,

}

const Filter: FC<IFilter> = ({
                                 productServices,
                                 selectedService,
                                 users,
                                 handleChange,
                                 selectedUser,
                                 handleOptionChange,
                                 state,
                                 handleClearFilters
                             }) => {
    return (
        <Card className={'shadow-lg mx-2 my-2'}>
            <div className={'flex justify-between'}>
                <div>ფილტრაცია</div>
                <div>
                    <Tooltip content={'ფილტრის გასუფთავება'} >
                        <FontAwesomeIcon icon={faTrash} className={'hover:text-gray-700 cursor-pointer'} onClick = {handleClearFilters}/>
                    </Tooltip>
                </div>
            </div>

            <div className={'flex flex-col md:flex-row gap-2'}>
                <div className={'w-full md:w-1/2 flex-col'}>
                    <div className={'w-full'}>
                        <h2 className={'text-gray-500 mb-2 text-sm font-light'}>მომხმარებლის იდენტიფიკატორი</h2>
                        <Input
                            placeholder={'კლიენტის მონაცემები'}
                            value={state.clientIdentifier}
                            onChange={(e) => handleChange(e.target.value, 'clientIdentifier')}
                        />
                    </div>
                    <div className={'w-full flex'}>
                        <div className={'flex-col w-full'}>
                            <div className={'w-full'}>
                                <div className={'text-gray-500 mb-2 text-sm font-light'}>სერვისები</div>

                                <Select
                                    options={productServices}
                                    value={selectedService}
                                    menuPortalTarget={document.body}
                                    placeholder={'აირჩიეთ სერვისი'}
                                    styles={{
                                        menuPortal: base => (
                                            {...base, zIndex: 9999}
                                        ),
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: state.isFocused ? '#14b8a6' : '#cbd5e1',
                                            backgroundColor: '#f8fafc',
                                            color: '#0f172a'
                                        })
                                    }}
                                    onChange={(option) => handleOptionChange(option, 'services')}
                                />
                            </div>
                            <div className={'w-full'}>
                                <h2 className={'text-gray-500 mb-2 text-sm font-light'}>ოპერატორები</h2>

                                <Select
                                    options={users}
                                    value={selectedUser}
                                    menuPortalTarget={document.body}
                                    placeholder={'აირჩიეთ ოპერატორი'}
                                    styles={{
                                        menuPortal: base => ({...base, zIndex: 9999}),
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: state.isFocused ? '#14b8a6' : '#cbd5e1',
                                            backgroundColor: '#f8fafc',
                                            color: '#0f172a'
                                        })
                                    }}
                                    onChange={(option:any) => handleOptionChange(option, 'users')}
                                />
                            </div>
                        </div>

                    </div>

                </div>
                <div className={'flex-col gap-2 w-full md:w-1/2'}>
                    <div>
                        <DatePicker
                            date={state.dateCreated ? new Date(state.dateCreated) : null}
                            label={'შექმნის თარიღი'}
                            textColor={'gray-500'}
                            onChange = {(value) => handleChange(format(value, 'yyyy-MM-dd'),'dateCreated')}
                        />
                    </div>
                    <div>
                        <DatePicker
                            date={state.startDate ? new Date(state.startDate) : null}
                            label={'აქტიური დან'}
                            textColor={'gray-500'}
                            onChange = {(value) => handleChange(format(value, 'yyyy-MM-dd'),'startDate')}
                        />
                    </div>
                    <div>
                        <DatePicker
                            date={state.endDate ? new Date(state.endDate) : null}
                            label={'აქტიური მდე'}
                            textColor={'gray-500'}
                            onChange = {(value) => handleChange(format(value, 'yyyy-MM-dd'),'endDate')}
                        />
                    </div>
                </div>

            </div>


        </Card>
    );
};

export default Filter;