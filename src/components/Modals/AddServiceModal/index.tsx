import React, {FC, useCallback, useEffect, useState} from 'react';
import {Modal} from "flowbite-react";
import Select from 'react-select'
import DatePicker from "../../fields/DatePicker";
import Button from '../../Button/index'
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {IOptions, ISelectedValues, IServices} from "../../../types/Dashboard";
import {addMonths, format} from "date-fns";
import AlertModal from "../AlertModal";
import {useAccount} from "../../../context/AccountContext";
import Counter from "../../counter";

interface IAddService {
    openModal: string | undefined,
    setOpenModal: any,
    callbackFn: any,
}

const AddServiceModal: FC<IAddService> = ({openModal, setOpenModal,callbackFn}) => {

    const currentDate = new Date();
    const oneMonthLater = addMonths(currentDate, 1);

    const [options,setOptions] = useState<IOptions>({
        trainers:[],
        services:[],
        paymentTypes:[]
    })
    const [date, setDate] = useState<any>({
        StartDate:currentDate,
        EndDate:oneMonthLater
    })

    const [selectedValues, setSelectedValues] = useState<ISelectedValues>({
        trainers:[],
        services:[],
        paymentTypes:{},
    });
    const [openAlertModal, setOpenAlertModal] = useState<string | undefined>();


    const {ClientId} = useAccount()

    const {services} = useServices()

    const ArrayToOptions = (data:any[],obj:string) => {
        const arr: any = []
        data.forEach((item: IServices) => {
            arr.push({...item,value: item.displayName, label: item.displayName,})
        })
        setOptions((prevState) => ({
            ...prevState,
            [obj]:arr
        }))
    }

    const checkApiCallType = (url:string) => {
        if(url.toLowerCase().includes('trainers')){
            return 'trainers'
        }
        if(url.toLowerCase().includes('services')){
            return 'services'
        }
        if(url.toLowerCase().includes('paymenttypes')){
            return 'paymentTypes'
        }
    }

    useEffect(() => {
        Promise.all([
            services.Dashboard.getServices(),
            services.Dashboard.getTrainers(),
            services.Dashboard.getPaymentTypes()
        ]).then(res => {
            res.forEach((item,i) =>{
                const {config,data} = item
                const checkType = checkApiCallType(config?.url) || ''
                ArrayToOptions(data,checkType)
            })
        })
    }, []);


    const updateState = (newValue:any,serviceId:number | undefined,objKey:string,objKeySec?:string) => {

        const copiedServices = [...selectedValues.services];
        const findServiceIndex = copiedServices.findIndex(el => el.id === serviceId)

        if (findServiceIndex !== null && findServiceIndex !== undefined) {
            if(objKeySec){
                (copiedServices[findServiceIndex] as any)[objKey] = newValue.id;
                (copiedServices[findServiceIndex] as any)[objKeySec] = newValue;
            }else{
                (copiedServices[findServiceIndex] as any)[objKey] = newValue;
            }
            setSelectedValues((prevState => ({
                ...prevState,
                services:copiedServices
            })))
        }
    }
    const onSelectChange = (selectedOptions: any,type:string,serviceId?:number) => {
            setSelectedValues({
                ...selectedValues,
                [type]:selectedOptions
            });
    };

    const onServiceChange = (selectedOptions:any,type:string) => {
        const newArr = selectedOptions.map((element:any) => {
            if(element?.needTrainer){
                return { ...element,quantity:element?.quantity > 1 ? element.quantity : 1,ServiceId:element?.id,StartDate:format(new Date(), 'yyyy-MM-dd'),EndDate:format(oneMonthLater, 'yyyy-MM-dd') }
            }else{
                return {...element,quantity:element?.quantity > 1 ? element.quantity : 1,ServiceId:element?.id}
            }
        })
        setSelectedValues({
            ...selectedValues,
            [type]:newArr
        })
    }

    const onDateChange = (newValue:any,type:string,serviceId:number) => {
        updateState(newValue,serviceId,type)
    }




    const calculatePrice = () => {
        let price = 0
        selectedValues.services.forEach((el) => {
            price += el?.price * el.quantity
        })
        return price
    }

    const GenPrice = useCallback(() => {
        return (
            <div className={'p-2 border border-custom_loading rounded-lg'}>
                <span>
                  {calculatePrice()}
                  {' '}
                </span>
                <span>
                    GEL
                </span>
            </div>
        )
    },[selectedValues])

    const addDisabled = () => {
        let disabled = false
        if(!selectedValues.paymentTypes?.id){
            disabled = true
        }
        if(selectedValues.services?.length === 0){
            disabled = true
        }
        selectedValues.services.forEach((element:any) => {
           if(element.needTrainer && !element?.trainerInfo){
               disabled = true
           }
        })
        return disabled
    }


    const ClearInfo = () => {
        setOpenModal(undefined)
        setSelectedValues({
            trainers:[],
            services:[],
            paymentTypes:{},
        })
    }

    return (
        <Modal show={openModal === 'default'} onClose={ClearInfo} size={'4xl'}>
            <Modal.Header>სერვისის დამატება</Modal.Header>
            <Modal.Body style = {{minHeight:'400px'}}>
                <div className={'h-auto'}>
                    <h2 className={'text-custom_ocean mb-2 text-sm'}>აირჩიეთ სერვისი:</h2>
                    <Select
                        isMulti
                        options={options?.services}
                        value={selectedValues.services}
                        menuPortalTarget={document.body}
                        placeholder = {'აირჩიეთ სერვისი'}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        onChange={(selectedOptions) => onServiceChange(selectedOptions,'services')}
                    />

                    <div className={'w-1/3 mt-2'}>
                        <h2 className={'text-custom_ocean mb-2 text-sm'}>აირჩიეთ გადახდის მეთოდი:</h2>

                        <Select
                            options={options.paymentTypes}
                            value={selectedValues.paymentTypes?.label ?selectedValues.paymentTypes : '' }
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            placeholder={'გადახდის მეთოდი'}
                            onChange={(selectedOptions) => onSelectChange(selectedOptions,'paymentTypes')}
                        />
                    </div>

                    <div className={'text-custom_ocean mt-2 text-sm'}>
                        <h6 className={''}>არჩეული:</h6>
                        {selectedValues.services?.map((items: IServices) => (
                            <div className={'flex justify-between items-end border p-2 rounded-lg mb-2'} key={items?.id}>
                                <div className={`${items?.needTrainer ? 'w-1/3' : 'w-full'}`}>
                                    <div className={'flex justify-between items-center'}>
                                        <div className={'py-1'}><span className={'font-bold'}>სერვისი : </span>{items.label}</div>
                                    </div>

                                    {items?.needTrainer && (
                                        <>
                                            <div className={'py-1'}>ტრენერი</div>
                                            <Select
                                                options={(options?.trainers as any)}
                                                menuPortalTarget={document.body}
                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                value={items?.trainerInfo}
                                                placeholder={'ტრენერი'}
                                                onChange={(selectedOptions) => updateState(selectedOptions,items?.id,'trainerId','trainerInfo')}
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
                                                    onDateChange(format(day, 'yyyy-MM-dd'),'StartDate',items?.id)
                                                }}
                                                className = {'border-0 border-b-2 border-b-custom_light !ring-0 text-sm'}
                                            />
                                        </div>
                                        <div>
                                            <DatePicker
                                                label={'მდე'}
                                                labelClassName={'!text-custom_ocean'}
                                                date={new Date(items?.EndDate)}
                                                onChange={(day) => {
                                                    onDateChange(format(day, 'yyyy-MM-dd'),'EndDate',items?.id)
                                                }}
                                                className = {'border-0 border-b-2 border-b-custom_light !ring-0 text-sm'}
                                            />
                                        </div>
                                    </div>
                                )}
                                <Counter counter={items?.quantity} onChange={(val) => updateState(val,items?.id,'quantity')}/>
                            </div>
                        ))}
                    </div>
                </div>



            </Modal.Body>

            <AlertModal
                title = {'ყურადღება !'}
                description = {'ნამდვილად გსურთ არჩეული სერვის(ის / ების) დამატება ?'}
                openModal={openAlertModal}
                setOpenModal={setOpenAlertModal}
                onYes={() => {
                    const data = {
                        ClientId,
                        Services:selectedValues.services,
                        PaymentType:selectedValues.paymentTypes?.id,
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
                            setOpenAlertModal('default')
                        }}
                                disabled={addDisabled()}
                                color="secondary"
                                className={'mr-2'}
                        >დამატება</Button>
                        <Button onClick={ClearInfo}>
                            დახურვა
                        </Button>
                    </div>

                    <div>
                        <GenPrice />
                    </div>
                </div>


            </Modal.Footer>
        </Modal>
    );
};

export default AddServiceModal;