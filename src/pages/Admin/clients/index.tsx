import React, {useEffect, useState} from 'react';
import MyTable from "../../../components/Tables";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {ClientsCols} from "./tableCols";
import Filter from "../../../components/filter/clients";
import {IState} from "./types";
import useDebounceCallback from "../../../utils/hooks/useDebounceCallback";
import MyPagination from "../../../components/Pagination";
import {endOfYear, format, startOfYear} from "date-fns";
import {IOptions} from "../orders/types";

const Clients = () => {


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
        dateCreatedFrom: '',
        dateCreatedTo: '',
        pageSize: {id: 1, label: '10', value: '10'},
        pageNumber: 1,
        total: 0,
    })
    const [clients, setClients] = useState([])
    const {services} = useServices()
    const currentDate = new Date()
    const start = startOfYear(currentDate)
    const end = endOfYear(currentDate)
    const getClients = ({pageNumber,pageSize}:{pageNumber?:number,pageSize?:IOptions}) => {
        const data = {
            RegisteredFrom: state.dateCreatedFrom ? state.dateCreatedFrom : format(start, 'yyyy-MM-dd'),
            RegisteredTo: state.dateCreatedTo ? state.dateCreatedTo : format(end, 'yyyy-MM-dd'),
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
        }catch (e){
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


    const handleChange = (value: string, type: string) => {
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
            dateCreatedFrom: '',
            dateCreatedTo: '',
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
                        getClients({pageNumber:page})
                    }}
                    onPageSizeChange={(pageSize) => {
                        setState(prevState => ({...prevState, pageSize: pageSize}))
                        getClients({pageSize:pageSize})
                    }}
                />
            </div>
        </div>
    );
};

export default Clients;