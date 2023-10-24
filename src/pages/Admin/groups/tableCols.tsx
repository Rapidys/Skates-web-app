import {TableColumn} from "../../../types";
import {format} from "date-fns";

export const GroupOrdersCol: TableColumn[] = [
    {id: 1, head: 'კლიენტის სახელი', dataKey: 'displayName'},
    {
        id: 2, head: 'შეკვეთები', render: (item) => {
            return <div className={'flex flex-wrap'}>
                {item?.orders?.map((element, index) => {
                    return (
                        <div key={index}>
                            <span className={'ml-2 mr-2'}>
                              {format(new Date(element?.startDate), 'yyyy-MM-dd')}
                            </span>
                            {' ~ '}
                            <span className={'ml-2 mr-2'}>
                            {format(new Date(element?.endDate), 'yyyy-MM-dd')}
                            </span>
                            {item.orders[index + 1] ? ' |' : null}
                        </div>
                    )
                })}
            </div>
        }
    },
]