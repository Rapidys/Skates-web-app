import React, {FC, useCallback, useEffect, useState} from 'react';
import {Checkbox, Modal} from "flowbite-react";
import Button from "../../../components/Button";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import Select from "react-select";
import {IServices} from "../../../types/Dashboard";
import { useNavigate } from 'react-router-dom';


interface IInstantModal {
    openModal: string | undefined,
    setOpenModal: any,
    title: string,
    onYes?: (type:string,chosenType:any) => void,
    instantData: any[],
    handleInstantChange: any,
    instantDataBase: any,
}

const InstantModal: FC<IInstantModal> = ({openModal, setOpenModal, onYes, instantDataBase, handleInstantChange, instantData, title}) => {


    const {services} = useServices()

    const [paymentTypes, setPaymentTypes] = useState([])

    const [chosenType, setChosenType] = useState<any>({})

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
        return (
            <div className={'p-2 border border-custom_loading rounded-lg'}>
                <span>
                  {genPrice()}
                    {' '}
                </span>
                <span>
                    GEL
                </span>
            </div>
        )
    },[instantData])

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
        setOpenModal(undefined)
        setChosenType({})
        instantDataBase(instantData)
    }


    return (
        <Modal show={openModal === 'default'} onClose={() => {
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
                <div className={'flex justify-between w-full'}>
                    <div className={'flex'}>
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
                        <GenPrice/>
                    </div>

                </div>


            </Modal.Footer>
        </Modal>
    );
};

export default InstantModal;