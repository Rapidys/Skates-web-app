import React, {useEffect, useState} from 'react';
import Filter from "../../../components/filter/groups";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {ArrayToOptions} from "../../../utils/helpers/arrayToOptions";
import {IOptions} from "../orders/types";
import {IGroupOrder, IState} from "./types";
import {DateRangeType} from "react-tailwindcss-datepicker";
import MyTable from "../../../components/Tables";
import {GroupOrdersCol} from "./tableCols";
import {endOfDay, format, startOfDay} from "date-fns";
import MyPagination from "../../../components/Pagination";

const Groups = () => {
    const currentDate = new Date()
    const start = startOfDay(currentDate)
    const end = endOfDay(currentDate)
    const [loading,setLoading] = useState(false)
    const [trainers, setTrainers] = useState<IOptions[]>([])
    const [groupOrders, setGroupOrders] = useState<IGroupOrder[]>([])
    const [state, setState] = useState<IState>({
        trainer: null,
        OrderDateFrom: format(start, 'yyyy-MM-dd'),
        OrderDateTo: format(end, 'yyyy-MM-dd'),
        PageNumber: 1,
        PageSize: {id:1,value:'10',label:'10'},
        total: 0,
    })
    const {services} = useServices()

    const getTrainers = () => {
        try {
            services.Dashboard.getTrainers().then(res => {
                const toOptions = ArrayToOptions(res.data, '')
                setTrainers(toOptions)
                setState((prevState) => ({
                    ...prevState,
                    trainer:toOptions[0] ? toOptions[0] : null
                }))
            })
        } catch (e) {
            console.log(e)
        }
    }

    const getGroupOrders = ({page,pageSize}:{page?:number,pageSize?:IOptions}) => {
        const data = {
            "TrainerId": state.trainer?.id || 1,
            "OrderDateFrom": state.OrderDateFrom,
            "OrderDateTo": state.OrderDateTo,
            "PageSize": pageSize?.value ? +pageSize.value : +state.PageSize.value,
            "PageNumber":page ? page : state.PageNumber
        }
        try {
            setLoading(true)
            services.Admin.getGroupOrders(data).then(res => {
                setGroupOrders(res?.data?.orders)
                setState((prevState) => ({
                    ...prevState,
                    PageNumber: res.data?.pageInfo?.pageNumber,
                    PageSize: {id:1,value:`${res.data?.pageInfo?.pageSize}`,label:`${res.data?.pageInfo?.pageSize}`},
                    total: res.data?.pageInfo?.totalCount,
                }))
                setLoading(false)
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getTrainers()
        getGroupOrders({})
    }, [])

    useEffect(() => {
        getGroupOrders({})
    }, [state?.trainer, state.OrderDateFrom, state.OrderDateTo])

    const handleChangeTrainer = (option: IOptions) => {
        setState({
            ...state,
            trainer: option
        })
    }

    const handleChangeDate = (values: DateRangeType) => {
        if (typeof values !== 'string') {
            setState({
                ...state,
                OrderDateFrom: values.startDate?.toString(),
                OrderDateTo: values.endDate?.toString(),
            })
        }

    }

    const handleClearFilters = () => {
        setState({
            trainer: null,
            OrderDateFrom: format(start, 'yyyy-MM-dd'),
            OrderDateTo: format(end, 'yyyy-MM-dd'),
            PageNumber: 1,
            PageSize: {id:1,value:'10',label:'10'},
            total: 0,
        })
    }

    return (
        <div className={'py-4'}>
            <Filter
                handleClearFilters={handleClearFilters}
                trainers={trainers}
                state={state}
                handleChangeTrainer={handleChangeTrainer}
                handleChangeDate={handleChangeDate}
            />

            <MyTable
                columnData={GroupOrdersCol}
                rowData={groupOrders}
                loading={loading}
            />

            <MyPagination
                total={state.total}
                pageNumber={state.PageNumber}
                pageSize={state.PageSize}
                onPageChange={(page) => {
                    setState(prevState => ({...prevState, pageNumber: page}))
                    getGroupOrders({page:+page})
                }}
                onPageSizeChange={(pageSize) => {
                    setState(prevState => ({...prevState, pageSize: pageSize,pageNumber: 1}))
                    getGroupOrders({pageSize,page:1})
                }}
            />

        </div>
    );
};

export default Groups;