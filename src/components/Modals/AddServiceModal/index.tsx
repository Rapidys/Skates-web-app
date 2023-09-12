import React, {FC, useEffect, useState} from 'react';
import {Modal} from "flowbite-react";
import Select from 'react-select'
import DatePicker from "../../fields/DatePicker";
import Button from '../../Button/index'
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {IOptions, ISelectedValues, IServices, ITrainers} from "../../../types/Dashboard";
import {addMonths, format} from "date-fns";
import AlertModal from "../AlertModal";
import myServices from "../../../pages/MyServices";
import {useAccount} from "../../../context/AccountContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowAltCircleDown, faArrowAltCircleUp} from "@fortawesome/free-solid-svg-icons";
import Counter from "../../counter";

interface IAddService {
    openModal: string | undefined,
    setOpenModal: any,
    handleAddService: (selectedValues: any) => void,
}

const AddServiceModal: FC<IAddService> = ({openModal, setOpenModal, handleAddService}) => {

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
        trainers:{},
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
        console.log(arr,obj)
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


    const updateState = (newValue:any,serviceId:number | undefined,objKey:string) => {

        const copiedServices = [...selectedValues.services];
        const findServiceIndex = copiedServices.findIndex(el => el.id === serviceId)

        if (findServiceIndex !== null && findServiceIndex !== undefined) {
            (copiedServices[findServiceIndex] as any)[objKey] = newValue;
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
        if(type === 'trainers') {
            const {id} = selectedOptions
            updateState(id,serviceId,'trainerId')
        }
    };

    const onDateChange = (newValue:Date,type:string,serviceId:number) => {
        setDate({
            ...date,
            [type]:newValue
        })
        updateState(newValue,serviceId,type)
    }


    return (
        <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)} size={'4xl'}>
            <Modal.Header>სერვისის დამატება</Modal.Header>
            <Modal.Body style = {{minHeight:'400px'}}>
                <div className={'h-auto'}>
                    <h2 className={'text-custom_ocean mb-2 text-sm'}>აირჩიეთ სერვისი:</h2>
                    <Select
                        isMulti
                        options={options?.services}
                        value={selectedValues.services}
                        onChange={(selectedOptions) => onSelectChange(selectedOptions,'services')}
                    />

                    <div className={'w-1/3 mt-2'}>
                        <h2 className={'text-custom_ocean mb-2 text-sm'}>აირჩიეთ გადახდის მეთოდი:</h2>

                        <Select
                            options={options.paymentTypes}
                            value={selectedValues.paymentTypes}
                            onChange={(selectedOptions) => onSelectChange(selectedOptions,'paymentTypes')}
                        />
                    </div>

                    <div className={'text-custom_ocean mt-2 text-sm'}>
                        <h6 className={''}>არჩეული:</h6>
                        {selectedValues.services?.map((items: IServices) => (
                            <div className={'flex justify-between items-end border p-2 rounded-lg mb-2'} key={items.value}>
                                <div className={`${items?.needTrainer ? 'w-1/3' : 'w-full'}`}>
                                    <div className={'flex justify-between items-center'}>
                                        <div className={'py-1'}><span className={'font-bold'}>სერვისი : </span>{items.label}</div>
                                        {items?.isInstant && (
                                            <Counter counter={items?.quantity} onChange={(val) => updateState(val,items?.id,'quantity')}/>
                                        )}
                                    </div>

                                    {items?.needTrainer && (
                                        <>
                                            <div className={'py-1'}>ტრენერი</div>
                                            <Select
                                                options={options?.trainers}
                                                value={selectedValues.trainers}
                                                placeholder={'ტრენერი'}
                                                onChange={(selectedOptions) => onSelectChange(selectedOptions,'trainers',items?.id)}
                                            />
                                        </>
                                    )}
                                </div>
                                {items?.needTrainer && (
                                        <div className={'flex items-end justify-between mt-3 '}>
                                            <div className={'mr-2'}>
                                                <DatePicker
                                                    label={'დან'}
                                                    labelClassName={'!text-custom_ocean'}
                                                    date={date.StartDate}
                                                    onChange={(day) => {
                                                        onDateChange(day,'StartDate',items?.id)
                                                    }}
                                                    className = {'border-0 border-b-2 border-b-custom_light !ring-0 text-sm'}
                                                />
                                            </div>
                                            <div>
                                                <DatePicker
                                                    label={'მდე'}
                                                    labelClassName={'!text-custom_ocean'}
                                                    date={date.EndDate}
                                                    onChange={(day) => {
                                                        onDateChange(day,'EndDate',items?.id)
                                                    }}
                                                    className = {'border-0 border-b-2 border-b-custom_light !ring-0 text-sm'}
                                                />
                                            </div>
                                        </div>
                                )}
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
                    console.log(data)
                    // setOpenModal(undefined)
                }}
            />

            <Modal.Footer>
                <Button onClick={() => {
                    setOpenAlertModal('default')
                }}
                        color="secondary"
                >დამატება</Button>
                <Button onClick={() => setOpenModal(undefined)}>
                    დახურვა
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddServiceModal;