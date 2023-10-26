import React, {FC, useState} from 'react';
import {Checkbox, Label, Modal} from "flowbite-react";
import Button from "../../../../components/Button";
import Input from '../../../../components/fields/input'
import {Formik} from "formik";
import * as yup from "yup";
import {useServices} from "../../../../context/Services/ServiceContextProvider";


interface ICreateUser {
    modals: any,
    setOpenModal: any,
    getUsers?:() => void,
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
        <Modal show={modals.createUserModal} dismissible onClose={handleCloseModal} className={''}>
            <Modal.Header className={''}>
                    <span className={'text-custom_light'}>
                       მომხმარებლის შექმნა
                    </span>
            </Modal.Header>
            <Modal.Body className={''}>
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
                            id:currentUserItem?.id ? currentUserItem?.id : -1000,
                            isActive:currentUserItem?.isActive
                        }
                        try {
                            services.Admin.updateUsers(data).then(res => {
                                if(getUsers){
                                    getUsers()
                                }
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
                                textColor = {'bg-gray-500'}
                            />

                            <Input
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name={'username'}
                                isValid={!(errors.username && touched.username)}
                                error={(errors?.username as any)}
                                label={'ელ-ფოსტა'}
                                textColor = {'bg-gray-500'}

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
                                textColor = {'bg-gray-500'}

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
                                textColor = {'bg-gray-500'}

                            />

                            <div className={'mt-2'}>
                                <Checkbox id="isAdmin"
                                          className={'mr-2 mb-2 mt-2'}
                                          name = {'isAdmin'}
                                          onChange = {handleChange}
                                          checked = {values.isAdmin}
                                />
                                <Label htmlFor="isAdmin" className={'text-black'}>
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