import React, {useEffect, useState} from 'react';
import {ServiceData} from "../../types/Dashboard";
import {adminheadData} from "../../utils/constants/mock";
import MoreModal from "../Dashboard/MoreModal";
import Button from "../../components/Button";
import AlertModal from "../../components/Modals/AlertModal";
import Select from "react-select";
import ReferenceTable from "./_common/referenceTable";
import {useServices} from "../../context/Services/ServiceContextProvider";
import CreateUser from "./createUser";

const Admin = () => {


    const [state, setState] = useState<{ head: any[], row: any[] }>({head: adminheadData, row:[]})

    const [openMoreModal, setOpenMoreModal] = useState<string | undefined>(undefined)
    const [serviceItem, setServiceItem] = useState({})
    const [openModal, setOpenModal] = useState<string | undefined>();
    const [isChecked,setIsChecked] = useState(false)
    const [modals,setOpenModals] = useState({
        createUserModal:undefined,
    })


    const { services } = useServices()


    const referenceOptions = [
        {id:1,label:'მომხმარებლების ადმინისტრირება',value:'მომხმარებლების ადმინისტრირება'},
    ]

    const getUsers = () => {
        services.Admin.getUsers().then((res) => {
            setState({
                ...state,
                row:res?.data
            })
        })
    }

    useEffect(() => {
        getUsers()
    },[])

    const handleOpenMore = (item: ServiceData) => {
        setOpenMoreModal('default')
        setServiceItem(item)
    }
    const handleAttentionModal = () => {
        setOpenModal('default')
    }

    return (
        <div className = {'px-2 py-2'}>
            <Select options={referenceOptions}/>
            <ReferenceTable state = {state} setState={setState}/>
            <div className={'fixed bottom-0 right-0 p2 w-full shadow  flex justify-end items-center px-3 py-2 z-10'}>
                <Button className={'mr-2'}
                        color={'danger'}
                        onClick = {handleAttentionModal}
                        disabled={!isChecked}
                >წაშლა</Button>
                <Button
                    onClick={() => setOpenModals({...modals,createUserModal:'default'})}
                    color={'secondary'}
                >დამატება</Button>
            </div>


            <AlertModal
                title = {'ყურადღება !'}
                description = {'ნამდვილად გსურთ არჩეული სერვის(ის / ების) წაშლა ?'}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />

            <CreateUser  modals={modals} setOpenModal={setOpenModals} getUsers = {getUsers}/>

            <MoreModal openModal={openMoreModal} setOpenModal={setOpenMoreModal} data={serviceItem} />

        </div>
    );
};

export default Admin;