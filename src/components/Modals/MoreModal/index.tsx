import React, {FC, useCallback, useEffect, useState} from 'react';
import {Modal} from "flowbite-react";
import DatePicker from "../../fields/DatePicker";
import Button from '../../Button/index'
import {ServiceData} from "../../../types/Dashboard";
import ServiceDetails from "../../Tables/ServiceDetailTable";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {format} from "date-fns";

interface IMoreModal {
    openModal: string | undefined,
    setOpenModal: any,
    data?: any,
    setData?: any,
    handleUpdateOrder?:any,
}

const MoreModal: FC<IMoreModal> = ({openModal,handleUpdateOrder, setOpenModal, data,setData}) => {



    const handleChangeDate = (value:any,type:string) => {
        setData({
            ...data,
            [type]:value,
        })
    }


    return (
        <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)} size={'xl'}>
            <Modal.Header>დეტალები</Modal.Header>
            <Modal.Body>
                <div>
                    <div className={'mb-3 flex-col py-2'}>
                        <ServiceDetails data={data}/>
                    </div>
                    <div>
                        <h6 className={'text-sm text-custom_light font-bold'}>
                            ვალიდურია :
                        </h6>
                    </div>
                    <div className={'flex justify-between mt-3'}>
                        {data?.startDate && data?.endDate && (
                            <>
                                <div>
                                    <DatePicker label={'დან'}
                                                labelClassName={'!text-custom_ocean'}
                                                date={data.startDate}
                                                onChange={(date) => handleChangeDate(date, 'startDate')}
                                    />
                                </div>
                                <div>
                                    <DatePicker label={'მდე'} labelClassName={'!text-custom_ocean'}
                                                date={data.endDate}
                                                onChange={(date) => handleChangeDate(date, 'endDate')}
                                    />
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    setOpenModal(undefined)
                    const obj = {
                        orderId:data.orderId,
                        startDate:format(data.startDate, 'yyyy-MM-dd'),
                        endDate:format(data.endDate, 'yyyy-MM-dd')
                    }
                    handleUpdateOrder(obj)
                }}
                        color="secondary"
                >შეცვლა</Button>
                <Button onClick={() => setOpenModal(undefined)}>
                    დახურვა
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MoreModal;