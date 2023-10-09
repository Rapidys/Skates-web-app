import React, {useEffect, useState} from 'react';
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {IOptions, IOrder, IPageInfo, IState} from "./types";
import MyTable from "../../../components/Tables";
import {OrderCols} from "./tableCols";
import Filter from "../../../components/filter/orders";
import {IService, IUsers} from "../../../types/admin";
import {ArrayToOptions} from "../../../utils/helpers/arrayToOptions";
import {useDebounce} from "../../../utils/hooks/useDebouncedValue";
import MyPagination from "../../../components/Pagination";
import { startOfYear, endOfYear, format } from 'date-fns';


const Orders = () => {

    const {services} = useServices()
    const [orders, setOrders] = useState<IOrder[]>([])
    const [loading, setLoading] = useState(false)
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
        clientIdentifier: '',
    })
    const debouncedValue = useDebounce(state.clientIdentifier, 1000)
    const currentDate = new Date()
    const start = startOfYear(currentDate)
    const end = endOfYear(currentDate)

    const getOrders = () => {
        const data = {
            StartDate: state.startDate ? state.startDate : format(start, 'yyyy-MM-dd'),
            EndDate: state.endDate ? state.endDate : format(end, 'yyyy-MM-dd'),
            ServiceId: selectedOptions.services?.id ? selectedOptions.services.id : null,
            UserId: selectedOptions.users?.id ? selectedOptions.users.id : null,
            ClientIdentifier: state.clientIdentifier || '',
            PageSize: pageInfo.pageSize?.value ? +pageInfo.pageSize?.value : 25,
            PageNumber: pageInfo.pageNumber
        }
        setLoading(true)
        services.Admin.getOrders(data).then(res => {
            setOrders(res.data.orders)
            setPageInfo({...pageInfo, totalCount: res.data.pageInfo?.totalCount})
            setLoading(false)
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

    const handleClearFilters = () => {
        setState({
            dateCreated: '',
            startDate: '',
            endDate: '',
            clientIdentifier: '',
        })
        setSelectedOptions({
            services: null,
            users: null
        })
        setPageInfo({
            pageNumber: 1,
            pageSize: {id: 2, label: '25', value: '25'},
            totalCount: 0
        })
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
        if (debouncedValue === state.clientIdentifier) {
            getOrders()
        }
    }, [state, debouncedValue, selectedOptions, pageInfo.pageNumber, pageInfo.pageSize])

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

    return (
        <div className={'py-4'}>

            <Filter
                handleOptionChange={handleOptionChange}
                productServices={options.services}
                users={options.users}
                selectedService={selectedOptions.services}
                selectedUser={selectedOptions.users}
                handleChange={handleChange}
                state={state}
                handleClearFilters = {handleClearFilters}
            />


            <div className={'px-2 my-3'}>
                <MyTable
                    columnData={OrderCols}
                    rowData={orders}
                    iterationKey={'dateCreated'}
                    loading={loading}
                />
                <MyPagination
                    onPageChange={(page) => setPageInfo({...pageInfo, pageNumber: page})}
                    onPageSizeChange={(item: IOptions) => setPageInfo({...pageInfo, pageSize: item})}
                    pageNumber={pageInfo.pageNumber}
                    pageSize={pageInfo.pageSize}
                    total={pageInfo.totalCount}
                />

            </div>
        </div>
    );
};

export default Orders;