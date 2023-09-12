import React, {useEffect, useState} from 'react';
import {Card} from "flowbite-react";
import CreateAccount from "../onBoarding/CreateAccount";
import {useServices} from "../../context/Services/ServiceContextProvider";
import {useAccount} from "../../context/AccountContext";


export interface IClientInfo {
    clientId:number,
    cardNumber:string,
    firstName:string,
    lastName:string,
    birthDate:Date | number,
    mobile:string,
    documentNumber?:string,
}
const Profile = () => {

    const [ state,setState ] = useState<IClientInfo>()

    const [ loading ,setLoading ] = useState(false)
    const { ClientId } = useAccount()
    const { services } = useServices()

    useEffect(() => {
        setLoading(true)
        services.Card.getClientInfo({ClientId}).then(res => {
            const { } = res?.data
            setState({
                ...res.data
            })
            setLoading(false)

        })
    }, []);

    return (
        <div className={'flex mt-20 items-center h-full'} style = {{flexDirection:'column'}}>
            <div className={'w-1/3 mb-3 bg-custom_dark rounded-lg px-2 py-3'}>
                <h2 className={'text-custom_light text-lg'}>
                    პროფილი
                </h2>
            </div>
            <CreateAccount  ClientInfo = {state} loading={loading}/>
        </div>
    );
};

export default Profile;