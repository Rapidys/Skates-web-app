import React, {FC, useCallback, useEffect, useState} from 'react';
import {Checkbox, Label, Modal} from "flowbite-react";
import Button from "../../../components/Button";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import Select from "react-select";
import {IServices} from "../../../types/Dashboard";
import { useNavigate } from 'react-router-dom';
import Input from "../../../components/fields/input";


interface IInstantModal {
    openModal: boolean,
    handleCloseModal: (modalType:string) => void,
    title: string,
    onYes?: (type:string,chosenType:any) => void,
    instantData: any[],
    handleInstantChange: any,
    instantDataBase: any,
}

const InstantModal: FC<IInstantModal> = ({openModal, handleCloseModal, onYes, instantDataBase, handleInstantChange, instantData, title}) => {

    const numberReg = /^\d+$/

    const {services} = useServices()

    const [paymentTypes, setPaymentTypes] = useState([])

    const [chosenType, setChosenType] = useState<any>({})
    const [hasDiscount,setHasDiscount] = useState(false)
    const [discount,setDiscount] = useState('')

    const navigate = useNavigate()

    const ArrayToOptions = (data: any[]) => {
        const arr: any = []
        data.forEach((item: IServices) => {
            arr.push({...item, value: item.displayName, label: item.displayName,})
        })
        return arr
    }


    useEffect(() => {
        try {
            services.Dashboard.getPaymentTypes().then(res => {
                const data = ArrayToOptions(res.data)
                setPaymentTypes(data)
            })
        } catch (e) {
            console.log(e)
        }
    }, []);

    const genPrice = () => {
        let price = 0
        instantData.forEach(element => {
            if(element?.checked){
                price += element?.price
            }
        })
        return price
    }

    const GenPrice = useCallback(() => {
        let price = genPrice()
        let priceWithDiscount = price * +discount / 100
        price -= priceWithDiscount

        return (
            <div className={'p-2 border border-custom_loading rounded-lg w-full md:w-auto'}>
                <span>
                  {price.toFixed(2)}
                    {' '}
                </span>
                <span>
                    GEL
                </span>
            </div>
        )
    },[instantData,discount])

    const checkBtnDisabled = () => {
        let isDisabled = false
        instantData.forEach(element => {
            if(element?.checked && !chosenType?.id){
                isDisabled = true
            }
        })
        return isDisabled
    }


    const ClearData = () => {
        handleCloseModal('instantModal')
        setChosenType({})
        instantDataBase(instantData)
    }


    return (
        <Modal show={openModal} onClose={() => {
            ClearData()
        }} >
            <Modal.Header>
                    <span className={'text-custom_light'}>
                       {title}
                    </span>
            </Modal.Header>
            <Modal.Body>
                <div className={'w-full items-center justify-between'}>
                    <div className = {'w-full'}>
                        {instantData?.map(item => {
                            return (
                                <div className={'w-full mt-2'} key={item.id}>
                                    <div className = {'flex justify-between items-center'}>
                                        <div className={'text-custom_ocean'}>
                                            {item?.displayName}
                                        </div>
                                        <div>
                                            <Checkbox checked={item?.checked} onChange={() => handleInstantChange(item)}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>


                    <div className={'mt-5 w-1/2'}>
                        <Select
                            options={paymentTypes}
                            value={chosenType.label ? chosenType : ''}
                            placeholder={'გადახდის მეთოდი'}
                            onChange={(value) => setChosenType(value)}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className={'flex flex-col-reverse md:flex-row justify-between w-full'}>
                    <div className={'flex flex-col-reverse md:flex-row md:items-center mt-2 md:mt-0'}>
                        <div className={'flex mt-6 md:mt-0'}>
                            <Button
                                onClick={() => {
                                    if (onYes) {
                                        onYes('addWithInstant',chosenType)
                                    }
                                    ClearData()
                                    navigate('/findAccount')
                                }} color={'danger'} className={'mr-2'}
                                disabled = {checkBtnDisabled()}

                            >დასრულება</Button>
                            <Button color={'secondary'} onClick={() => {
                                ClearData()
                            }}>
                                დახურვა
                            </Button>
                        </div>

                        <div>
                            <Checkbox id="promotion" className={'md:ml-2'} checked={hasDiscount}
                                      onChange={() => setHasDiscount(!hasDiscount)}/>
                            <Label htmlFor="promotion" className={'ml-2'}>
                                ფასდაკლება
                            </Label>
                        </div>
                    </div>

                    <div className={'flex flex-col md:flex-row items-center'}>
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
                        <GenPrice/>
                    </div>

                </div>


            </Modal.Footer>
        </Modal>
    );
};

export default InstantModal;