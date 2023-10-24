import React, {FC, useEffect, useState} from 'react';
import {Modal} from "flowbite-react";
import Button from '../../../components/Button'
import ServiceDetails from "../../../components/Tables/ServiceDetailTable";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {IOptions} from "../../Admin/orders/types";
import MyDatePicker from "../../../components/fields/DatePickerV2";
import {ITrainers} from "../../../types";

interface IMoreModal {
    openModal: boolean,
    handleCloseModal: (modalType: string) => void,
    data?: any,
    setData?: any,
    handleUpdateOrder?: any,
    deleteOrder: () => void,
    trainers: ITrainers[]
}

const MoreModal: FC<IMoreModal> = ({
                                       openModal,
                                       handleUpdateOrder,
                                       handleCloseModal,
                                       data,
                                       setData,
                                       deleteOrder,
                                       trainers
                                   }) => {


    const [currentTrainer, setCurrentTrainer] = useState<any>({})
    const handleChangeDate = (value: any, type: string) => {
        setData(prevData => ({
            ...prevData,
            [type]: value,
        }))
    }


    useEffect(() => {
        if (openModal) {
            const trainerInfo = trainers.find(el => el.displayName === data.trainer)
            setCurrentTrainer(trainerInfo)
        }
    }, [openModal])

    const handleChangeTrainer = (option) => {
        setCurrentTrainer(option)
    }


    return (
        <Modal show={openModal} onClose={() => handleCloseModal('moreModal')} size={'xl'} dismissible>
            <Modal.Header>დეტალები</Modal.Header>
            <Modal.Body>
                <div>
                    <div className={'mb-3 flex-col py-2'}>
                        <ServiceDetails
                            data={data}
                            trainers={trainers}
                            value={currentTrainer}
                            handleChangeTrainer={handleChangeTrainer}
                        />
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
                                    <MyDatePicker label={'დან'}
                                                  value={data.startDate}
                                                  handleChange={(date) => handleChangeDate(date, 'startDate')}
                                                  labelClassName={'!text-custom_ocean'}
                                    />
                                </div>
                                <div>
                                    <MyDatePicker label={'მდე'}
                                                  labelClassName={'!text-custom_ocean'}
                                                  value={data.endDate}
                                                  handleChange={(date) => handleChangeDate(date, 'endDate')}
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
                            startDate: data.startDate,
                            endDate: data.endDate,
                            TrainerId: currentTrainer?.id
                        }
                        handleUpdateOrder(obj)
                    }}
                            color="primary"
                            className={'w-full sm:w-auto'}
                    >შეცვლა</Button>
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