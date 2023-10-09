import {format} from "date-fns";
import {TableColumn} from "../../../types";

export const ClientsCols:TableColumn[] = [
    {id: 1, head: 'Id', dataKey: 'clientId'},
    {id: 2, head: 'შექმნის თარიღი', render:(item) => <span>{format(new Date(item.created), 'yyyy-MM-dd')}</span>},
    {id: 3, head: 'სახელი', dataKey: 'firstName'},
    {id: 4, head: 'გვარი', dataKey: 'lastName'},
    {id: 5, head: 'დაბ.თარიღი', render:(item) => <span>{format(new Date(item.birthDay), 'yyyy-MM-dd')}</span>},
    {id: 6, head: 'საიდენტიფიკაციო ნომ.', dataKey: 'identificationNumber'},
    {id: 7, head: 'მობილური', dataKey: 'mobile'},
    {id: 8, head: 'ბარათის ნომ', dataKey: 'cardNumber'},
]