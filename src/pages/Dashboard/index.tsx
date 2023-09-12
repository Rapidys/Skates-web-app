import React, {useEffect, useState} from 'react';
import ServiceTable from "../../components/Tables/ServiceTable";
import {IHeadData, IServices, ServiceData} from "../../types/Dashboard";
import {headData, rowActiveData} from "../../utils/constants/mock";
import AddServiceModal from "../../components/Modals/AddServiceModal";
import Button from "../../components/Button";
import MoreModal from "../../components/Modals/MoreModal";
import {useServices} from "../../context/Services/ServiceContextProvider";

const Dashboard = () => {

    const [state, setState] = useState<{head:IHeadData[],row:ServiceData[]}>({head: headData, row: rowActiveData})
    const [openModal, setOpenModal] = useState<string | undefined>(undefined)
    const [openMoreModal, setOpenMoreModal] = useState<string | undefined>(undefined)
    const [myServiceItems, setMyServiceItem] = useState({})



    const handleAddServiceModal = () => {
        setOpenModal('default')
    }

    const handleAddService = (service: any) => {
        if (service?.length > 0) {
            const newRow: any = [...state.row]
            service?.map((item: any) => {
                newRow.push({
                    id: item.id,
                    serviceValue: item.label,
                    trainer: '',
                    price: item.price,
                    active: item.active,
                    checked: false,
                    count: item.count,
                })
            })
            setState({
                ...state,
                row: newRow
            })
        }
    }



    const handleOpenMore = (item: ServiceData) => {
        setOpenMoreModal('default')
        setMyServiceItem(item)
    }

    return (
        <div className={'w-full h-full px-2'}>

            <div>
                <h3 className={'text-lg text-custom_light py-2'}>
                    არსებული სერვისები
                </h3>
            </div>
            <ServiceTable
                state={state}
                setState = {setState}
                handleOpenMore={handleOpenMore}
            />
            <div className={'fixed bottom-0 right-0 p2 w-full shadow  flex justify-end items-center px-3 py-2 z-10'}>
                <Button className={'mr-2'}
                >გამოყენება & დამატება</Button>
                <Button className={'mr-2'}
                >გამოყენება</Button>
                <Button
                    onClick={handleAddServiceModal}
                    color={'secondary'}
                >დამატება</Button>
            </div>
            <MoreModal openModal={openMoreModal} setOpenModal={setOpenMoreModal} data={myServiceItems}/>
            <AddServiceModal openModal={openModal} setOpenModal={setOpenModal} handleAddService={handleAddService}/>
        </div>
    );
};

export default Dashboard;