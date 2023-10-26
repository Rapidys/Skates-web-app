import React, {useEffect, useState} from 'react';
import MyTable from "../../../components/Tables";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {ClientsCols} from "./tableCols";
import Filter from "../../../components/filter/clients";
import {IState} from "./types";
import useDebounceCallback from "../../../utils/hooks/useDebounceCallback";
import MyPagination from "../../../components/Pagination";
import {endOfDay, endOfYear, format, startOfDay, startOfYear} from "date-fns";
import {IOptions} from "../orders/types";
import {DateRangeType} from "react-tailwindcss-datepicker";

const Clients = () => {

    const currentDate = new Date()
    const start = startOfDay(currentDate)
    const end = endOfDay(currentDate)
    const [mount, setMount] = useState(false)
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState<IState>({
        firstName: '',
        lastName: '',
        mobile: '',
        cardNumber: '',
        identificationNumber: '',
        birthDateFrom: null,
        birthDateTo: null,
        dateCreatedFrom: format(start, 'yyyy-MM-dd'),
        dateCreatedTo: format(end, 'yyyy-MM-dd'),
        pageSize: {id: 1, label: '10', value: '10'},
        pageNumber: 1,
        total: 0,
    })
    const [clients, setClients] = useState([])
    const {services} = useServices()
    const getClients = ({pageNumber, pageSize}: { pageNumber?: number, pageSize?: IOptions }) => {
        const data = {
            RegisteredFrom: state.dateCreatedFrom,
            RegisteredTo: state.dateCreatedTo,
            FirstName: state.firstName,
            LastName: state.lastName,
            BirthDayFrom: state.birthDateFrom,
            BirthDayTo: state.birthDateTo,
            CardNumber: state.cardNumber,
            Mobile: state.mobile,
            IdentificationNumber: state.identificationNumber,
            PageSize: pageSize ? +pageSize.value : +state.pageSize?.value,
            PageNumber: pageNumber ? pageNumber : state.pageNumber
        }
        try {
            setLoading(true)
            services.Admin.getClients(data).then(res => {
                setClients(res.data?.clients)
                setLoading(false)
                setState(prevState => ({
                    ...prevState,
                    total: res.data.pageInfo?.totalCount,
                }))
            })
        } catch (e) {
            console.log(e)
        }
    }

    const debouncedGetClients = useDebounceCallback(getClients, 1000)

    useEffect(() => {
        setMount(true)
        getClients({})
        return () => {
            setMount(false)
        }
    }, [
        state.birthDateTo,
        state.birthDateFrom,
        state.dateCreatedTo,
        state.dateCreatedFrom,
    ])

    useEffect(() => {
        if (mount) {
            debouncedGetClients({})
        }
    }, [
        state.firstName,
        state.lastName,
        state.cardNumber,
        state.mobile,
        state.identificationNumber
    ])


    const handleChange = (value: string | DateRangeType, type: string) => {
        if (typeof value !== "string") {
            if(type === 'register'){
                setState({
                    ...state,
                    dateCreatedFrom: value.startDate?.toString(),
                    dateCreatedTo: value.endDate?.toString()
                })
                return
            }
            setState({
                ...state,
                birthDateFrom: value.startDate.toString(),
                birthDateTo: value.endDate.toString()
            })
            return
        }
        setState({
            ...state,
            [type]: value
        })
    }

    const handleClearFilters = () => {
        setState({
            firstName: '',
            lastName: '',
            mobile: '',
            cardNumber: '',
            identificationNumber: '',
            birthDateFrom: null,
            birthDateTo: null,
            dateCreatedFrom: format(start, 'yyyy-MM-dd'),
            dateCreatedTo: format(end, 'yyyy-MM-dd'),
            pageSize: {id: 1, label: '10', value: '10'},
            pageNumber: 1,
            total: 0,
        })
    }

    return (
        <div className={'py-4'}>

            <Filter
                handleChange={handleChange}
                state={state}
                handleClearFilters={handleClearFilters}
            />

            <div>
                <MyTable
                    columnData={ClientsCols}
                    rowData={clients}
                    iterationKey={'clientId'}
                    loading={loading}
                />
                <MyPagination
                    total={state?.total}
                    pageNumber={state.pageNumber}
                    pageSize={state.pageSize}
                    onPageChange={(page) => {
                        setState(prevState => ({...prevState, pageNumber: page}))
                        getClients({pageNumber: page})
                    }}
                    onPageSizeChange={(pageSize) => {
                        setState(prevState => ({...prevState, pageSize: pageSize,pageNumber: 1}))
                        getClients({pageSize: pageSize,pageNumber:1})
                    }}
                />
            </div>
        </div>
    );
};

export default Clients;