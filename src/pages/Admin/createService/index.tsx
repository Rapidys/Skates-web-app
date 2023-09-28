import React, {FC, useState} from 'react';
import { Checkbox, Label, Modal} from "flowbite-react";
import Input from '../../../components/fields/input'
import Counter from "../../../components/counter";
import {useServices} from "../../../context/Services/ServiceContextProvider";
import {useFormik} from "formik";
import Button from '../../../components/Button'
import * as yup from "yup";
import {IServiceItem} from "../../Dashboard/types";


interface ICreateService {
    modals:any,
    setOpenModals:any,
    getServices:any,
    currentServiceItem:IServiceItem,
    setCurrentServiceItem:any,
}
const CreateService:FC<ICreateService> = ({modals, setOpenModals,getServices,currentServiceItem,setCurrentServiceItem}) => {

    const [state, setState] = useState<any>({
        quantity: 0,
    })
    const {services } = useServices()

    const validSchema = () => {
        return yup.object().shape({
            displayName: yup.string().required('აუცილებელი ველი'),
            price: yup.string().required('აუცილებელი ველი'),
            quantity: yup.number()
                .test('non-zero', 'რიცხვი უნდა იყოს 0 ზე მეტი', (value) => value !== 0)
                .required('აუცილებელი ველი'),
        });
    };


    const {values,touched,setFieldValue,handleChange,handleSubmit,errors,isValid,handleBlur,dirty,resetForm} = useFormik({
        initialValues:{
            id:currentServiceItem?.id ? currentServiceItem?.id :  -1000,
            isInstant: currentServiceItem?.isInstant ? currentServiceItem.isInstant : false,
            quantity: currentServiceItem?.serviceQuantity ? currentServiceItem?.serviceQuantity :  0,
            needTrainer: currentServiceItem?.needTrainer ? currentServiceItem.needTrainer : false,
            displayName: currentServiceItem?.displayName ? currentServiceItem.displayName :  '',
            price:currentServiceItem?.price ? currentServiceItem.price :  ''
        },
        validationSchema:validSchema,
        validateOnBlur:true,
        onSubmit:(values => {
            const data = {
                Id: values.id,
                DisplayName:values.displayName,
                NeedTrainer: values.needTrainer,
                IsInstant: values.isInstant,
                ServiceQuantity: values.quantity,
                Price: values.price,
                IsActive: true
            }
            services.Admin.updateService(data).then(res=>{
                getServices()
                handleClear()
            })
        }),
        enableReinitialize:true
    })



    const handleClear = () => {
        setOpenModals({...modals, createServiceModal: false})
        setState({...state,quantity:0})
        setCurrentServiceItem(null)
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
                    <div className={'flex flex-col md:flex-row'}>
                        <div className={'flex items-center'}>
                            <Checkbox id="isInstant"
                                      className={'mr-2 mb-2 mt-2'}
                                      onChange = {handleChange}
                                      checked = {(values.isInstant as any)}
                                      name = {'isInstant'}
                                      onBlur = {handleBlur}
                                      disabled={values.needTrainer}
                            />
                            <Label htmlFor="isInstant" className={'text-black mr-4'}>
                                დამატებითი სერვისები
                            </Label>
                        </div>


                        <div className={'flex items-center'}>
                            <Checkbox id="needTrainer"
                                      className={'mr-2 mb-2 mt-2'}
                                      onChange = {handleChange}
                                      checked = {(values.needTrainer as any)}
                                      name = {'needTrainer'}
                                      onBlur = {handleBlur}
                                      disabled={values.isInstant}
                            />
                            <Label htmlFor="needTrainer" className={'text-black'}>
                                ტრენერი
                            </Label>
                        </div>

                    </div>

                    <div>
                        <div className={'flex justify-end'}>
                            <Counter counter={values?.quantity} onChange={(e) => setFieldValue('quantity',e)} />
                        </div>
                        {!isValid && errors?.quantity && (
                            <Label className={'text-custom_light'}>
                                {errors?.quantity}
                            </Label>
                        )}

                    </div>

                </div>


            </Modal.Body>

            <Modal.Footer>
                <Button onClick = {() => {
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

export default CreateService;