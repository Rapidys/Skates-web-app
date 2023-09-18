import React, {FC} from 'react';
import {Modal} from "flowbite-react";
import Input from "../../../components/fields/input";
import Button from "../../../components/Button";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import * as yup from "yup";
import {useFormik} from "formik";


interface ICreateTrainers {
    modals:any,
    setModals:any,
    setCurrentTrainersItem:any,
    currentTrainerItem:any,
    getTrainers:any,
}
const CreateTrainers:FC<ICreateTrainers> = ({modals,setModals,setCurrentTrainersItem,currentTrainerItem,getTrainers}) => {


    const {services} = useServices()
    const validSchema = () => {
        return yup.object().shape({
            displayName: yup.string().required('აუცილებელი ველი'),
        });
    };


    const {values, touched, handleChange, handleSubmit, errors, isValid, handleBlur, dirty, resetForm} = useFormik({
        initialValues: {
            id: currentTrainerItem?.id ? currentTrainerItem.id : -1000,
            displayName: currentTrainerItem?.displayName ? currentTrainerItem?.displayName : '',
        },
        validationSchema: validSchema,
        validateOnBlur: true,
        onSubmit: (values => {
            const data = {
                id: values.id,
                DisplayName: values.displayName,
                IsActive: true
            }
            services.Admin.updateTrainers(data).then(res => {
                getTrainers()
                handleClear()
            })
        }),
        enableReinitialize: true
    })

    const handleClear = () => {
        setModals({...modals,createTrainers:false})
        setCurrentTrainersItem(null)
    }

    return (
        <Modal show={modals.createTrainers} onClose={handleClear} dismissible>

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

export default CreateTrainers;