import React, {useEffect, useState} from 'react';
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {IOptions, IOrder, IPageInfo, IState} from "./types";
import MyTable from "../../../components/Tables";
import {OrderCols} from "./tableCols";
import Filter from "../../../components/filter";
import {IService, IUsers} from "../../../types/admin";
import {ArrayToOptions} from "../../../utils/helpers/arrayToOptions";
import {Pagination} from 'flowbite-react';
import Select from "react-select";

const pageSizeOptions: IOptions[] = [
    {id: 1, label: '10', value: '10'},
    {id: 2, label: '25', value: '25'},
    {id: 3, label: '50', value: '50'},
    {id: 4, label: '100', value: '100'}
];
const Orders = () => {

    const {services} = useServices()
    const [orders, setOrders] = useState<IOrder[]>([])
    const [pageInfo, setPageInfo] = useState<IPageInfo>({
        pageNumber: 1,
        pageSize: {id: 2, label: '25', value: '25'},
        totalCount: 0
    })
    const [options, setOptions] = useState<{ services: IService[], users: IUsers[] }>({
        services: [],
        users: []
    })
    const [selectedOptions, setSelectedOptions] = useState<{ services: IService | null, users: IUsers }>({
        services: null,
        users: null
    })

    const [state, setState] = useState<IState>({
        dateCreated: '',
        startDate: '',
        endDate: '',
        clientIdentifier: null,
    })

    const getOrders = () => {
        const data = {
            StartDate: state.startDate ? state.startDate : "2023-01-01",
            EndDate: state.endDate ? state.endDate : "2023-12-31",
            ServiceId: selectedOptions.services?.id ? selectedOptions.services.id : null,
            UserId: selectedOptions.users?.id ? selectedOptions.users.id : null,
            ClientIdentifier: state.clientIdentifier || '',
            PageSize: pageInfo.pageSize?.value ? +pageInfo.pageSize?.value : 25,
            PageNumber: pageInfo.pageNumber
        }
        services.Admin.getOrders(data).then(res => {
            setOrders(res.data.orders)
            setPageInfo({...pageInfo, totalCount: res.data.pageInfo?.totalCount})
        })
    }

    const checkApiCallType = (url: string) => {
        if (url.toLowerCase().includes('services')) {
            return 'services'
        }
        if (url.toLowerCase().includes('users')) {
            return 'users'
        }
    }

    useEffect(() => {
        Promise.all([services.Dashboard.getServices(true), services.Admin.getUsers(true)]).then(res => {
            res.forEach(item => {
                const {config, data} = item
                const checkType = checkApiCallType(config?.url) || ''
                const newArr = ArrayToOptions(data, checkType)
                setOptions((prevState) => ({
                    ...prevState,
                    [checkType]: newArr
                }))
            })
        })
    }, [])

    useEffect(() => {
        getOrders()
    }, [state, selectedOptions, pageInfo.pageNumber, pageInfo.pageSize])

    const handleOptionChange = (options, type) => {
        setSelectedOptions({
            ...selectedOptions,
            [type]: options
        })
    }

    const handleChange = (value, type) => {
        setState({
            ...state,
            [type]: value
        })
    }
    const totalCount = pageInfo.pageSize?.value ? pageInfo.totalCount / +pageInfo.pageSize?.value : 0

    return (
        <div>

            <Filter
                handleOptionChange={handleOptionChange}
                productServices={options.services}
                users={options.users}
                selectedService={selectedOptions.services}
                selectedUser={selectedOptions.users}
                handleChange={handleChange}
                state={state}
            />


            <div className={'px-2 my-3'}>
                <MyTable columnData={OrderCols} rowData={orders} iterationKey={'dateCreated'}/>
                {
                    totalCount > 1 && (
                        <div className={'flex items-center'}>
                            <Pagination
                                currentPage={pageInfo.pageNumber}
                                onPageChange={(page) => setPageInfo({...pageInfo, pageNumber: page})}
                                totalPages={totalCount}
                            />
                            <Select
                                menuPortalTarget={document.body}
                                value={pageInfo.pageSize}
                                options={pageSizeOptions}
                                onChange={(item: IOptions) => setPageInfo({...pageInfo, pageSize: item})}
                                styles={{
                                    menuPortal: base => (
                                        {...base, zIndex: 9999}
                                    ),
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderColor: state.isFocused ? '#14b8a6' : '#cbd5e1',
                                        backgroundColor: '#f8fafc',
                                        color: '#0f172a',
                                        marginTop: '0.5rem',
                                        marginLeft: 5
                                    })
                                }}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Orders;