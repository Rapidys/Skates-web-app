import React, {FC} from 'react';
import {Checkbox, Table} from "flowbite-react";

interface IReferenceTable {
    state:any,
    setState:any,
}
const ReferenceTable:FC<IReferenceTable> = ({state,setState}) => {
    const { row,head } = state


    const handleChecked = (id:number) => {
        const copiedState = {...state}
        const copiedRow = {...copiedState.row}

        const elementIndex = copiedRow.findIndex(el => el?.id === id)

        copiedRow[elementIndex].IsAdmin = !copiedRow[elementIndex].IsAdmin

        setState({
            ...state,
            row:copiedRow
        })

    }

    return (
        <Table className={'overflow-scroll'} hoverable>
            <Table.Head>
                {head?.map(item => {
                    return  (
                            <Table.HeadCell key={item.id}>
                                {item.head}
                            </Table.HeadCell>
                    )
                })}

            </Table.Head>
            <Table.Body className="divide-y">
                {row.map((item:any) => {
                    return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item.id}>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {item.id}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {item.displayName}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {item.username}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <Checkbox checked = {item.isAdmin} onChange = {() => handleChecked(item.id)}/>
                        </Table.Cell>
                    </Table.Row>
                })}
            </Table.Body>
        </Table>
    );
};

export default ReferenceTable;