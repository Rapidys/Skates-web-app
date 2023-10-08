import React, {FC} from 'react';
import {Modal} from "flowbite-react";
import Input from "../../../../components/fields/input";
import Button from "../../../../components/Button";
import * as yup from "yup";
import {useFormik} from "formik";
import {useServices} from "../../../../context/Services/ServiceContextProvider";
import {ICreate, IModal} from "../types";
import {IServiceItem} from "../../../Dashboard/types";


const CreatePaymentType: FC<ICreate> = ({modals, setModals, currentReferenceItem, getCall, setCurrentServiceItem}) => {


    const {services} = useServices()
    const validSchema = () => {
        return yup.object().shape({
            displayName: yup.string().required('აუცილებელი ველი'),
        });
    };
    const handleClear = () => {
        setModals({...modals, createPaymentType: false})
        setCurrentServiceItem(null)
    }

    const {values, touched, setFieldValue, handleChange, handleSubmit, errors, isValid, handleBlur, dirty, resetForm} = useFormik({
        initialValues: {
            id: currentReferenceItem?.id ? currentReferenceItem.id : -1000,
            displayName: currentReferenceItem?.displayName ? currentReferenceItem?.displayName : '',
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
                getCall()
                handleClear()
            })
        }),
        enableReinitialize: true
    })


    return (
        <Modal show={modals.createPaymentType} onClose={handleClear} dismissible>

            <Modal.Header>
                {!currentReferenceItem ? 'გადახდის მეთოდის დამატება' : 'გადახდის მეთოდის ცვლილება'}
            </Modal.Header>

            <Modal.Body>
                <Input
                    label={'გადახდის მეთოდის სახელი'}
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