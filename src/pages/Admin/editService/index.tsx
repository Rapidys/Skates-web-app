import React, {FC, useState} from 'react';
import { Checkbox, Label, Modal} from "flowbite-react";
import Input from '../../../components/fields/input'
import Counter from "../../../components/counter";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {useFormik} from "formik";
import Button from '../../../components/Button'
import * as yup from "yup";


interface ICreateService {
    modals:any,
    setOpenModals:any,
    getServices:any,
    serviceInfo?:any
}
const EditService:FC<ICreateService> = ({modals, setOpenModals,getServices,serviceInfo}) => {

    const [state, setState] = useState<any>({
        quantity: 0,
    })
    const [isSubmitting,setSubmitting] = useState(false)

    const validSchema = () => {
        return yup.object().shape({
            displayName: yup.string().required('აუცილებელი ველი'),
            price: yup.string().required('აუცილებელი ველი'),
        });
    };

    const {values,touched,handleChange,handleSubmit,errors,isValid,handleBlur,dirty,resetForm} = useFormik({
        initialValues:{
            isInstant: false,
            quantity: 0,
            needTrainer: false,
            displayName: '',
            price: ''
        },
        validationSchema:validSchema,
        validateOnBlur:true,
        onSubmit:(values => {
            const data = {
                Id: -1000,
                DisplayName:values.displayName,
                NeedTrainer: values.needTrainer,
                IsInstant: values.isInstant,
                Quantity: state.quantity,
                Price: values.price,
                IsActive: true
            }
            services.Admin.updateService(data).then(res=>{
                getServices()
                handleClear()
            })
        })
    })

    const {services } = useServices()

    const handleClear = () => {
        setOpenModals({...modals, createServiceModal: false})
        setSubmitting(false)
        setState({...state,quantity:0})
        resetForm()
    }



    return (
        <Modal show={modals.createServiceModal} onClose={handleClear} dismissible>

            <Modal.Header>
                სერვისის შექმნა
            </Modal.Header>

            <Modal.Body>
                <Input
                    label={'სერვისის სახელი'}
                    value={values.displayName}
                    onChange={handleChange}
                    isValid={!(errors.displayName && touched.displayName)}
                    error={errors?.displayName}
                    name = {'displayName'}
                    onBlur={handleBlur}
                    textColor = {'black'}
                />
                <Input
                    label={'სერვისის ფასი'}
                    value={values.price}
                    onChange={handleChange}
                    isValid={!(errors.price && touched.price)}
                    error={errors?.price}
                    name = {'price'}
                    onBlur={handleBlur}
                    textColor = {'black'}
                />
                <div className={'mt-3 flex justify-between'}>
                    <div>
                        <Checkbox id="isInstant"
                                  className={'mr-2 mb-2 mt-2'}
                                  onChange = {handleChange}
                                  value = {(values.isInstant as any)}
                                  name = {'isInstant'}
                                  onBlur = {handleBlur}
                        />
                        <Label htmlFor="isInstant" className={'text-black mr-4'}>
                            დამატებითი სერვისები
                        </Label>

                        <Checkbox id="needTrainer"
                                  className={'mr-2 mb-2 mt-2'}
                                  onChange = {handleChange}
                                  value = {(values.needTrainer as any)}
                                  name = {'needTrainer'}
                                  onBlur = {handleBlur}
                        />
                        <Label htmlFor="needTrainer" className={'text-black'}>
                            ტრენერი
                        </Label>
                    </div>

                    <div >
                        <div className={'flex justify-end'}>
                            <Counter counter={state?.quantity} onChange={(e) => setState({...state,quantity:e})} />
                        </div>
                        {state.quantity === 0 && isSubmitting && (
                            <Label className={'text-custom_light'}>
                                აირჩიეთ რაოდენობა
                            </Label>
                        )}

                    </div>

                </div>


            </Modal.Body>

            <Modal.Footer>
                <Button onClick = {() => {
                    setSubmitting(true)
                    handleSubmit()
                }}
                        disabled={!isValid || !dirty || state.quantity === 0}
                >
                    დამატება
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditService;