import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import Loader from "../../../components/Loader";
import { format } from 'date-fns';
import Button from '../../../components/Button'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import MyTable from "../../../components/Tables";
import orderCols from "./logCols";

interface IServiceConsumes {
    "identifier": string,
    "consumeDate":string,
    "operatorConsumed": string
}
const OrderLogs = ({orderId}) => {

    const [serviceConsumes,setServiceConsumes] = useState<IServiceConsumes[]>([])
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const {services} = useServices()


    useEffect(() => {
        try{
            setLoading(true)
            services.Dashboard.getServiceConsumes(+orderId).then(res => {
                setServiceConsumes(res?.data)
                setLoading(false)
            })
        }catch (e){
            console.log(e)
        }
    }, []);



    return (
        <div className={'w-full h-full'}>
            <div className={'w-full flex flex-wrap my-4 justify-center'}>
                <MyTable
                    columnData={orderCols}
                    rowData={serviceConsumes}
                    loading = {loading}
                />
            </div>

            <div className={'fixed bottom-0 right-0 left-0 w-full px-2 py-2'}>
                <Button onClick = {() => navigate('/dashboard')} >
                    <FontAwesomeIcon icon={faArrowLeft} className = {`mr-2`}/>
                    <span>უკან</span>
                </Button>
            </div>
        </div>

    );
};

export default OrderLogs;