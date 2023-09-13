import React, {FC, useState} from 'react';
import {Checkbox, Table} from "flowbite-react";
import {IHeadData, ServiceData} from "../../../types/Dashboard";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {format} from "date-fns";


interface IServiceTable {
    handleOpenMore: (item: ServiceData) => void,
    state:{head:IHeadData[],row:ServiceData[]},
    setState:React.Dispatch<React.SetStateAction<any>>
}

const ServiceTable: FC<IServiceTable> = ({ state,setState, handleOpenMore}) => {

    const { row, head } = state
    const handleHeadCheckboxChange = (item:IHeadData) => {
        const newState = {...state}
        const newHead = [ ...newState.head]
        const newRow = [ ...newState.row]

        const checkRowIndex = newHead.findIndex(el => el.id === item.id)
        newHead[checkRowIndex].checked = !newHead[checkRowIndex].checked

        const arr:ServiceData[] = []

        newRow.forEach((element) => {
            arr.push({...element,checked:newHead[checkRowIndex].checked})
        })
        setState({
            ...newState,
            head:newHead,
            row:arr
        })
    }

    const handleUpdateTable = (item: ServiceData) => {
        const copiedState = {...state}
        const newRow = [...copiedState.row]
        const checkedItem = newRow.find(el => el.orderId === item.orderId)
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
                {row.map((item:any) => {
                    return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item.orderId}>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {item.displayName}
                        </Table.Cell>
                        <Table.Cell>
                            {item.trainer}
                        </Table.Cell>
                        <Table.Cell>
                            {format(new Date(item?.startDate), 'yyyy-MM-dd')}
                        </Table.Cell>
                        <Table.Cell>
                            {format(new Date(item?.endDate), 'yyyy-MM-dd')}
                        </Table.Cell>
                        <Table.Cell>
                            {item.quantity} / {item.usedQuantity}
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