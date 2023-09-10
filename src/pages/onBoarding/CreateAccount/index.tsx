import React, {ChangeEvent, FC, useState} from 'react';
import Card from "../../../components/Cards/Card";
import Input from "../../../components/fields/input";
import * as yup from "yup";
import {Form, Formik} from "formik";
import Button from "../../../components/Button";
import DatePicker from "../../../components/fields/DatePicker";
import {useNavigate} from "react-router-dom";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {useAccount} from "../../../context/AccountContext";
import {IClientInfo} from "../../Profile";
import Loader from "../../../components/Loader";


interface ICreateAccount {
    ClientInfo?:IClientInfo,
    loading?:boolean
}
const CreateAccount:FC<ICreateAccount> = ({ClientInfo ,loading=false}) => {

    const navigate = useNavigate()
    const [date, setDate] = useState<number | Date>(new Date())

    const { services } = useServices()
    const { cardNumber } = useAccount()

    const validSchema = () => {
        return yup.object().shape({
            firstName: yup.string().required('აუცილებელი ველი'),
            lastName: yup.string().required('აუცილებელი ველი'),
            phoneNumber: yup
                .number()
                .typeError('არავალიდური ნომერი')
                .required('აუცილებელი'),
        });
    };

    if(loading){
        return <Loader/>
    }


    return (
        <Formik
            initialValues={{
                firstName:ClientInfo?.firstName || '' ,
                lastName: ClientInfo?.lastName || '',
                phoneNumber: ClientInfo?.mobile || ''
            }}
            validateOnBlur
            validationSchema={validSchema()}
            onSubmit={(values) => {
                console.log(values)
                const data = {
                    ClientId:-1000,
                    CardNumber:cardNumber,
                    FirstName:values.firstName,
                    LastName:values.lastName,
                    Mobile:values.phoneNumber,
                    BrithDate:date,
                }
                services.Card.updateCardInfo(data).then(res => {
                    navigate('/dashboard')
                })
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isValid,
                  dirty,
              }) => (
                    <Card className={'px-4'}>
                        <div>
                            <Input
                                label={'სახელი'}
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name={'firstName'}
                                isValid={!(errors.firstName && touched.firstName)}
                                error={errors?.firstName}
                                type = {'text'}
                            />
                        </div>
                        <div>
                            <Input
                                label={'გვარი'}
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name={'lastName'}
                                isValid={!(errors.lastName && touched.lastName)}
                                error={errors.lastName}
                                type = {'text'}
                            />
                        </div>
                        <div>
                            <DatePicker
                                label={'დაბ.თარიღი'}
                                date = {date}
                                setDate={setDate}
                            />
                        </div>
                        <div>
                            <Input
                                label={'მობ.ნომერი'}
                                value={values.phoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name={'phoneNumber'}
                                isValid={!(errors.phoneNumber && touched.phoneNumber)}
                                error={errors.phoneNumber}
                                type = {'text'}
                            />
                        </div>
                        <div>
                            <Button
                                type={'submit'}
                                disabled={!isValid && !dirty}
                                onClick={() => handleSubmit()}
                            >
                                შენახვა
                            </Button>
                        </div>
                    </Card>
            )}
        </Formik>
    );
};

export default CreateAccount;