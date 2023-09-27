import React, {FC, useCallback, useEffect, useState} from 'react';
import {Modal} from "flowbite-react";
import Select from 'react-select'
import DatePicker from "../../../components/fields/DatePicker";
import Button from '../../../components/Button'
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {IOptions, ISelectedValues, IServices} from "../../../types/Dashboard";
import {addMonths, format} from "date-fns";
import AlertModal from "../../../components/Modals/AlertModal";
import {useAccount} from "../../../context/AccountContext";
import Counter from "../../../components/counter";
import Input from "../../../components/fields/input";

interface IAddService {
    openModal: boolean,
    handleCloseModal: (modalType:string) => void,
    callbackFn: any,
}

const AddServiceModal: FC<IAddService> = ({openModal, handleCloseModal, callbackFn}) => {

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


    const {ClientId} = useAccount()

    const {services} = useServices()

    const ArrayToOptions = (data: any[], obj: string) => {
        const arr: any = []

        data.forEach((item: IServices) => {
            const displayName = obj === 'services' ? `${item.displayName} (ფასი: ${item.price}; რაოდენობა: ${item.serviceQuantity})` : item?.displayName
            arr.push({...item, value: displayName, label: displayName,})
        })
        setOptions((prevState) => ({
            ...prevState,
            [obj]: arr
        }))
    }

    const checkApiCallType = (url: string) => {
        if (url.toLowerCase().includes('trainers')) {
            return 'trainers'
        }
        if (url.toLowerCase().includes('services')) {
            return 'services'
        }
        if (url.toLowerCase().includes('paymenttypes')) {
            return 'paymentTypes'
        }
    }

    useEffect(() => {
        Promise.all([
            services.Dashboard.getServices(),
            services.Dashboard.getTrainers(),
            services.Dashboard.getPaymentTypes()
        ]).then(res => {
            res.forEach((item, i) => {
                const {config, data} = item
                const checkType = checkApiCallType(config?.url) || ''
                ArrayToOptions(data, checkType)

            })
        })
    }, []);


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
            <Modal.Body style={{minHeight: '400px'}}>
                <div className={'h-auto'}>
                    <h2 className={'text-custom_ocean mb-2 text-sm'}>აირჩიეთ სერვისი:</h2>
                    <Select
                        isMulti
                        options={options?.services}
                        value={selectedValues.services}
                        menuPortalTarget={document.body}
                        placeholder={'აირჩიეთ სერვისი'}
                        styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                        onChange={(selectedOptions) => onServiceChange(selectedOptions, 'services')}
                    />

                    <div className={'w-1/3 mt-2'}>
                        <h2 className={'text-custom_ocean mb-2 text-sm'}>აირჩიეთ გადახდის მეთოდი:</h2>

                        <Select
                            options={options.paymentTypes}
                            value={selectedValues.paymentTypes?.label ? selectedValues.paymentTypes : ''}
                            menuPortalTarget={document.body}
                            styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                            placeholder={'გადახდის მეთოდი'}
                            onChange={(selectedOptions) => onSelectChange(selectedOptions, 'paymentTypes')}
                        />
                    </div>

                    <div className={'text-custom_ocean mt-2 text-sm'}>
                        <h6 className={''}>არჩეული:</h6>
                        {selectedValues.services?.map((items: IServices) => (
                            <div className={'flex justify-between items-end border p-2 rounded-lg mb-2'}
                                 key={items?.id}>
                                <div className={`${items?.needTrainer ? 'w-1/3' : 'w-full'}`}>
                                    <div className={'flex justify-between items-center'}>
                                        <div className={'py-1'}><span
                                            className={'font-bold'}>სერვისი : </span>{items.label}</div>
                                    </div>

                                    {items?.needTrainer && (
                                        <>
                                            <div className={'py-1'}>ტრენერი</div>
                                            <Select
                                                options={(options?.trainers as any)}
                                                menuPortalTarget={document.body}
                                                styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                                                value={items?.trainerInfo}
                                                placeholder={'ტრენერი'}
                                                onChange={(selectedOptions) => updateState(selectedOptions, items?.id, 'trainerId', 'trainerInfo')}
                                            />
                                        </>
                                    )}
                                </div>
                                {items?.needTrainer && items?.StartDate && items?.EndDate && (
                                    <div className={'flex items-end justify-between mt-3 '}>
                                        <div className={'mr-2'}>
                                            <DatePicker
                                                label={'დან'}
                                                labelClassName={'!text-custom_ocean'}
                                                date={new Date(items?.StartDate)}
                                                onChange={(day) => {
                                                    onDateChange(format(day, 'yyyy-MM-dd'), 'StartDate', items?.id)
                                                }}
                                                className={'custom-date-picker !ring-0'}
                                            />
                                        </div>
                                        <div>
                                            <DatePicker
                                                label={'მდე'}
                                                labelClassName={'!text-custom_ocean'}
                                                date={new Date(items?.EndDate)}
                                                onChange={(day) => {
                                                    onDateChange(format(day, 'yyyy-MM-dd'), 'EndDate', items?.id)
                                                }}
                                                className={'custom-date-picker !ring-0'}
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
                    }
                    services.Dashboard.makeOrder(data).then(res => {
                        ClearInfo()
                        callbackFn()
                    })
                }}
            />

            <Modal.Footer>
                <div className={'flex w-full justify-between items-center'}>
                    <div className={'flex'}>
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

                    <div className={'w-1/3'}>
                        <div className={'flex items-center justify-end w-full'}>
                            <div className={'w-20 mr-2'}>
                                <Input
                                    value={discount}
                                    maxLength={3}
                                    onChange={(e) => {
                                            if(e.target.value === '' || numberReg.test(e.target.value)){
                                                setDiscount(e.target.value)
                                            }
                                    }}
                                    className={'border border-custom_loading rounded-lg w-full'}
                                    withPercent
                                />
                            </div>
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