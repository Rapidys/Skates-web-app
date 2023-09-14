import React, {useEffect, useState} from 'react';
import ServiceTable from "../../components/Tables/ServiceTable";
import {IHeadData, IServices, ServiceData} from "../../types/Dashboard";
import {headData, rowActiveData} from "../../utils/constants/mock";
import AddServiceModal from "../../components/Modals/AddServiceModal";
import Button from "../../components/Button";
import MoreModal from "../../components/Modals/MoreModal";
import {useServices} from "../../context/Services/ServiceContextProvider";
import {useAccount} from "../../context/AccountContext";
import AlertModal from "../../components/Modals/AlertModal";
import InstantModal from "../../components/Modals/InstantModal";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {

    const [state, setState] = useState<{ head: IHeadData[], row: ServiceData[] }>({head: [], row: []})
    const [openModal, setOpenModal] = useState<string | undefined>(undefined)
    const [openMoreModal, setOpenMoreModal] = useState<string | undefined>(undefined)
    const [openConsumeAlert, setOpenConsumeAlert] = useState<string | undefined>(undefined)
    const [openInstantModal, setOpenInstantModal] = useState<string | undefined>(undefined)
    const [myServiceItems, setMyServiceItem] = useState({})

    const [instantData, setInstantData] = useState([])

    const navigate = useNavigate()
    const {ClientId, cardNumber} = useAccount()
    const {services} = useServices()

    const recreateRow = (data: any) => {
        const newArr = data?.data.map((element: any) => {
            return {...element, checked: false}
        })
        return newArr
    }

    const getClientOrders = () => {
        services.Dashboard.getClientOrders(ClientId).then(res => {
            const newArr = recreateRow(res)
            setState({
                ...state,
                row: newArr,
                head: headData
            })
        })
    }

    const getServices = () => {
        services.Dashboard.getServices().then(res => {
            const arr: any = []
            res?.data.forEach((element: any) => {
                if (element?.isInstant) {
                    arr.push({...element, checked: false})
                }
            })
            setInstantData(arr)
        })
    }

    useEffect(() => {
        getClientOrders()
    }, []);


    useEffect(() => {
        if (openInstantModal) {
            getServices()
        }
    }, [openInstantModal]);

    const handleAddServiceModal = () => {
        setOpenModal('default')
    }


    const handleConsumeOrder = (type: string,paymentType?:any) => {
        const ordersArr: any = []
        state?.row.forEach(element => {
            if (element?.checked) {
                ordersArr.push(element?.orderId)
            }
        })
        const instantOrd: any = []
        if (type !== 'add') {
            instantData.forEach((element: any) => {
                if (element?.checked) {
                    instantOrd.push(element.id)
                }
            })
        }
        const data = {
            ClientId,
            identifier: cardNumber,
            orders: ordersArr,
            instantOrders: instantOrd,
            paymentType:paymentType?.id
        }
        services.Dashboard.consumeOrder(data).then(res => {
            services.Dashboard.getClientOrders(ClientId).then(serv => {
                const newArr = recreateRow(serv)
                const defHead = headData.map((item) => {
                    if (item?.checked) {
                        return {...item, checked: false}
                    } else {
                        return item
                    }
                })
                setState({
                    ...state,
                    row: newArr,
                    head: defHead
                })
            })
        })

    }

    const handleOpenMore = (item: ServiceData) => {
        setOpenMoreModal('default')
        // @ts-ignore
        setMyServiceItem({...item, startDate: new Date(item.startDate), endDate: new Date(item.endDate), orderId: item.orderId})
    }

    const checkBtnDis = () => {
        let isDis = false
        state?.row?.forEach(element => {
            if (element.checked) {
                isDis = true
            }
        })
        return isDis
    }

    const handleInstantChange = (item: any) => {
        const copiedInstants: any = [...instantData]
        const finEl = copiedInstants.findIndex((el: any) => el?.id === item?.id)
        copiedInstants[finEl].checked = !copiedInstants[finEl].checked
        setInstantData(copiedInstants)
    }

    const handleUpdateOrder = (data:any) => {
        services.Dashboard.updateOrder(data).then(res => {
            getClientOrders()
        })
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
                setState={setState}
                handleOpenMore={handleOpenMore}
            />
            <div className={'fixed bottom-0 right-0 p2 w-full shadow  flex justify-end items-center px-3 py-2 z-10'}>
                <Button className={'mr-2'}
                        disabled={!checkBtnDis()}
                        onClick={() => {
                            setOpenInstantModal('default')
                        }}
                >გამოყენება & დამატება</Button>
                <Button className={'mr-2'}
                        onClick={() => setOpenConsumeAlert('default')}
                        disabled={!checkBtnDis()}
                >გამოყენება</Button>
                <Button
                    onClick={handleAddServiceModal}
                    color={'secondary'}
                >დამატება</Button>
            </div>
            <AlertModal
                openModal={openConsumeAlert}
                setOpenModal={setOpenConsumeAlert}
                title={'ყურადღებით !'}
                onYes={() => {
                    handleConsumeOrder('add')
                    navigate('/findAccount')
                }}
                description={'ნამდვილად გსურთ სერვისის გამოყენება ?'}
            />
            <InstantModal
                onYes={ handleConsumeOrder}
                handleInstantChange={handleInstantChange}
                instantData={instantData}
                openModal={openInstantModal}
                setOpenModal={setOpenInstantModal}
                title={'სწრაფი სერვისები'}
                setInstantData={setInstantData}
            />
            <MoreModal openModal={openMoreModal} handleUpdateOrder={handleUpdateOrder} setOpenModal={setOpenMoreModal}
                       data={myServiceItems} setData={setMyServiceItem}/>
            <AddServiceModal openModal={openModal} setOpenModal={setOpenModal} callbackFn = {getClientOrders}/>
        </div>
    );
};

export default Dashboard;