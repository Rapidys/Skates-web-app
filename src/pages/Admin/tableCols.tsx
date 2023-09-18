import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisV, faTrash, faUndo} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const usersCols = (handleEdit: any) => [
    {id: 1, head: 'Id', dataKey: 'id'},
    {id: 2, head: 'სახელი', dataKey: 'displayName'},
    {id: 3, head: 'ელ-ფოსტა', dataKey: 'username'},
    {id: 4, head: 'აქტიური', dataKey: 'isActive', type: 'bool'},
    {id: 5, head: 'ადმინი', dataKey: 'isAdmin', type: 'bool'},
    {
        id: 6, head: '', render: (item: any) => (
            item.isActive ? (
                <FontAwesomeIcon icon={faTrash}
                                 className={'cursor-pointer'}
                                 onClick={() => handleEdit({item, remove: 'undo'})}
                />
            ) : (
                <FontAwesomeIcon icon={faUndo}
                                 className={'cursor-pointer'}
                                 onClick={() => handleEdit({item, remove: 'remove'})}
                />
            )
        )
    },
    {
        id: 7, head: '', render: (item) => (
            <FontAwesomeIcon icon={faEllipsisV}
                             className={'cursor-pointer'}
                             onClick={() => handleEdit({item, modalType: 'createUserModal'})}
            />
        )
    },
]

const servicesCols = (handleEdit: any) => [
    {id: 1, head: 'Id', dataKey: 'id'},
    {id: 2, head: 'სახელი', dataKey: 'displayName'},
    {id: 3, head: 'ფასი', dataKey: 'price'},
    {id: 7, head: 'დამატებითი სერვისები', dataKey: 'isInstant', type: 'bool'},
    {id: 4, head: 'ტრენერი', dataKey: 'needTrainer', type: 'bool'},
    {id: 5, head: 'აქტიური', dataKey: 'isActive', type: 'bool'},
    {
        id: 6, head: '', render: ((item) => (
            item.isActive ? (
                <FontAwesomeIcon icon={faTrash}
                                 className={'cursor-pointer'}
                                 onClick={() => handleEdit({item, remove: 'undo'})}
                />
            ) : (
                <FontAwesomeIcon icon={faUndo}
                                 className={'cursor-pointer'}
                                 onClick={() => handleEdit({item, remove: 'remove'})}
                />
            )
        ))
    },
    {
        id: 8, head: '', render: (item) => (
            <FontAwesomeIcon icon={faEllipsisV} className={'cursor-pointer'}
                             onClick={() => {
                                 handleEdit({item, modalType: 'createServiceModal'})
                             }}/>
        )
    },
]
const paymentTypeCols = (handleEdit) => [
    {id: 1, head: 'Id', dataKey: 'id'},
    {id: 2, head: 'სახელი', dataKey: 'displayName'},
    {id: 3, head: 'აქტიური', dataKey: 'isActive', type: 'bool'},
    {
        id: 6, head: '', render: ((item) => (
            item.isActive ? (
                <FontAwesomeIcon icon={faTrash}
                                 className={'cursor-pointer'}
                                 onClick={() => handleEdit({item, remove: 'undo'})}
                />
            ) : (
                <FontAwesomeIcon icon={faUndo}
                                 className={'cursor-pointer'}
                                 onClick={() => handleEdit({item, remove: 'remove'})}
                />
            )
        ))
    },
    {
        id: 8, head: '', render: (item) => (
            <FontAwesomeIcon icon={faEllipsisV} className={'cursor-pointer'}
                             onClick={() => {
                                 handleEdit({item, modalType: 'createPaymentType'})
                             }}/>
        )
    },
]

const trainersCols = (handleEdit) => [
    {id: 1, head: 'Id', dataKey: 'id'},
    {id: 2, head: 'სახელი', dataKey: 'displayName'},
    {id: 3, head: 'აქტიური', dataKey: 'isActive', type: 'bool'},
    {
        id: 6, head: '', render: ((item) => (
            item.isActive ? (
                <FontAwesomeIcon icon={faTrash}
                                 className={'cursor-pointer'}
                                 onClick={() => handleEdit({item, remove: 'undo'})}
                />
            ) : (
                <FontAwesomeIcon icon={faUndo}
                                 className={'cursor-pointer'}
                                 onClick={() => handleEdit({item, remove: 'remove'})}
                />
            )
        ))
    },
    {
        id: 8, head: '', render: (item) => (
            <FontAwesomeIcon icon={faEllipsisV} className={'cursor-pointer'}
                             onClick={() => {
                                 handleEdit({item, modalType: 'createTrainers'})
                             }}/>
        )
    },
]


export {usersCols, servicesCols, paymentTypeCols, trainersCols}
