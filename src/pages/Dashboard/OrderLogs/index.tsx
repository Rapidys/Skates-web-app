import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import Loader from "../../../components/Loader";
import { format } from 'date-fns';
import Button from '../../../components/Button'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

interface IServiceConsumes {
    "identifier": string,
    "consumeDate":string,
    "operatorConsumed": string
}
const OrderLogs = () => {

    const [serviceConsumes,setServiceConsumes] = useState<IServiceConsumes[]>([])
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    const {services} = useServices()

    const paramId = params?.id

    useEffect(() => {
        try{
            setLoading(true)
            services.Dashboard.getServiceConsumes(+paramId).then(res => {
                setServiceConsumes(res?.data)
                setLoading(false)
            })
        }catch (e){
            console.log(e)
        }
    }, []);


    if(loading){
        return <Loader />
    }

    return (
        <div className={'w-full h-full'}>
            <div className={'w-full flex flex-wrap mx-3 my-4 justify-center'}>
                {[...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes,...serviceConsumes].map((item) => {
                    return (
                        <div className={'fcard shadow-md w-auto h-40 rounded-lg bg-white ml-4 mt-4 px-4 py-4 transition hover:bg-gray_white last:mb-20'}>
                            <div className={'mt-3 text-sm'}>
                                ოპერატორი: {item.operatorConsumed}
                            </div>
                            <div className={'text-sm mt-3'}>
                                მომხმარებლის იდენტიფიკატორი: {item.identifier}
                            </div>
                            <div className={'mt-3 text-sm'}>
                                ოპერატორი: {format(new Date(item.consumeDate), 'dd MMM yyyy HH:mm:ss')}
                            </div>
                        </div>
                    )
                })}

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