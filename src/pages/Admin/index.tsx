import React, {useEffect, useState} from 'react';
import ServiceTable from "../../components/Tables/ServiceTable";
import {IHeadData, ServiceData} from "../../types/Dashboard";
import {headData, rowActiveData, rowData} from "../../utils/constants/mock";
import MoreModal from "../../components/Modals/MoreModal";
import Button from "../../components/Button";
import {useAlert} from "../../context/alertContext";
import {Modal} from "flowbite-react";

const Admin = () => {
    const [state, setState] = useState<{ head: IHeadData[], row: ServiceData[] }>({head: headData, row: rowData})

    const [openMoreModal, setOpenMoreModal] = useState<string | undefined>(undefined)
    const [serviceItem, setServiceItem] = useState({})
    const [openModal, setOpenModal] = useState<string | undefined>();
    const [isChecked,setIsChecked] = useState(false)


    useEffect(() => {
        let isChecked = false
        state?.row.forEach((item) => {
            if(item.checked === true){
                isChecked = true
            }
        })
        setIsChecked(isChecked)
    },[state])

    const handleOpenMore = (item: ServiceData) => {
        setOpenMoreModal('default')
        setServiceItem(item)
    }
    const handleAttentionModal = () => {
        setOpenModal('default')
    }

    return (
        <div>
            <ServiceTable state={state} setState={setState} handleOpenMore={handleOpenMore} />
            <div className={'fixed bottom-0 right-0 p2 w-full shadow  flex justify-end items-center px-3 py-2 z-10'}>
                <Button className={'mr-2'}
                        color={'danger'}
                        onClick = {handleAttentionModal}
                        disabled={!isChecked}
                >წაშლა</Button>
                <Button
                    onClick={() => console.log('asd')}
                    color={'secondary'}
                >დამატება</Button>
            </div>

            <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)}>
                <Modal.Header>
                    <span className={'text-custom_light'}>
                       ყურადღება !
                    </span>
                </Modal.Header>
                <Modal.Body>
                    <span className={'text-custom_ocean'}>
                        ნამდვილად გსურთ არჩეული სერვის(ის / ების) წაშლა ?
                    </span>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(undefined)} color={'danger'}>დიახ</Button>
                    <Button color={'secondary'} onClick={() => setOpenModal(undefined)}>
                        არა
                    </Button>
                </Modal.Footer>
            </Modal>

            <MoreModal openModal={openMoreModal} setOpenModal={setOpenMoreModal} data={serviceItem}/>

        </div>
    );
};

export default Admin;