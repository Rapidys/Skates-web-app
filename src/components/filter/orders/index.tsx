import React, {FC, useState} from 'react';
import DatePicker from "../../fields/DatePicker";
import Select from "react-select";
import {IService, IUsers} from "../../../types/admin";
import {Card, Table, Tooltip} from "flowbite-react";
import Input from "../../fields/input";
import {IOptions, IState} from "../../../pages/Admin/orders/types";
import {format} from "date-fns";
import {faMoneyBillWheat, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MyModal from "../../Modals";
import RangeDatePicker from "../../fields/RangeDatePicker";
import {DateRangeType} from "react-tailwindcss-datepicker";
import MySelect from "../../fields/select";

interface IFilter {
    handleOptionChange: (options: IService | IOptions | IOptions[], type: string) => void,
    productServices: IService[],
    selectedService: IService,
    selectedUser: IUsers,
    users: IUsers[],
    handleChange: (value: string | DateRangeType, type?) => void,
    state: IState,
    handleClearFilters: () => void,
    sumValues: any,
}

const Filter: FC<IFilter> = ({
                                 productServices,
                                 selectedService,
                                 users,
                                 handleChange,
                                 selectedUser,
                                 handleOptionChange,
                                 state,
                                 handleClearFilters,
                                 sumValues
                             }) => {

    const [isOpen, setOpen] = useState(false)

    return (
        <Card className={'shadow-lg mx-2 my-2'}>
            <div className={'flex flex-col md:flex-row w-full justify-between'}>
                <div className={'flex justify-between w-full'}>

                    <div>ფილტრაცია</div>

                    <div className={'flex gap-10'}>
                        <Tooltip content={'ბუღალტერია'}>
                            <FontAwesomeIcon icon={faMoneyBillWheat} className={'hover:text-gray-700 cursor-pointer'}
                                             onClick={() => setOpen(true)}/>
                        </Tooltip>
                        <Tooltip content={'ფილტრის გასუფთავება'}>
                            <FontAwesomeIcon icon={faTrash} className={'hover:text-gray-700 cursor-pointer'}
                                             onClick={handleClearFilters}/>
                        </Tooltip>
                    </div>

                </div>
                <MyModal
                    openModal={isOpen}
                    setOpenModal={setOpen}
                    renderHeader={() => <span>შემოსული თანხები</span>}
                    renderBody={() => {
                        let sum = 0 ;

                        return (
                            <Table className={'w-full'}>
                                <Table.Head>
                                    {Object.keys({...sumValues,['ჯამი']:''})?.map(element => {
                                        return (
                                            <Table.HeadCell key={element}>
                                                {element}
                                            </Table.HeadCell>
                                        )
                                    })}
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    <Table.Row>
                                        {Object.keys({...sumValues,['ჯამი']:''})?.map((element) => {
                                            sum += sumValues[element] !== undefined ? sumValues[element] : 0
                                            return (
                                                <Table.Cell key={element}>
                                                    {{...sumValues,['ჯამი']:sum }[element]} GEL
                                                </Table.Cell>
                                            )
                                        })}
                                    </Table.Row>

                                </Table.Body>
                            </Table>
                        )
                    }}
                />

            </div>

            <div className={'flex flex-col md:flex-row gap-2'}>
                <div className={'w-full md:w-1/2 flex-col'}>
                    <div className={'w-full'}>
                        <RangeDatePicker
                            label={'აბონიმენტები: დან ~ მდე'}
                            startDate={state.startDate}
                            endDate={state.endDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={'w-full flex'}>
                        <div className={'flex-col w-full'}>
                            <div className={'w-full'}>
                                <div className={'text-gray-500 mb-2 text-sm font-light'}>სერვისები</div>

                                <MySelect
                                    options={productServices}
                                    value={selectedService}
                                    placeholder={'აირჩიეთ სერვისი'}
                                    onSelectChange={(option) => handleOptionChange(option, 'services')}
                                />
                            </div>

                        </div>

                    </div>

                </div>
                <div className={'flex-col gap-2 w-full md:w-1/2'}>
                    <div>
                        <h2 className={'text-gray-500 mb-2 text-sm font-light'}>მომხმარებლის იდენტიფიკატორი</h2>
                        <Input
                            placeholder={'კლიენტის მონაცემები'}
                            value={state.clientIdentifier}
                            onChange={(e) => handleChange(e.target.value, 'clientIdentifier')}
                        />
                    </div>

                    <div className={'w-full'}>
                        <h2 className={'text-gray-500 mb-2 text-sm font-light'}>ოპერატორები</h2>

                        <MySelect
                            options={users}
                            value={selectedUser}
                            placeholder={'აირჩიეთ ოპერატორი'}
                            onSelectChange={(option: any) => handleOptionChange(option, 'users')}
                        />
                    </div>
                </div>

            </div>


        </Card>
    );
};

export default Filter;