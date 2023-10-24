import React, {useEffect, useState} from 'react';
import Button from "../../../components/Button";
import AlertModal from "../../../components/Modals/AlertModal";
import Select from "react-select";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {IServiceItem} from "../../Dashboard/types";
import {IUsers} from "../../../types/auth";
import {IPaymentTypes} from "../../../types";
import {IAdminReferenceOptions, IService} from "../../../types/admin";
import MyTable from "../../../components/Tables";
import {paymentTypeCols, servicesCols, trainersCols, usersCols} from "./tableCols";
import CreateService from "./createService";
import CreateUser from './createUser';
import CreatePaymentType from "./createPaymentType";
import CreateTrainers from "./createTrainers";
import {IModal} from "./types";
import MySelect from "../../../components/fields/select";

const Admin = () => {


    const [loading,setLoading] = useState(false)
    const [state, setState] = useState<IAdminReferenceOptions>({
        services: {head: [], row: []},
        paymentTypes: {head: [], row: []},
        users: {head: [], row: []},
        trainers: {head: [], row: []},
    })

    const [modals, setOpenModals] = useState<IModal>({
        createUserModal: false,
        createServiceModal: false,
        alertModal: false,
        createPaymentType: false,
        createTrainers: false,
    })
    const [currentState, setCurrentState] = useState<any>(null)
    const [currentReference, setCurrentReference] = useState<any>({
        id: 1,
        label: 'მომხმარებლების ადმინისტრირება',
        value: 'users'
    })
    const [currentReferenceItem, setCurrentReferenceItem] = useState<IServiceItem>(null)

    const {services} = useServices()


    const referenceOptions = [
        {id: 1, label: 'მომხმარებლების ადმინისტრირება', value: 'users'},
        {id: 2, label: 'სერვისების ადმინისტრირება', value: 'services'},
        {id: 3, label: 'გადახდის მეთოდები', value: 'paymentTypes'},
        {id: 4, label: 'ტრენერები', value: 'trainers'},
    ]


    const getUsers = () => {
        try {
            services.Admin.getUsers().then(res => {
                setValues([res])
            })
        } catch (e) {
            console.log(e)
        }
    }

    const getServices = () => {
        try {
            services.Dashboard.getServices(true).then(res => {
                setValues([res])
            })
        } catch (e) {
            console.log(e)
        }
    }
    const getPaymentTypes = () => {
        try {
            services.Dashboard.getPaymentTypes(true).then(res => {
                setValues([res])
            })
        } catch (e) {
            console.log(e)
        }
    }
    const getTrainers = () => {
        try {
            services.Dashboard.getTrainers(true).then(res => {
                setValues([res])
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setLoading(true)
        Promise.all([
                services.Admin.getUsers(),
                services.Dashboard.getServices(true),
                services.Dashboard.getPaymentTypes(true),
                services.Dashboard.getTrainers(true),
            ]
        ).then((res) => {
            setValues(res)
            setLoading(false)
        })
    }, [])


    const setValues = (response: any[]) => {
        type responseProps = Record<'data', IService[] | IUsers | IPaymentTypes>
        let newObj: any = {}
        response?.forEach(({data, config}: responseProps | any) => {
            const value = checkStateType(config?.url)
            newObj = {...newObj, [(value.stateType as any)]: {row: data, head: value.head, type: value.stateType}}
        })
        setState({
            ...state,
            ...newObj
        })
        if (!currentState) {
            setCurrentState({...newObj?.users})
        }
        if (currentState) {
            setCurrentState({...newObj[currentState.type]})
        }
    }

    const checkStateType = (url: string) => {
        switch (true) {
            case url.toLowerCase().includes('getservices') :
                return {stateType: 'services', head: servicesCols}
            case url.toLowerCase().includes('getusers') :
                return {stateType: 'users', head: usersCols}
            case url.toLowerCase().includes('getpaymenttypes') :
                return {stateType: 'paymentTypes', head: paymentTypeCols}
            case url.toLowerCase().includes('trainers') :
                return {stateType: 'trainers', head: trainersCols}
        }
    }

    const handleReferenceChange = (reference) => {
        setCurrentReference(reference)
        setCurrentState(state[(reference.value as any)])
    }


    const handleOpenModal = () => {
        if (currentReference.id === 1) {
            setOpenModals({...modals, createUserModal: true})
            return
        }
        if (currentReference.id === 2) {
            setOpenModals({...modals, createServiceModal: true})
            return
        }
        if (currentReference.id === 3) {
            setOpenModals({...modals, createPaymentType: true})
            return
        }
        if (currentReference.id === 4) {
            setOpenModals({...modals, createTrainers: true})
            return
        }
    }

    const handleDeleteUndoService = () => {
        const data = {
            ...currentReferenceItem,
            isActive: !currentReferenceItem.isActive
        }
        if (currentReference.id === 1) {
            services.Admin.updateUsers({...data, password: ''}).then(res => {
                getUsers()
                setOpenModals({
                    ...modals,
                    alertModal: false
                })
            })
        }
        if (currentReference.id === 2) {
            services.Admin.updateService(data).then(res => {
                getServices()
                setOpenModals({
                    ...modals,
                    alertModal: false
                })
            })
        }
        if (currentReference.id === 3) {
            services.Admin.updatePaymentTypes(data).then(res => {
                getPaymentTypes()
                setOpenModals({
                    ...modals,
                    alertModal: false
                })
            })
        }
        if (currentReference.id === 4) {
            services.Admin.updateTrainers(data).then(res => {
                getTrainers()
                setOpenModals({
                    ...modals,
                    alertModal: false
                })
            })
        }
        setCurrentReferenceItem(null)
    }

    const handleEdit = ({item, remove, modalType}: any) => {
        if (remove) {
            setCurrentReferenceItem(item)
            //remove modal
            setOpenModals((prevState) => ({
                ...prevState,
                alertModal: true
            }))
            return
        }
        setCurrentReferenceItem(item)
        setOpenModals({
            ...modals,
            [modalType]: true
        })
    }

    const onRowClick = (item, title) => {
        if(title.type === 'actions'){
            if (item?.isActive) {
                handleEdit({item, remove: 'undo'})
                return
            }
            if (!item?.isActive) {
                handleEdit({item, remove: 'remove'})
                return
            }

        }
        if(title.type === 'more'){
            switch (currentReference.value) {
                case 'users':{
                    handleEdit({item, modalType: 'createUserModal'})
                    break;
                }
                case 'services':{
                    handleEdit({item, modalType: 'createServiceModal'})
                    break;
                }
                case 'paymentTypes': {
                    handleEdit({item, modalType: 'createPaymentType'})
                    break;
                }
                case 'trainers':{
                    handleEdit({item, modalType: 'createTrainers'})
                }
            }
        }

    }


    return (
        <div className={'px-2 py-4'}>
            <div className={'mt-2 mb-2'}>
                <MySelect options={referenceOptions} onSelectChange={handleReferenceChange} value={currentReference}/>
            </div>

            <div className={'mb-12'}>
                <MyTable
                    columnData={currentState?.head}
                    rowData={currentState?.row}
                    onCellClick={onRowClick}
                    loading = {loading}
                />
            </div>

            <div className={'fixed bottom-0 right-0 p2 w-full shadow  flex justify-end items-center px-3 py-2 z-10'}>
                <Button
                    onClick={handleOpenModal}
                    color={'secondary'}
                >დამატება</Button>
            </div>


            <AlertModal
                title={'ყურადღება !'}
                description={currentReferenceItem?.isActive ? 'ნამდვილად გსურთ არჩეული სერვისის წაშლა ?' : 'ნამდვილად გსურთ არჩეული სერვისის გააქტიურება ?'}
                openModal={modals.alertModal}
                setOpenModal={(bool: any) => setOpenModals({...modals, alertModal: false})}
                onYes={handleDeleteUndoService}
            />

            <CreatePaymentType
                modals={modals}
                setModals={setOpenModals}
                currentReferenceItem={currentReferenceItem}
                getCall={getPaymentTypes}
                setCurrentServiceItem={setCurrentReferenceItem}
            />

            <CreateTrainers
                modals={modals}
                setModals={setOpenModals}
                setCurrentTrainersItem={setCurrentReferenceItem}
                currentTrainerItem={currentReferenceItem}
                getTrainers={getTrainers}
            />

            <CreateUser
                modals={modals}
                setOpenModal={setOpenModals}
                getUsers={getUsers}
                currentUserItem={currentReferenceItem}
                setCurrentUserItem={setCurrentReferenceItem}
            />

            <CreateService
                modals={modals}
                setOpenModals={setOpenModals}
                getServices={getServices}
                currentServiceItem={currentReferenceItem}
                setCurrentServiceItem={setCurrentReferenceItem}
            />


        </div>
    );
};

export default Admin;