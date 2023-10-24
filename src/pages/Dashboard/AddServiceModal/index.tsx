import React, {FC, useEffect, useState} from 'react';
import {Modal, Checkbox, Label} from "flowbite-react";
import Button from '../../../components/Button'
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {IOptions, ISelectedValues, IServices} from "../../../types/Dashboard";
import {addMonths, format} from "date-fns";
import AlertModal from "../../../components/Modals/AlertModal";
import {useAccount} from "../../../context/AccountContext";
import Counter from "../../../components/counter";
import Input from "../../../components/fields/input";
import {ArrayToOptions} from "../../../utils/helpers/arrayToOptions";
import MyDatePicker from "../../../components/fields/DatePickerV2";
import MySelect from "../../../components/fields/select";
import {IPaymentTypes, ITrainers} from "../../../types";

interface IAddService {
    openModal: boolean,
    handleCloseModal: (modalType: string) => void,
    callbackFn: any,
    trainers:ITrainers[]
    paymentTypes:IPaymentTypes[]
}

const AddServiceModal: FC<IAddService> = ({openModal, handleCloseModal, callbackFn,trainers,paymentTypes}) => {

    const currentDate = new Date();
    const oneMonthLater = addMonths(currentDate, 1);

    const [options, setOptions] = useState<IOptions>({
        trainers: [],
        services: [],
        paymentTypes: []
    })

    const [selectedValues, setSelectedValues] = useState<ISelectedValues>({
        trainers: [],
        services: [],
        paymentTypes: {},
    });

    const [openAlertModal, setOpenAlertModal] = useState(false);
    const [discount, setDiscount] = useState('')
    const [hasDiscount, setHasDiscount] = useState(false)


    const {ClientId} = useAccount()

    const {services} = useServices()

    useEffect(() => {
        if(openModal){
            services.Dashboard.getServices()
           .then(res => {
                    const newArr = ArrayToOptions(res?.data, 'services')
                    setOptions((prevState) => ({
                        ...prevState,
                        services:newArr,
                        trainers,
                        paymentTypes
                    }))
                })
        }
    }, [openModal]);


    const updateState = (newValue: any, serviceId: number | undefined, objKey: string, objKeySec?: string) => {

        const copiedServices = [...selectedValues.services];
        const findServiceIndex = copiedServices.findIndex(el => el.id === serviceId)

        if (findServiceIndex !== null && findServiceIndex !== undefined) {
            if (objKeySec) {
                (copiedServices[findServiceIndex] as any)[objKey] = newValue.id;
                (copiedServices[findServiceIndex] as any)[objKeySec] = newValue;
            } else {
                (copiedServices[findServiceIndex] as any)[objKey] = newValue;
            }
            setSelectedValues((prevState => ({
                ...prevState,
                services: copiedServices
            })))
        }
    }
    const onSelectChange = (selectedOptions: any, type: string, serviceId?: number) => {
        setSelectedValues({
            ...selectedValues,
            [type]: selectedOptions
        });
    };

    const onServiceChange = (selectedOptions: any, type: string) => {
        const newArr = selectedOptions.map((element: any) => {
            if (element?.needTrainer) {
                return {...element, quantity: element?.quantity > 1 ? element.quantity : 1, ServiceId: element?.id, StartDate: format(new Date(), 'yyyy-MM-dd'), EndDate: format(oneMonthLater, 'yyyy-MM-dd')}
            } else {
                return {...element, quantity: element?.quantity > 1 ? element.quantity : 1, ServiceId: element?.id}
            }
        })
        setSelectedValues({
            ...selectedValues,
            [type]: newArr
        })
    }

    const onDateChange = (newValue: any, type: string, serviceId: number) => {
        updateState(newValue, serviceId, type)
    }


    const calculatePrice = () => {
        let price = 0
        selectedValues.services.forEach((el) => {
            price += el?.price * el.quantity
        })

        let priceWithDiscount = price * +discount / 100
        price -= priceWithDiscount
        return price
    }

    const addDisabled = () => {
        let disabled = false
        disabled = selectedValues.services.some((el) => el.needTrainer && !el?.trainerInfo)
        if (!selectedValues.paymentTypes?.id) {
            disabled = true
        }
        if (selectedValues.services?.length === 0) {
            disabled = true
        }
        return disabled
    }


    const ClearInfo = () => {
        handleCloseModal('addServiceModal')
        setDiscount('')
        setHasDiscount(false)
        setSelectedValues({
            trainers: [],
            services: [],
            paymentTypes: {},
        })
    }

    const numberReg = /^\d+$/

    return (
        <Modal show={openModal} onClose={ClearInfo} size={'4xl'}>
            <Modal.Header>სერვისის დამატება</Modal.Header>
            <Modal.Body className={'overflow-y-scroll'}>
                <div className={'h-96'}>
                    <h2 className={'text-custom_ocean mb-2 text-sm'}>აირჩიეთ სერვისი:</h2>
                    <MySelect
                        isMulti
                        options={options?.services}
                        value={selectedValues.services}
                        placeholder={'აირჩიეთ სერვისი'}
                        onSelectChange={(selectedOptions) => onServiceChange(selectedOptions, 'services')}
                    />

                    <div className={'w-full md:w-1/3 mt-4'}>
                        <h2 className={'text-custom_ocean mb-2 text-sm'}>აირჩიეთ გადახდის მეთოდი:</h2>

                        <MySelect
                            options={options.paymentTypes}
                            value={selectedValues.paymentTypes?.label ? selectedValues.paymentTypes : ''}
                            placeholder={'გადახდის მეთოდი'}
                            onSelectChange={(selectedOptions) => onSelectChange(selectedOptions, 'paymentTypes')}
                        />
                    </div>

                    <div className={'text-custom_ocean mt-4 text-sm'}>
                        <h6 className={''}>არჩეული:</h6>
                        {selectedValues.services?.map((items: IServices) => (
                            <div
                                className={'flex flex-col md:flex-row justify-between items-end border p-2 rounded-lg mb-2'}
                                key={items?.id}>
                                <div className={`${items?.needTrainer ? 'w-full md:w-1/3' : 'w-full'}`}>
                                    <div className={'flex justify-between items-center'}>
                                        <div className={'py-1'}><span
                                            className={'font-bold'}>სერვისი : </span>{items.label}</div>
                                    </div>

                                    {items?.needTrainer && (
                                        <>
                                            <div className={'py-1'}>ტრენერი</div>
                                            <MySelect
                                                options={(options?.trainers as any)}
                                                value={items?.trainerInfo}
                                                placeholder={'ტრენერი'}
                                                onSelectChange={(selectedOptions) => updateState(selectedOptions, items?.id, 'trainerId', 'trainerInfo')}
                                            />
                                        </>
                                    )}
                                </div>
                                {items?.needTrainer && items?.StartDate !== undefined && items?.EndDate !== undefined && (
                                    <div
                                        className={'flex flex-col md:flex-row w-full md:w-auto items-center md:items-end justify-between mt-3 '}>
                                        <div className={'mr-2'}>
                                            <MyDatePicker
                                                label={'დან'}
                                                labelClassName={'!text-custom_ocean'}
                                                value = {items.StartDate}
                                                handleChange = {(value)=> {
                                                    onDateChange(value, 'StartDate', items?.id)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <MyDatePicker
                                                label={'მდე'}
                                                value = {items.EndDate}
                                                labelClassName={'!text-custom_ocean'}
                                                handleChange = {(value)=> {
                                                    onDateChange(value, 'EndDate', items?.id)
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                                <Counter counter={items?.quantity}
                                         onChange={(val) => updateState(val, items?.id, 'quantity')}/>
                            </div>
                        ))}
                    </div>
                </div>


            </Modal.Body>

            <AlertModal
                title={'ყურადღება !'}
                description={'ნამდვილად გსურთ არჩეული სერვის(ის / ების) დამატება ?'}
                openModal={openAlertModal}
                setOpenModal={setOpenAlertModal}
                onYes={() => {
                    const data = {
                        ClientId,
                        Services: selectedValues.services,
                        PaymentType: selectedValues.paymentTypes?.id,
                        discount:+discount
                    }
                    services.Dashboard.makeOrder(data).then(res => {
                        ClearInfo()
                        callbackFn()
                    })
                }}
            />

            <Modal.Footer className={'overflow-scroll'}>
                <div className={'flex flex-col-reverse sm:flex-row w-full justify-between sm:items-center'}>
                    <div className={'flex flex-col-reverse sm:flex-row sm:items-center mt-4 sm:mt-0'}>
                        <div className={'flex items-center'}>
                            <Button onClick={() => {
                                setOpenAlertModal(true)
                            }}
                                    disabled={addDisabled()}
                                    color="secondary"
                                    className={'mr-2'}
                            >დამატება</Button>
                            <Button onClick={ClearInfo}>
                                დახურვა
                            </Button>
                        </div>


                        <div className={'w-full flex mb-4 sm:mb-0 sm:justify-end md:justify-center items-center'}>
                            <Checkbox id="promotion" className={'ml-2'} checked={hasDiscount}
                                      onChange={() => setHasDiscount(!hasDiscount)}/>
                            <Label htmlFor="promotion" className={'ml-2'}>
                                ფასდაკლება
                            </Label>
                        </div>

                    </div>

                    <div className={'w-full sm:w-1/3'}>
                        <div className={'flex flex-col md:flex-row md:items-center justify-end w-full'}>
                            {hasDiscount && (
                                <div className={'mb-2 md:mb-0 mr-0 md:mr-2 w-full md:w-20'}>
                                    <Input
                                        value={discount}
                                        maxLength={3}
                                        onChange={(e) => {
                                            if (e.target.value === '' || numberReg.test(e.target.value)) {
                                                setDiscount(e.target.value)
                                            }
                                        }}
                                        className={'border border-custom_loading rounded-lg w-full'}
                                        withPercent
                                    />
                                </div>
                            )}

                            <div className={'p-2 border border-custom_loading rounded-lg w-30'}>
                           <span>
                               {calculatePrice()}
                               {' '}
                           </span>
                                <span>
                              GEL
                            </span>
                            </div>
                        </div>
                    </div>
                </div>


            </Modal.Footer>
        </Modal>
    );
};

export default AddServiceModal;