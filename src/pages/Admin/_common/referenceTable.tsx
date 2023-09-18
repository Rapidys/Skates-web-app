import React, {FC} from 'react';
import {Checkbox, Table} from "flowbite-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDeleteLeft, faEllipsisV, faRemove, faTrash, faUndo} from "@fortawesome/free-solid-svg-icons";

interface IReferenceTable {
    state:any,
    setState:any,
    currentReference:any,
    handleEditService?:any,
    handleEditReference?:any,
}
const ReferenceTable:FC<IReferenceTable> = ({state,setState,currentReference,handleEditService,handleEditReference}) => {
    const { row,head } = state


    const handleChecked = (id:number,key) => {
        const copiedState = {...state}
        const copiedRow = [...copiedState.row]

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
                                    {`${item.displayName} (ფასი: ${item.price}; რაოდენობა: ${item.serviceQuantity})`}
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
                                {item.isActive ? (
                                    <Table.Cell className={'cursor-pointer'} onClick={() => handleEditService(item,'undo')}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </Table.Cell>
                                ) : (
                                    <Table.Cell className={'cursor-pointer'} onClick={() => handleEditService(item,'remove')}>
                                        <FontAwesomeIcon icon={faUndo}/>
                                    </Table.Cell>
                                )}
                                <Table.Cell className={'cursor-pointer'} onClick={() => handleEditService(item)}>
                                    <FontAwesomeIcon icon={faEllipsisV}/>
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
                                {item.isActive ? 'კი' : 'არა'}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {item.isAdmin ? 'კი' : 'არა'}
                            </Table.Cell>
                            {item.isActive ? (
                                <Table.Cell className={'cursor-pointer'} onClick={() => handleEditReference(item,'undo')}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Table.Cell>
                            ) : (
                                <Table.Cell className={'cursor-pointer'} onClick={() => handleEditReference(item,'remove')}>
                                    <FontAwesomeIcon icon={faUndo}/>
                                </Table.Cell>
                            )}
                            <Table.Cell className={'cursor-pointer'} onClick={() => handleEditReference(item)}>
                                <FontAwesomeIcon icon={faEllipsisV}/>
                            </Table.Cell>
                            {/*<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">*/}
                            {/*    <Checkbox checked = {item.isAdmin} onChange = {() => handleChecked(item.id,'isAdmin')}/>*/}
                            {/*</Table.Cell>*/}
                        </Table.Row>
                    })}
                </Table.Body>
            )}

        </Table>
    );
};

export default ReferenceTable;
