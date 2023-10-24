import React from "react";
import {format} from "date-fns";
import {TableColumn} from "../../../types";

const orderCols:TableColumn[] = [
    {id: 1, head: 'ოპერატორი', dataKey: 'operatorConsumed'},
    {id: 2, head: 'მომხმარებლის იდენტიფიკატორი', dataKey: 'identifier'},
    {id: 3, head: 'თარიღი', render:(item) => <span>{format(new Date(item?.consumeDate), 'yyyy-MM-dd')}</span> },
]

export default orderCols