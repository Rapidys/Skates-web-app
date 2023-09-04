import React, {FC} from 'react';
import {Modal} from "flowbite-react";
import DatePicker from "../../fields/DatePicker";
import Button from '../../Button/index'
import {ServiceData} from "../../../types/Dashboard";
import ServiceDetails from "../../Tables/ServiceDetailTable";

interface IMoreModal {
    openModal: string | undefined,
    setOpenModal: any,
    data:ServiceData
}

const MoreModal: FC<IMoreModal> = ({openModal, setOpenModal,data}) => {

    return (
        <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)} size={'xl'}>
            <Modal.Header>დეტალები</Modal.Header>
            <Modal.Body>
                <div>

                    <div className = {'mb-3 flex-col py-2'}>
                        <ServiceDetails  data={data}/>
                    </div>
                    <div>
                        <h6 className={'text-sm text-custom_light font-bold'}>
                            ვალიდურია :
                        </h6>
                    </div>
                    <div className={'flex justify-between mt-3'}>
                        <div>
                            <DatePicker label={'დან'} labelClassName={'!text-custom_ocean'}/>
                        </div>
                        <div>
                            <DatePicker label={'მდე'} labelClassName={'!text-custom_ocean'}/>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    setOpenModal(undefined)
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