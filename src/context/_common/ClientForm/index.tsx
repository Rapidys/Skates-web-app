import React, {FC} from 'react';
import Card from "../../../components/Cards/Card";
import * as yup from "yup";
import {Formik} from "formik";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import {IClientInfo} from "../../../pages/Dashboard/Profile";
import {useAccount} from "../../AccountContext";
import Input from '../../../components/fields/input'
import MyDatePicker from "../../../components/fields/DatePickerV2";

interface ICreateAccount {
    ClientInfo?: IClientInfo,
    loading?: boolean,
    isReadOnly?: boolean,
    onSubmit: (data: any) => void,
    cardNumber?: string,
    labelClassNames?: string,
}

const ClientForm: FC<ICreateAccount> = ({
                                            ClientInfo,
                                            loading = false,
                                            onSubmit,
                                            isReadOnly,
                                            cardNumber,
                                            labelClassNames
                                        }) => {


    const validSchema = () => {
        return yup.object().shape({
            firstName: yup.string().required('აუცილებელი ველი'),
            lastName: yup.string().required('აუცილებელი ველი'),
            documentNumber: yup.string(),
            startDate: yup.string().required('აუცილებელი ველი'),
            phoneNumber: yup
                .number()
                .typeError('არავალიდური ნომერი')
                .required('აუცილებელი'),
        });
    };


    const {ClientId, CheckAccount, Clients} = useAccount()

    if (loading) {
        return <Loader/>
    }


    return (
        <Formik
            initialValues={{
                firstName: ClientInfo?.firstName || '',
                lastName: ClientInfo?.lastName || '',
                phoneNumber: ClientInfo?.mobile || '',
                documentNumber: ClientInfo?.identificationNumber || '',
                clientInfoCardNumber: cardNumber || '',
                startDate: ClientInfo?.birthDate || null,
            }}
            validationSchema={validSchema}
            onSubmit={(values => {
                const data = {
                    ClientId: ClientId,
                    CardNumber: values.clientInfoCardNumber,
                    FirstName: values.firstName,
                    LastName: values.lastName,
                    Mobile: values.phoneNumber,
                    IdentificationNumber: values.documentNumber,
                    BirthDate: values.startDate,
                }
                onSubmit(data)
            })}
            validateOnBlur
        >
            {(
                {
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isValid,
                    dirty,
                    setFieldValue
                }) => {
                return <Card className={'px-4'}>
                    {!isReadOnly ? (
                        <div className={'mb-2'}>
                            <Input
                                label={'ბარათის იდენტიფიკატორი'}
                                value={values?.clientInfoCardNumber}
                                onChange={handleChange}
                                name={'clientInfoCardNumber'}
                                type={'text'}
                                textColor={labelClassNames}
                            />
                        </div>
                    ) : (
                        <div className={'mb-2'}>
                            <Input
                                label={'ბარათის იდენტიფიკატორი'}
                                defaultValue={values?.clientInfoCardNumber}
                                readOnly={true}
                                name={'firstName'}
                                type={'text'}
                                textColor={labelClassNames}
                            />
                        </div>
                    )}

                    <div className={'mb-2'}>
                        <Input
                            label={'სახელი'}
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name={'firstName'}
                            isValid={!(errors.firstName && touched.firstName)}
                            error={errors?.firstName}
                            type={'text'}
                            textColor={labelClassNames}
                        />
                    </div>
                    <div className={'mb-2'}>
                        <Input
                            label={'გვარი'}
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name={'lastName'}
                            isValid={!(errors.lastName && touched.lastName)}
                            error={errors.lastName}
                            type={'text'}
                            textColor={labelClassNames}
                        />
                    </div>
                    <div className={'mb-2'}>
                        <MyDatePicker
                            value={values.startDate}
                            name = {'startDate'}
                            handleChange={(newDate) => {
                                setFieldValue("startDate", newDate)
                            }}
                            label={'დაბ.თარიღი'}
                            error={errors.startDate as string}
                            labelClassName={`font-light !text-gray-500`}
                        />
                    </div>
                    <div className={'mb-2'}>
                        <Input
                            label={'მობ.ნომერი'}
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name={'phoneNumber'}
                            isValid={!(errors.phoneNumber && touched.phoneNumber)}
                            error={errors.phoneNumber}
                            textColor={labelClassNames}
                            type={'text'}
                        />
                    </div>
                    <div>
                        <Input
                            label={'პირ.ნომერი'}
                            value={values.documentNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name={'documentNumber'}
                            isValid={!(errors.documentNumber && touched.documentNumber)}
                            error={errors.documentNumber}
                            type={'text'}
                            textColor={labelClassNames}
                        />
                    </div>
                    <div className={'mt-4'}>
                        <Button
                            type={'submit'}
                            disabled={!isValid && !dirty}
                            onClick={() => handleSubmit()}
                        >
                            შენახვა
                        </Button>
                    </div>
                </Card>
            }}
        </Formik>


    );
};

export default ClientForm;