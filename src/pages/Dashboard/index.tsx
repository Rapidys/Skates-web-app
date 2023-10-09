import React, {useEffect, useState} from 'react';
import {IHeadData, ServiceData} from "../../types/Dashboard";
import AddServiceModal from "./AddServiceModal";
import Button from "../../components/Button";
import MoreModal from "./MoreModal";
import {useServices} from "../../context/Services/ServiceContextProvider";
import {useAccount} from "../../context/AccountContext";
import AlertModal from "../../components/Modals/AlertModal";
import InstantModal from "./InstantModal";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import CommentsModal from "../../components/Modals/CommentsModal";
import MyTable from "../../components/Tables";
import dashboardCols from "./dashboardCols";
import {Checkbox} from "flowbite-react";

const Dashboard = () => {

    const navigate = useNavigate()
    const {ClientId, cardNumber, handleClear} = useAccount()
    const {services} = useServices()

    const [onlyActive, setOnlyActive] = useState(true)
    const [headCheckboxValue, setHeadCheckBoxValue] = useState(false)
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState<{ row: ServiceData[] }>({row: []})
    const [modals, setModals] = useState({
        addServiceModal: false,
        moreModal: false,
        commentsModal: false,
        instantModal: false,
    })
    const [openConsumeAlert, setOpenConsumeAlert] = useState(false)
    const [myServiceItems, setMyServiceItem] = useState<ServiceData>({})
    const [instantData, setInstantData] = useState([])


    const recreateRow = (data: any) => {
        const newArr = data?.data.map((element: any) => {
            return {...element, checked: false}
        })
        return newArr
    }

    const instantDataBase = (data: any) => {
        const arr: any = []
        data.forEach((element: any) => {
            if (element?.isInstant) {
                arr.push({...element, checked: false})
            }
        })
        setInstantData(arr)
    }

    const handleCheckbox = (item: ServiceData) => {
        const copiedState = {...state}
        const newRow = [...copiedState.row]
        const checkedItem = newRow.find(el => el.orderId === item.orderId)

        if (checkedItem) {
            checkedItem.checked = !checkedItem.checked
            setState({
                ...state,
                row: newRow,
            })
        }
    }

    const handleHeadCheckboxChange = () => {
        const newState = {...state}
        const newRow = [...newState.row]

        const arr: ServiceData[] = []
        newRow.forEach((element) => {
            arr.push({...element, checked: !headCheckboxValue})
        })
        setState({
            ...newState,
            row: arr
        })
        setHeadCheckBoxValue(!headCheckboxValue)
    }


    const getClientOrders = (active?) => {
        try {
            setLoading(true)
            services.Dashboard.getClientOrders(ClientId, active !== undefined ? active : onlyActive).then(res => {
                const newArr = recreateRow(res)
                setLoading(false)
                setState({
                    ...state,
                    row: newArr,
                })
            })
        } catch (e) {
            console.log(e)
        }
    }

    const getServices = () => {
        try {
            services.Dashboard.getServices().then(res => {
                instantDataBase(res?.data)
            })
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        getClientOrders()
        getServices()
    }, []);


    const handleConsumeOrder = (type: string, paymentType?: any) => {

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
            paymentType: paymentType?.id
        }
        services.Dashboard.consumeOrder(data).then(res => {
            services.Dashboard.getClientOrders(ClientId).then(serv => {
                const newArr = recreateRow(serv)
                navigate('/findAccount')
                setState({
                    ...state,
                    row: newArr,
                })
            })
        })

    }

    const deleteOrder = () => {
        try {
            services.Dashboard.deleteOrder(myServiceItems.orderId).then(res => {
                setModals({...modals, moreModal: false})
                getClientOrders()
            })
        } catch (e) {
            console.log(e)
        }
    }

    const handleComment = (com: string, callback: () => void) => {
        const comment = {
            Orderid: myServiceItems.orderId,
            Content: com
        }
        services.Dashboard.comment(comment).then(res => {
            callback()
        })
    }


    const checkBtnDis = () => {
        return state.row?.some(el => el.checked)
    }

    const handleInstantChange = (item: any) => {
        const copiedInstants: any = [...instantData]
        const finEl = copiedInstants.findIndex((el: any) => el?.id === item?.id)
        copiedInstants[finEl].checked = !copiedInstants[finEl].checked
        setInstantData(copiedInstants)
    }

    const handleUpdateOrder = (data: any) => {
        services.Dashboard.updateOrder(data).then(res => {
            getClientOrders()
        })
    }

    const handleCloseModal = (modalType: string) => {
        setModals({...modals, [modalType]: false})
    }

    const handleOpenModal = (modalType: string, item?: ServiceData) => {
        setModals({...modals, [modalType]: true})
        if (modalType === 'moreModal' || modalType === 'commentsModal') {
            setMyServiceItem({
                ...item,
                startDate: new Date(item.startDate),
                endDate: new Date(item.endDate),
                orderId: item.orderId
            })
            return
        }
    }

    const onCellAction = (item, title, props) => {
        switch (title.type) {
            default: {
                handleOpenModal(title.type, item)
            }
        }
    }

    return (
        <div className={'w-full h-full px-2'}>

            <div className={'flex justify-between items-center'}>
                <div>
                    <h3 className={'text-lg text-custom_light py-2'}>
                        არსებული სერვისები
                    </h3>
                </div>

                <div className={'mr-2'}>
                    <Checkbox
                        id={'onlyActive'}
                        checked={onlyActive}
                        className={'mr-2'}
                        onChange={() => {
                            setOnlyActive(!onlyActive)
                            setHeadCheckBoxValue(false)
                            getClientOrders(!onlyActive)
                        }}/>
                    <label htmlFor="onlyActive" className={'font-light text-sm'}>მხოლოდ აქტიური სერვისები</label>
                </div>
            </div>
            <MyTable
                columnData={dashboardCols}
                rowData={state.row}
                onCellClick={onCellAction}
                iterationKey={'orderId'}
                onChange={handleCheckbox}
                onChangeHead={handleHeadCheckboxChange}
                onRowClick={(item) => navigate(`${item.orderId}`)}
                loading={loading}
                headCheckboxValue={headCheckboxValue}
            />

            <div style={{height: 60, width: '100%'}}/>

            <div
                className={'fixed bottom-0 right-0 p2 w-full shadow  flex justify-between items-center px-3 py-2 z-10'}>
                <div>
                    <Button className={'mr-2'}
                            onClick={() => {
                                handleClear()
                                navigate('/findAccount')
                            }}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className={`mr-2`}/>
                        <span>უკან</span>
                    </Button>
                </div>
                <div className={'flex flex-col md:flex-row'}>
                    <Button className={'mb-2 md:mb-0 md:mr-2'}
                            disabled={!checkBtnDis()}
                            onClick={() => {
                                handleOpenModal('instantModal')
                            }}
                    >გამოყენება & დამატება</Button>
                    <Button className={'mb-2 md:mb-0 md:mr-2'}
                            onClick={() => setOpenConsumeAlert(true)}
                            disabled={!checkBtnDis()}
                    >გამოყენება</Button>
                    <Button
                        onClick={() => handleOpenModal('addServiceModal')}
                        color={'secondary'}
                    >დამატება</Button>
                </div>

            </div>
            <AlertModal
                openModal={openConsumeAlert}
                setOpenModal={setOpenConsumeAlert}
                title={'ყურადღებით !'}
                onYes={() => {
                    handleConsumeOrder('add')
                }}
                description={'ნამდვილად გსურთ სერვისის გამოყენება ?'}
            />
            <InstantModal
                onYes={handleConsumeOrder}
                handleInstantChange={handleInstantChange}
                instantData={instantData}
                openModal={modals.instantModal}
                handleCloseModal={handleCloseModal}
                title={'სწრაფი სერვისები'}
                instantDataBase={instantDataBase}
            />
            <MoreModal
                openModal={modals.moreModal}
                handleUpdateOrder={handleUpdateOrder}
                handleCloseModal={handleCloseModal}
                data={myServiceItems}
                setData={setMyServiceItem}
                deleteOrder={deleteOrder}
            />
            <AddServiceModal openModal={modals.addServiceModal} handleCloseModal={handleCloseModal}
                             callbackFn={getClientOrders}/>
            <CommentsModal
                openModal={modals.commentsModal}
                handleCloseModal={handleCloseModal}
                title={'კომენტარები'}
                onSend={handleComment}
                orderId={myServiceItems.orderId}
            />
        </div>
    );
};

export default Dashboard;