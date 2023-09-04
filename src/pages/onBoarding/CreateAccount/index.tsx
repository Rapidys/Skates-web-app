import React, {ChangeEvent, useState} from 'react';
import Card from "../../../components/Cards/Card";
import Input from "../../../components/fields/input";
import * as yup from "yup";
import {Form, Formik} from "formik";
import Button from "../../../components/Button";
import DatePicker from "../../../components/fields/DatePicker";
import {useNavigate} from "react-router-dom";

const CreateAccount = () => {

    const navigate = useNavigate()

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


    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                birthDay: '',
                phoneNumber: ''
            }}
            validateOnBlur
            validationSchema={validSchema()}
            onSubmit={(values) => {
                console.log(values)
                navigate('/dashboard')
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