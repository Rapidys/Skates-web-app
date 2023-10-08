import {IOrder} from "./types";
import {TableColumn} from "../../../types";
import {format} from "date-fns";

export const OrderCols:TableColumn[] = [
    {id: 1, head: 'შექმნის თარ.', render:(item) => <span>{format(new Date(item.dateCreated), 'yyyy-MM-dd HH:mm:ss')}</span> },
    {id: 2, head: 'აქტიური -დან', render:(item) => <span>{format(new Date(item.startDate), 'yyyy-MM-dd')}</span>},
    {id: 3, head: 'აქტიური -მდე', render:(item) => <span>{format(new Date(item.endDate), 'yyyy-MM-dd')}</span>},
    {id: 4, head: 'კლიენტი', dataKey: 'clientName'},
    {id: 5, head: 'სერვისი', dataKey: 'serviceName'},
    {id: 6, head: 'რაოდენობა', render: (item) => <span>{item.quantity + '/' + item.usedQuantity}</span>},
    {id: 7, head: 'ფასი', dataKey: 'price'},
    {id: 8, head: 'ფასდაკლება', dataKey: 'discount'},
    {id: 9, head: 'ოპერატორი', dataKey: 'operatorName'},
    {id: 10, head: 'ტრენერი', dataKey: 'trainer'},
]