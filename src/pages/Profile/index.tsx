import React, {FC, useEffect, useState} from 'react';
import {Button, Card, Modal} from "flowbite-react";
import CreateAccount from "../onBoarding/CreateAccount";
import {useServices} from "../../context/Services/ServiceContextProvider";
import {useAccount} from "../../context/AccountContext";
import ClientForm from "../../context/_common/ClientForm";
import {useFormikContext} from "formik";


export interface IClientInfo {
    clientId: number,
    cardNumber: string,
    firstName: string,
    lastName: string,
    birthDate: Date | number,
    mobile: string,
    documentNumber?: string,
    identificationNumber?: string,
}

interface IProfile {
    open: boolean,
    setOpen: any,
}

const Profile: FC<IProfile> = ({open, setOpen}) => {

    const [state, setState] = useState<IClientInfo>()


    const [loading, setLoading] = useState(false)
    const {ClientId} = useAccount()
    const {services} = useServices()

    const getClientData = () => {
        setLoading(true)
        services.Card.getClientInfo({ClientId}).then(res => {
            setState({
                ...res.data
            })
            setLoading(false)
        })
    }

    useEffect(() => {
        getClientData()
    }, []);

    const onSubmit = (data: any) => {
        services.Card.updateCardInfo(data).then(res => {
            getClientData()
        })
    }

    const handleClear = () => {
        setOpen(false)
    }

    return (
        <div className={'flex justify-center h-full'}>

            <div className={'w-1/2 mt-4'}>
                <div className={'mb-2'}>
                    <h2 className={'text-lg text-white font-bold'}>
                        პროფილი
                    </h2>
                </div>
                <ClientForm
                    ClientInfo={state}
                    loading={loading}
                    onSubmit={onSubmit}
                    isReadOnly={false}
                    cardNumber={state?.cardNumber}
                    labelClassNames = {'bg-gray-500'}
                />

            </div>
        </div>



    );
};

export default Profile;