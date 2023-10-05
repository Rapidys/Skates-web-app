import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisV, faTrash, faUndo} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {TableColumn} from "../../types";

const usersCols:TableColumn[] = [
    {id: 1, head: 'Id', dataKey: 'id'},
    {id: 2, head: 'სახელი', dataKey: 'displayName'},
    {id: 3, head: 'ელ-ფოსტა', dataKey: 'username'},
    {id: 4, head: 'აქტიური', dataKey: 'isActive', type: 'bool'},
    {id: 5, head: 'ადმინი', dataKey: 'isAdmin', type: 'bool'},
    {
        id: 6, head: '',type: 'actions', render: (item: any) => (
            item.isActive ? (
                <FontAwesomeIcon icon={faTrash}
                                 className={'cursor-pointer'}
                />
            ) : (
                <FontAwesomeIcon icon={faUndo}
                                 className={'cursor-pointer'}
                />
            )
        )
    },
    {
        id: 7, head: '',type: 'more', render: () => (
            <FontAwesomeIcon icon={faEllipsisV}
                             className={'cursor-pointer'}
            />
        )
    },
]

const servicesCols:TableColumn[] = [
    {id: 1, head: 'Id', dataKey: 'id'},
    {id: 2, head: 'სახელი', dataKey: 'displayName'},
    {id: 3, head: 'ფასი', dataKey: 'price'},
    {id: 7, head: 'დამატებითი სერვისები', dataKey: 'isInstant', type: 'bool'},
    {id: 4, head: 'ტრენერი', dataKey: 'needTrainer', type: 'bool'},
    {id: 5, head: 'აქტიური', dataKey: 'isActive', type: 'bool'},
    {
        id: 6, head: '',type: 'actions', render: ((item) => (
            item.isActive ? (
                <FontAwesomeIcon icon={faTrash}/>
            ) : (
                <FontAwesomeIcon icon={faUndo}/>
            )
        ))
    },
    {
        id: 8, head: '', type: 'more', render: () => (
            <FontAwesomeIcon icon={faEllipsisV} />
        )
    },
]
const paymentTypeCols:TableColumn[] = [
    {id: 1, head: 'Id', dataKey: 'id'},
    {id: 2, head: 'სახელი', dataKey: 'displayName'},
    {id: 3, head: 'აქტიური', dataKey: 'isActive', type: 'bool'},
    {
        id: 6, head: '', type: 'actions', render: ((item) => (
            item.isActive ? (
                <FontAwesomeIcon icon={faTrash}/>
            ) : (
                <FontAwesomeIcon icon={faUndo}/>
            )
        ))
    },
    {
        id: 8, head: '', type: 'more', render: () => (
            <FontAwesomeIcon icon={faEllipsisV} />
        )
    },
]

const trainersCols:TableColumn[] = [
    {id: 1, head: 'Id', dataKey: 'id'},
    {id: 2, head: 'სახელი', dataKey: 'displayName'},
    {id: 3, head: 'აქტიური', dataKey: 'isActive', type: 'bool'},
    {
        id: 6, head: '', type: 'actions',render: ((item) => (
            item.isActive ? (
                <FontAwesomeIcon icon={faTrash}/>
            ) : (
                <FontAwesomeIcon icon={faUndo}/>
            )
        ))
    },
    {
        id: 8, head: '',type: 'more', render: () => (
            <FontAwesomeIcon icon={faEllipsisV}/>
        )
    },
]


export {usersCols, servicesCols, paymentTypeCols, trainersCols}
