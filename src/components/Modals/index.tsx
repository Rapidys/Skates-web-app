import React, {FC} from 'react';
import {Modal} from "flowbite-react";


interface IAlertModal {
    openModal:boolean,
    setOpenModal:any,
    renderBody:() => JSX.Element,
    renderHeader:() => JSX.Element,
    modalFooter?:() => JSX.Element
}
const MyModal:FC<IAlertModal> = ({openModal,setOpenModal,renderBody,modalFooter,renderHeader}) => {
    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)} dismissible>
            <Modal.Header>
                {renderHeader()}
            </Modal.Header>
            <Modal.Body>
                {renderBody()}
            </Modal.Body>
            {modalFooter ? (
                <Modal.Footer>
                    {modalFooter()}
                </Modal.Footer>
            ): null}

        </Modal>
    );
};

export default MyModal;