import React, {FC, useCallback, useEffect, useState} from 'react';
import {Modal} from "flowbite-react";
import DatePicker from "../../../components/fields/DatePicker";
import Button from '../../../components/Button'
import {ServiceData} from "../../../types/Dashboard";
import ServiceDetails from "../../../components/Tables/ServiceDetailTable";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {format} from "date-fns";

interface IMoreModal {
    openModal: boolean,
    handleCloseModal: (modalType: string) => void,
    data?: any,
    setData?: any,
    handleUpdateOrder?: any,
    deleteOrder: () => void,
}

const MoreModal: FC<IMoreModal> = ({openModal, handleUpdateOrder, handleCloseModal, data, setData, deleteOrder}) => {


    const handleChangeDate = (value: any, type: string) => {
        setData({
            ...data,
            [type]: value,
        })
    }

    return (
        <Modal show={openModal} onClose={() => handleCloseModal('moreModal')} size={'xl'} dismissible>
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
                    <div className={'flex flex-col sm:flex-row justify-between mt-3'}>
                        {data?.startDate && data?.endDate && (
                            <>
                                <div>
                                    <DatePicker label={'დან'}
                                                labelClassName={'!text-custom_ocean'}
                                                date={data.startDate}
                                                onChange={(date) => handleChangeDate(date, 'startDate')}
                                                className={'custom-date-picker !ring-0'}
                                    />
                                </div>
                                <div>
                                    <DatePicker label={'მდე'} labelClassName={'!text-custom_ocean'}
                                                date={data.endDate}
                                                onChange={(date) => handleChangeDate(date, 'endDate')}
                                                className={'custom-date-picker !ring-0'}
                                    />
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className={'flex flex-col sm:flex-row justify-between'}>
                <div className={'flex w-full sm:w-auto'}>
                    <Button onClick={() => {
                        handleCloseModal('moreModal')
                        const obj = {
                            orderId: data.orderId,
                            startDate: format(data.startDate, 'yyyy-MM-dd'),
                            endDate: format(data.endDate, 'yyyy-MM-dd')
                        }
                        handleUpdateOrder(obj)
                    }}
                            color="secondary"
                            className={'w-full sm:w-auto'}
                    >შეცვლა</Button>
                    <Button
                        className={'ml-2 w-full sm:w-auto'}
                        onClick={() => handleCloseModal('moreModal')}>
                        დახურვა
                    </Button>
                </div>
                <div className={'mt-2 w-full sm:mt-0 sm:w-auto'}>
                    <Button onClick={deleteOrder} color={'danger'} className={'w-full sm:w-auto'}>
                        წაშლა
                    </Button>
                </div>

            </Modal.Footer>
        </Modal>
    );
};

export default MoreModal;