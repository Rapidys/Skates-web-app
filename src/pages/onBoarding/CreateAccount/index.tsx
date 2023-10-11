import React, {FC, useEffect, useState} from 'react';
import Card from "../../../components/Cards/Card";
import Input from "../../../components/fields/input";
import * as yup from "yup";
import {Form, Formik} from "formik";
import Button from "../../../components/Button";
import DatePicker from "../../../components/fields/DatePicker";
import {useNavigate} from "react-router-dom";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {useAccount} from "../../../context/AccountContext";
import {IClientInfo} from "../../Dashboard/Profile";
import Loader from "../../../components/Loader";
import {format} from "date-fns";
import ClientForm from "../../../context/_common/ClientForm";


interface ICreateAccount {
    ClientInfo?: IClientInfo,
    loading?: boolean,
    callbackFn?: any,
    clientInfoCardNumber?: any,
}

const CreateAccount: FC<ICreateAccount> = ({ClientInfo, clientInfoCardNumber, loading = false, callbackFn}) => {


    const navigate = useNavigate()
    const {services} = useServices()

    const {CheckAccount,cardNumber} = useAccount()

    if (loading) {
        return <Loader/>
    }

    const onSubmit = (data: any) => {
        services.Card.updateCardInfo(data).then(res => {
            CheckAccount(data.CardNumber)
            navigate('/dashboard')
        })
    }


    return (
        <div className={'w-full sm:w-1/2 md:w-1/3'}>
            <ClientForm
                cardNumber ={cardNumber}
                onSubmit={onSubmit}
                isReadOnly={true}
            />
        </div>
    );
};

export default CreateAccount;