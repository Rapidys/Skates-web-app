import React, {FC} from 'react';
import {Modal} from "flowbite-react";
import Input from "../../../components/fields/input";
import Button from "../../../components/Button";
import * as yup from "yup";
import {useFormik} from "formik";
import {useServices} from "../../../context/Services/ServiceContextProvider";


interface ICreatePaymentType {
    modals: any,
    setModals: any,
    currentPaymentItem: any,
    getPaymentTypes: any,
    setCurrentPaymentItem: any,
}

const CreatePaymentType: FC<ICreatePaymentType> = ({modals, setModals, currentPaymentItem, getPaymentTypes,setCurrentPaymentItem}) => {


    const {services} = useServices()
    const validSchema = () => {
        return yup.object().shape({
            displayName: yup.string().required('აუცილებელი ველი'),
        });
    };


    const {values, touched, setFieldValue, handleChange, handleSubmit, errors, isValid, handleBlur, dirty, resetForm} = useFormik({
        initialValues: {
            id: currentPaymentItem?.id ? currentPaymentItem.id : -1000,
            displayName: currentPaymentItem?.displayName ? currentPaymentItem?.displayName : '',
        },
        validationSchema: validSchema,
        validateOnBlur: true,
        onSubmit: (values => {
            const data = {
                id: values.id,
                DisplayName: values.displayName,
                IsActive: true
            }
            services.Admin.updatePaymentTypes(data).then(res => {
                getPaymentTypes()
                handleClear()
            })
        }),
        enableReinitialize: true
    })

    const handleClear = () => {
        setModals({...modals, createPaymentType: false})
        setCurrentPaymentItem(null)
    }

    return (
        <Modal show={modals.createPaymentType} onClose={handleClear} dismissible>

            <Modal.Header>
                სერვისის შექმნა
            </Modal.Header>

            <Modal.Body>
                <Input
                    label={'სერვისის სახელი'}
                    value={values.displayName}
                    onChange={handleChange}
                    isValid={!(errors.displayName && touched.displayName)}
                    error={(errors?.displayName as any)}
                    name={'displayName'}
                    onBlur={handleBlur}
                    textColor={'black'}
                />

            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => {
                    handleSubmit()
                }}
                        disabled={!isValid && !dirty}
                >
                    დამატება
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePaymentType;