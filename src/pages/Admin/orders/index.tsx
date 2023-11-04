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
import {format, startOfDay, endOfDay} from 'date-fns';


const Orders = () => {

    const currentDate = new Date()
    const start = startOfDay(currentDate)
    const end = endOfDay(currentDate)
    const {services} = useServices()
    const [orders, setOrders] = useState<IOrder[]>([])
    const [loading, setLoading] = useState(false)
    const [sumValues,setSumValues] = useState({})
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
        startDate: format(start, 'yyyy-MM-dd'),
        endDate: format(end, 'yyyy-MM-dd'),
        clientIdentifier: '',
    })
    const debouncedValue = useDebounce(state.clientIdentifier, 1000)


    const getOrders = ({pageNumber,pageSize}:{pageNumber?:number,pageSize?:IOptions}) => {
        const data = {
            StartDate: state.startDate ,
            EndDate: state.endDate,
            ServiceId: selectedOptions.services?.id ? selectedOptions.services.id : null,
            UserId: selectedOptions.users?.id ? selectedOptions.users.id : null,
            ClientIdentifier: state.clientIdentifier || '',
            PageSize:pageSize ? +pageSize.value : +pageInfo.pageSize?.value,
            PageNumber:pageNumber ? pageNumber: pageInfo.pageNumber
        }
        setLoading(true)
        try{
            services.Admin.getOrders(data).then(res => {
                setOrders(res.data.orders)
                setSumValues(res.data?.sumValues)
                setPageInfo({
                    ...pageInfo,
                    totalCount: res.data.pageInfo?.totalCount,
                    pageSize: {id: 2, label: `${res.data.pageInfo?.pageSize}`, value: `${res.data.pageInfo?.pageSize}`},
                    pageNumber: res.data.pageInfo?.pageNumber,
                })
                setLoading(false)
            })
        }catch (e){
            console.log(e)
        }
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
            startDate: format(start, 'yyyy-MM-dd'),
            endDate: format(end, 'yyyy-MM-dd'),
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
        try{
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
        }catch (e){
            console.log(e)
        }
    }, [])

    useEffect(() => {
        if (debouncedValue === state.clientIdentifier) {
            getOrders({})
        }
    }, [state, debouncedValue, selectedOptions])

    const handleOptionChange = (options, type) => {
        setSelectedOptions({
            ...selectedOptions,
            [type]: options
        })
    }

    const handleChange = (value, type) => {
        if (typeof value !== "string") {
            setState({
                ...state,
                startDate: value.startDate,
                endDate: value.endDate
            })
            return
        }

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
                sumValues = {sumValues}
            />


            <div className={'px-2 my-3'}>
                <MyTable
                    columnData={OrderCols}
                    rowData={orders}
                    iterationKey={'dateCreated'}
                    loading={loading}
                />
                <div className={'flex items-center'}>
                    <MyPagination
                        onPageChange={(page) => {
                            setPageInfo({...pageInfo, pageNumber: page})
                            getOrders({pageNumber:page})
                        }}
                        onPageSizeChange={(item: IOptions) => {
                            setPageInfo({...pageInfo, pageSize: item,pageNumber:1})
                            getOrders({pageSize:item,pageNumber:1})
                        }}
                        pageNumber={pageInfo.pageNumber}
                        pageSize={pageInfo.pageSize}
                        total={pageInfo.totalCount}
                    />
                    {pageInfo.totalCount > 0 && (
                        <div className={'mr-2'}>
                            სულ:
                            {pageInfo.totalCount}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Orders;