import React, {FC, useState} from 'react';
import {Checkbox, Table} from "flowbite-react";
import {IHeadData, ServiceData} from "../../../types/Dashboard";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


interface IServiceTable {
    handleOpenMore: (item: ServiceData) => void,
    state:{head:IHeadData[],row:ServiceData[]},
    setState:React.Dispatch<React.SetStateAction<any>>
}

const ServiceTable: FC<IServiceTable> = ({ state,setState, handleOpenMore}) => {

    const { row, head } = state
    const handleHeadCheckboxChange = (item:IHeadData) => {
        const newHead = [ ...state.head]
        const newRow = [ ...state.row]

        const checkRowIndex = newHead.findIndex(el => el.id === item.id)
        newHead[checkRowIndex].checked = !newHead[checkRowIndex].checked

        const arr:ServiceData[] = []

        newRow.forEach((element) => {
            arr.push({...element,checked:newHead[checkRowIndex].checked})
        })


        setState({
            ...state,
            head:newHead,
            row:arr
        })


    }

    const handleUpdateTable = (item: ServiceData) => {
        const newRow = [...state.row]
        const checkedItem = newRow.find(el => el.id === item.id)
        if (checkedItem) {
            checkedItem.checked = !checkedItem.checked
            setState({
                ...state,
                row: newRow
            })
        }
    }

    return (
        <Table className={'overflow-scroll'} hoverable>
            <Table.Head>
                {head?.map(item => {
                    return (
                        item?.head === 'checkbox' ? (
                            <Table.HeadCell key={item.id}>
                                <Checkbox onChange = {() => handleHeadCheckboxChange(item)} checked = {item?.checked}/>
                            </Table.HeadCell>

                        ) : (
                            <Table.HeadCell key={item.id}>
                                {item.head}
                            </Table.HeadCell>
                        )

                    )
                })}

            </Table.Head>
            <Table.Body className="divide-y">
                {row.map(item => {
                    return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item.id}>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {item.serviceValue}
                        </Table.Cell>
                        <Table.Cell>
                            {item.trainer}
                        </Table.Cell>
                        <Table.Cell>
                            {item.price}
                        </Table.Cell>
                        <Table.Cell>
                            {item.active}
                        </Table.Cell>
                        <Table.Cell>
                            {item.count}
                        </Table.Cell>
                        <Table.Cell>
                            <Checkbox checked={item.checked} onChange={() => handleUpdateTable(item)}/>
                        </Table.Cell>
                        <Table.Cell className={'cursor-pointer'} onClick={() => handleOpenMore(item)}>
                            <FontAwesomeIcon icon={faEllipsisV}/>
                        </Table.Cell>
                    </Table.Row>
                })}
            </Table.Body>
        </Table>
    );
};

export default ServiceTable;