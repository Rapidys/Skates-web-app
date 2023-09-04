import React, {useState} from 'react';
import {Button, Table} from "flowbite-react";
import ServiceTable from "../../components/ServiceTable";
import {ServiceData} from "../../types/Dashboard";
import {headData, rowActiveData, rowData} from "../../utils/constants/mock";
import AddServiceModal from "../../components/Modals/AddServiceModal";

const Dashboard = () => {

    const [state, setState] = useState({head: headData, row: rowActiveData})
    const [openModal, setOpenModal] = useState<string | undefined>(undefined)
    const handleUpdateTable = (item: ServiceData) => {
        const newRow = [...state.row]
        const checkedItem = newRow.find(el => el.id === item.id)
        if (checkedItem) {
            checkedItem.checked = !checkedItem.checked
            setState({
                ...state,
                row: newRow
            })
        }
    }

    const handleAddServiceModal = () => {
        setOpenModal('default')
    }

    const handleAddService = (service:any) => {
        if(service?.length > 0){
            const newRow:any = [...state.row]
            service?.map((item:any) => {
                newRow.push({id:newRow.length,serviceValue: item.label, trainer: '', price: '120', active: 'არა',checked:false,})
            })

            setState({
                ...state,
                row:newRow
            })
        }
    }

    const handleOpenMore = () => {

    }

    return (
        <div className={'w-full h-full px-2'}>

            <div>
                <h3 className={'text-lg text-custom_light py-2'}>
                    არსებული სერვისები
                </h3>
            </div>
            <ServiceTable rowData={state.row} headData={state.head} handleUpdateTable={handleUpdateTable} handleOpenMore = {handleOpenMore}/>
            <div className={'fixed bottom-0 right-0 p2 w-full bg-custom_dark flex justify-end items-center px-3 py-2'}>
                <Button className={'mr-2'}>გამოყენება</Button>
                <Button
                    onClick={handleAddServiceModal}
                >დამატება</Button>
            </div>
            <AddServiceModal openModal={openModal} setOpenModal={setOpenModal} handleAddService = {handleAddService}/>
        </div>
    );
};

export default Dashboard;