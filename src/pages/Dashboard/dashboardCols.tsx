import {TableColumn} from "../../types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {format} from "date-fns";
import {Checkbox} from "flowbite-react";

const dashboardCols:TableColumn[] = [
    {id: 1, head: 'სერვისი', dataKey: 'displayName'},
    {id: 2, head: 'ტრენერი/ჯგუფი', dataKey: 'trainer'},
    {id: 3, head: 'დან', render:(item) => <span>{format(new Date(item?.startDate), 'yyyy-MM-dd')}</span> },
    {id: 4, head: 'მდე', render:(item) => <span>{format(new Date(item?.endDate), 'yyyy-MM-dd')}</span> },
    {id: 5, head: 'რაოდენობა', render:(item) => <span>{item.quantity} / {item.usedQuantity}</span>},
    {
        id: 6,renderTitle: (item,props,onChange,headCheckboxValue) => {
            return (
                <Checkbox checked = {headCheckboxValue} onChange={(e) => {
                    onChange(item)
                }}/>
            )
        }, type: 'checkbox', render: ((item,props,onChange) => (
            <Checkbox checked={item.checked} onChange={(e) => {
                onChange(item)
            }}/>
        ))
    },
    {
        id: 7, head: '', type: 'commentsModal', render: () => (
            <FontAwesomeIcon icon={faComment} className = {'text-lg'}/>
        )
    },
    {
        id: 8, head: '', type: 'moreModal', render: () => (
            <FontAwesomeIcon icon={faEllipsisV} className = {'text-lg'}/>
        )
    },
]

export default dashboardCols