import React, {useEffect, useState} from 'react';
import {ServiceData} from "../../types/Dashboard";
import {adminheadDataServices, adminheadDataUsers} from "../../utils/constants/mock";
import MoreModal from "../Dashboard/MoreModal";
import Button from "../../components/Button";
import AlertModal from "../../components/Modals/AlertModal";
import Select from "react-select";
import ReferenceTable from "./_common/referenceTable";
import {useServices} from "../../context/Services/ServiceContextProvider";
import CreateUser from "./createUser";
import {deepCopy} from "../../utils/helpers/deepCopy";
import CreateService from "./createService";
import EditService from "./editService";

const Admin = () => {


    const [state, setState] = useState<{ head: any[], row: any[] }>({head: [], row:[]})

    const [openMoreModal, setOpenMoreModal] = useState<string | undefined>(undefined)
    const [serviceItem, setServiceItem] = useState({})
    const [openModal, setOpenModal] = useState<string | undefined>();
    const [isChecked,setIsChecked] = useState(false)
    const [modals,setOpenModals] = useState({
        createUserModal:false,
        createServiceModal:false
    })
    const [currentReference ,setCurrentReference] = useState<any>({})


    const { services } = useServices()


    const referenceOptions = [
        {id:1,label:'მომხმარებლების ადმინისტრირება',value:'მომხმარებლების ადმინისტრირება'},
        {id:2,label:'სერვისების ადმინისტრირება',value:'სერვისების ადმინისტრირება'},
        {id:3,label:'გადახდის მეთოდები',value:'გადახდის მეთოდები'},
    ]

    const getUsers = () => {
        const copiedUsersHead = deepCopy(adminheadDataServices)
        services.Admin.getUsers().then((res) => {
            setState({
                ...state,
                row:res?.data,
                head:copiedUsersHead
            })
        })
    }

    const getServices = () => {
        const copiedServiceHead = deepCopy(adminheadDataServices)
        services.Dashboard.getServices(true).then((res) => {
            setState({
                ...state,
                row:res?.data,
                head:copiedServiceHead
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


    const handleReferenceChange = (reference) => {
       if(reference.id === 1){
           getUsers()
       }
        if(reference.id === 2){
            getServices()
        }
        setCurrentReference(reference)
    }

    const handleOpenModal = () => {
        if(currentReference.id === 1){
            setOpenModals({...modals,createUserModal:true})
            return
        }
        if(currentReference.id === 2){
            setOpenModals({...modals,createServiceModal:true})
        }
    }


    return (
        <div className = {'px-2 py-2'}>
            <Select options={referenceOptions} onChange={handleReferenceChange} value={currentReference}/>
            <ReferenceTable state = {state} setState={setState} currentReference = {currentReference}/>
            <div className={'fixed bottom-0 right-0 p2 w-full shadow  flex justify-end items-center px-3 py-2 z-10'}>
                <Button className={'mr-2'}
                        color={'danger'}
                        onClick = {handleAttentionModal}
                        disabled={!isChecked}
                >წაშლა</Button>
                {/*<Button className={'mr-2'}*/}
                {/*        color={'danger'}*/}
                {/*        onClick = {handleAttentionModal}*/}
                {/*>შეცვლა</Button>*/}
                <Button
                    onClick={handleOpenModal}
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

            <EditService modals={modals} setOpenModals={setOpenModals} getServices = {getServices}/>

            <CreateService modals={modals} setOpenModals={setOpenModals} getServices = {getServices}/>

            <MoreModal openModal={openMoreModal} setOpenModal={setOpenMoreModal} data={serviceItem} />

        </div>
    );
};

export default Admin;