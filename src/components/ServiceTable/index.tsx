import React, {FC, useState} from 'react';
import {Checkbox, Table} from "flowbite-react";
import {headData, ServiceData} from "../../types/Dashboard";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


interface IServiceTable {
    rowData:ServiceData[],
    headData:headData[],
    handleUpdateTable:(item:ServiceData) => void
    handleOpenMore:(item:ServiceData) => void
}
const ServiceTable:FC<IServiceTable> = ({rowData,headData,handleUpdateTable,handleOpenMore}) => {


    return (
        <Table className={'overflow-scroll'}>
            <Table.Head>
                {headData?.map(item => {
                    return (
                        <Table.HeadCell key = {item.id}>
                            {item.head}
                        </Table.HeadCell>
                    )
                })}

            </Table.Head>
            <Table.Body className="divide-y">
                {rowData.map(item => {
                    return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key = {item.id}>
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
                           <Checkbox checked={item.checked} onChange = {() => handleUpdateTable(item)} />
                        </Table.Cell>
                        <Table.Cell className={'cursor-pointer'} onClick={() => handleOpenMore(item)}>
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </Table.Cell>
                    </Table.Row>
                })}
            </Table.Body>
        </Table>
    );
};

export default ServiceTable;