import React, {FC} from 'react';
import {Checkbox, Table} from "flowbite-react";

interface IReferenceTable {
    state:any,
    setState:any,
    currentReference:any,
}
const ReferenceTable:FC<IReferenceTable> = ({state,setState,currentReference}) => {
    const { row,head } = state


    const handleChecked = (id:number,key) => {
        const copiedState = {...state}
        const copiedRow = [...copiedState.row]

        console.log(copiedRow)
        const elementIndex = copiedRow.findIndex(el => el?.id === id)

        copiedRow[elementIndex][key] = !copiedRow[elementIndex][key]

        setState({
            ...state,
            row:copiedRow
        })

    }

    return (
        <Table className={'overflow-scroll'} hoverable>
            <Table.Head>
                {head?.map((item,index) => {
                    return  (
                            <Table.HeadCell key={index}>
                                {item.head}
                            </Table.HeadCell>
                    )
                })}

            </Table.Head>
            {currentReference.id === 2 ? (
                    <Table.Body className="divide-y">
                        {row.map((item:any,index) => {
                            return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.id}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.displayName}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.price}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {/*<Checkbox checked = {item.isInstant} onChange = {() => handleChecked(item.id,'isInstant')}/>*/}
                                    {item.isInstant ? 'კი' : 'არა'}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.needTrainer ? 'კი' : 'არა'}
                                    {/*<Checkbox checked = {item.needTrainer} onChange = {() => handleChecked(item.id,'needTrainer')}/>*/}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.isActive ? 'კი' : 'არა'}
                                    {/*<Checkbox checked = {item.isActive} onChange = {() => handleChecked(item.id,'isActive')}/>*/}
                                </Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
            ) : (
                <Table.Body className="divide-y">
                    {row.map((item:any,index) => {
                        return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
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
                                <Checkbox checked = {item.isAdmin} onChange = {() => handleChecked(item.id,'isAdmin')}/>
                            </Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            )}

        </Table>
    );
};

export default ReferenceTable;
//
// displayName
//     :
//     "ციგურის ქირაობა"
// id
//     :
//     3
// isActive
//     :
//     true
// isInstant
//     :
//     true
// needTrainer
//     :
//     false
// price
//     :
//     5