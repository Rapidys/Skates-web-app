import React, {FC} from 'react';
import {Modal} from "flowbite-react";
import Button from "../../Button";


interface IAlertModal {
    openModal:string | undefined,
    setOpenModal:any,
    title:string,
    description:string,
    onYes?:() => void
}
const AlertModal:FC<IAlertModal> = ({openModal,setOpenModal,onYes,title,description}) => {
    return (
        <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)}>
            <Modal.Header>
                    <span className={'text-custom_light'}>
                       {title}
                    </span>
            </Modal.Header>
            <Modal.Body>
                    <span className={'text-custom_ocean'}>
                        {description}
                    </span>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() =>{
                    setOpenModal(undefined)
                    if (onYes) {
                        onYes()
                    }
                }} color={'danger'}>დიახ</Button>
                <Button color={'secondary'} onClick={() => setOpenModal(undefined)}>
                    არა
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AlertModal;