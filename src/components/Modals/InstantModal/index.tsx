import React, {FC, useEffect, useState} from 'react';
import {Checkbox, Modal} from "flowbite-react";
import Button from "../../Button";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import Select from "react-select";
import {IServices} from "../../../types/Dashboard";


interface IInstantModal {
    openModal: string | undefined,
    setOpenModal: any,
    title: string,
    onYes?: (type:string,chosenType:any) => void,
    instantData: any[],
    handleInstantChange: any,
    setInstantData: any,
}

const InstantModal: FC<IInstantModal> = ({openModal, setOpenModal, onYes, setInstantData, handleInstantChange, instantData, title}) => {


    const {services} = useServices()

    const [paymentTypes, setPaymentTypes] = useState([])

    const [chosenType, setChosenType] = useState<any>({})

    useEffect(() => () => setInstantData([]), []);

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

    return (
        <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)} >
            <Modal.Header>
                    <span className={'text-custom_light'}>
                       {title}
                    </span>
            </Modal.Header>
            <Modal.Body>
                <div style = {{minHeight:150}}>
                    {instantData?.map(item => {
                        return (
                            <div className={'flex w-full items-center justify-between'} key={item.id}>
                                <div className = {'flex w-1/3 justify-between items-center'}>
                                    <div className={'text-custom_ocean'}>
                                        {item?.displayName}
                                    </div>
                                    <div>
                                        <Checkbox checked={item?.checked} onChange={() => handleInstantChange(item)}/>
                                    </div>
                                </div>

                                <div>
                                    <Select
                                        options={paymentTypes}
                                        value={chosenType}
                                        placeholder={'გადახდის მეთოდი'}
                                        onChange={(value) => setChosenType(value)}
                                    />
                                </div>
                            </div>
                        )
                    })}

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    setOpenModal(undefined)
                    if (onYes) {
                        onYes('addWithInstant',chosenType)
                    }
                }} color={'danger'}>დიახ</Button>
                <Button color={'secondary'} onClick={() => setOpenModal(undefined)}>
                    არა
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InstantModal;