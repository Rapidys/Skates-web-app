import React, {FC, useState} from 'react';
import {Checkbox, Label, Modal} from "flowbite-react";
import Button from "../../../components/Button";
import Input from '../../../components/fields/input'
import {Formik} from "formik";
import * as yup from "yup";
import {useServices} from "../../../context/Services/ServiceContextProvider";


interface ICreateUser {
    modals: any,
    setOpenModal: any,
    getUsers:() => void,
    currentUserItem:any,
    setCurrentUserItem:any
}

const CreateUser: FC<ICreateUser> = ({modals, setOpenModal,getUsers,currentUserItem,setCurrentUserItem}) => {

    const { services } = useServices()

    const validSchema = () => {
        return yup.object().shape({
            displayName: yup.string().required('აუცილებელი ველი'),
            username: yup.string().required('აუცილებელი ველი'),
            password: yup.string().required('აუცილებელი ველი'),
            repeatPassword: yup.string()
                .oneOf([yup.ref('password'), null], 'Passwords must match')
                .required('აუცილებელი ველი')
        });
    };


    const handleCloseModal = () => {
        setOpenModal({...modals, createUserModal: false})
        setCurrentUserItem(null)
    }

    return (
        <Modal show={modals.createUserModal} dismissible onClose={handleCloseModal} className={'bg-custom_dark'}>
            <Modal.Header className={'bg-custom_dark'}>
                    <span className={'text-custom_light'}>
                       მომხმარებლის შექმნა
                    </span>
            </Modal.Header>
            <Modal.Body className={'bg-custom_dark'}>
                <Formik
                    initialValues={{
                        displayName: currentUserItem?.displayName ? currentUserItem.displayName : '',
                        username:currentUserItem?.username ? currentUserItem.username :  '',
                        isAdmin: currentUserItem?.isAdmin ? currentUserItem.isAdmin : false,
                        password: currentUserItem?.password ? currentUserItem.password : '',
                        repeatPassword: currentUserItem?.repeatPassword ? currentUserItem.repeatPassword : '',
                    }}
                    validateOnBlur
                    validationSchema={validSchema()}
                    onSubmit={(values) => {
                        const data = {
                            displayName: values.displayName,
                            username: values.username,
                            isAdmin: values?.isAdmin,
                            password: values.password,
                        }
                        try {
                            services.Admin.updateUsers(data).then(res => {
                                getUsers()
                                handleCloseModal()
                            })
                        }catch (e) {
                            console.log(e)
                        }
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
                        <div>
                            <Input
                                value={values.displayName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name={'displayName'}
                                isValid={!(errors.displayName && touched.displayName)}
                                error={(errors?.displayName as any)}
                                label={'მომხმარებლის სახელი'}
                            />

                            <Input
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name={'username'}
                                isValid={!(errors.username && touched.username)}
                                error={(errors?.username as any)}
                                label={'ელ-ფოსტა'}
                            />


                            <Input
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name={'password'}
                                type = {'password'}
                                isValid={!(errors.password && touched.password)}
                                error={(errors?.password as any)}
                                label={'პაროლი'}
                            />

                            <Input
                                value={values.repeatPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name={'repeatPassword'}
                                type = {'password'}
                                isValid={!(errors.repeatPassword && touched.repeatPassword)}
                                error={(errors?.repeatPassword as any)}
                                label={'გაიმეორეთ პაროლი'}
                            />

                            <div className={'mt-2'}>
                                <Checkbox id="isAdmin"
                                          className={'mr-2 mb-2 mt-2'}
                                          onChange = {handleChange}
                                          value = {values.isAdmin}
                                />
                                <Label htmlFor="isAdmin" className={'text-white'}>
                                    ადმინი
                                </Label>
                            </div>

                            <div className={'flex mt-2'}>
                                <Button className={'mr-2'} color={'danger'}
                                        disabled={!isValid && !dirty}
                                        onClick={() => handleSubmit()}
                                        type={'submit'}
                                >დიახ</Button>
                                <Button color={'secondary'} onClick={handleCloseModal}>
                                    არა
                                </Button>
                            </div>

                        </div>
                    )}
                </Formik>
            </Modal.Body>

        </Modal>
    );
};

export default CreateUser;