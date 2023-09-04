import React, {FC, useEffect, useState} from 'react';
import {Modal} from "flowbite-react";
import Select from 'react-select'
import {rowData} from "../../../utils/constants/mock";
import DatePicker from "../../fields/DatePicker";
import Button from '../../Button/index'

interface IAddService {
    openModal: string | undefined,
    setOpenModal: any,
    handleAddService: (selectedValues: any) => void,
}

const AddServiceModal: FC<IAddService> = ({openModal, setOpenModal, handleAddService}) => {

    const [options, setOptions] = useState([])


    useEffect(() => {
        const arr: any = []
        rowData.map(item => {
            arr.push({value: item.serviceValue, label: item.serviceValue,...item})
        })
        setOptions(arr)
    }, [])
    // State to hold selected values
    const [selectedValues, setSelectedValues] = useState([]);

    // Handle change when values are selected or removed
    const handleMultiSelectChange = (selectedOptions: any) => {
        setSelectedValues(selectedOptions);
    };
    return (
        <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)} size={'xl'}>
            <Modal.Header>სერვისის დამატება</Modal.Header>
            <Modal.Body>
                <div className={'h-auto'}>
                    <h2 className={'text-custom_ocean mb-2 text-sm'}>აირჩიეთ სერვისი:</h2>
                    <Select
                        isMulti // Enable multi-select
                        options={options}
                        value={selectedValues}
                        onChange={handleMultiSelectChange}
                    />
                    <div className={'text-custom_ocean mt-2 text-sm'}>
                        <h6 className={''}>არჩეული:</h6>
                        {selectedValues.map((items: any) => (
                            <div key={items.value} className={'py-1'}>{items.label}</div>
                        ))}
                    </div>
                </div>

                <div className={'flex justify-between mt-3'}>
                    <div>
                        <DatePicker label={'დან'} labelClassName={'!text-custom_ocean'}/>
                    </div>
                    <div>
                        <DatePicker label={'მდე'} labelClassName={'!text-custom_ocean'}/>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    handleAddService(selectedValues)
                    setOpenModal(undefined)
                    setSelectedValues([])
                }}
                        color="secondary"
                >დამატება</Button>
                <Button onClick={() => setOpenModal(undefined)}>
                    დახურვა
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddServiceModal;