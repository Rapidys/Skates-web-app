import React, {useEffect, useState} from 'react';
import Card from "../../../components/Cards/Card";
import Input from "../../../components/fields/input";
import Button from "../../../components/Button";
import {useFormik} from "formik";
import * as yup from "yup";
import {useAuth} from "../../../context/AuthContext";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {IUsers} from "../../../types/admin";
import {ca} from "date-fns/locale";
import {useNavigate} from "react-router-dom";
import {useErrorHandling} from "../../../context/ErrorHandlingContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const ChangePassword = () => {

    const [currentUserItem, setCurrentUserItem] = useState<IUsers | null>(null)


    const {userId} = useAuth()
    const {services} = useServices()
    const {handleSetError} = useErrorHandling()
    const navigate = useNavigate()


    const getAllUsers = () => {
        try {
            services.Admin.getUsers().then(res => {
                const currentUser = res?.data.find(el => el.id === +userId)
                setCurrentUserItem(currentUser)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const updateUser = (data:IUsers) => {
        try {
            services.Admin.updateUsers(data).then(res => {
                handleSetError('წარმატებით შეიცვალა','success') //set success notification
                navigate('/findAccount')
            })
        }catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [userId])

    const validSchema = () => {
        return yup.object().shape({
            password: yup.string().required('აუცილებელი ველი'),
            repeatPassword: yup.string()
                .oneOf([yup.ref('password'), null], 'პაროლები უნდა ემთხვეოდეს')
                .required('აუცილებელი ველი')
        });
    };

    const {values,errors, handleChange, handleSubmit, handleBlur, isValid, dirty} = useFormik(
        {
            initialValues: {
                password: '',
                repeatPassword: '',
            },
            validationSchema: validSchema(),
            onSubmit: values => {
                const data = {
                    id: currentUserItem?.id,
                    displayName: currentUserItem?.displayName,
                    username: currentUserItem?.username,
                    isAdmin: currentUserItem?.isAdmin,
                    isActive: currentUserItem?.isActive,
                    password: values.password,
                }
                updateUser(data)
            },
            validateOnBlur: true,
            enableReinitialize: true,
        }
    )


    return (
        <div className={'w-full sm:w-1/2 md:w-1/3'}>
            <Card className={'px-4'}>

                <div className={'mt-2 text-custom_light'}>
                    პაროლის ცვლილება
                </div>
                <div className={'w-full flex justify-center mt-2'}>
                    <div className={'w-full'}>
                        <Input
                            name={'password'}
                            label={'პაროლი'}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid = {isValid}
                            error={errors.password}
                        />
                        <Input
                            name={'repeatPassword'}
                            label={'გაიმეორეთ პაროლი'}
                            value={values.repeatPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid = {isValid}
                            error={errors.repeatPassword}
                        />
                        <div className={'flex justify-between items-center'}>
                            <Button
                                onClick={handleSubmit as any}
                                className={'mt-4'}
                                disabled={!isValid || !dirty}
                            >
                                შეცვლა
                            </Button>

                        </div>

                    </div>

                </div>

            </Card>
            <Button className={'fixed bottom-5 left-5'} onClick={() => navigate('/findAccount')}>
                <div className={'flex items-center'}>
                    <div>
                        <FontAwesomeIcon icon={faArrowLeft} className = {`mr-2`}/>
                    </div>
                    <div>
                        უკან
                    </div>
                </div>

            </Button>
        </div>
    );
};

export default ChangePassword;