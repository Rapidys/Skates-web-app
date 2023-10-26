import {TableColumn} from "../../../types";
import {format} from "date-fns";

export const GroupOrdersCol: TableColumn[] = [
    {id: 1, head: 'კლიენტის სახელი', dataKey: 'displayName'},
    {
        id: 2, head: 'შეკვეთები', render: (item) => {
            console.log('item', item)
            return <div>
                {item?.orders?.map((element, index) => {
                    return (
                        <div key={index}>

                            <div className={'mt-2'}>
                                {element?.serviceName}
                            </div>
                            <div>
                                      <span className={'mr-2'}>
                              {format(new Date(element?.startDate), 'yyyy-MM-dd')}
                            </span>
                                {' ~ '}
                                <span className={'ml-2 mr-2'}>
                            {format(new Date(element?.endDate), 'yyyy-MM-dd')}
                            </span>
                            </div>

                        </div>
                    )
                })}
            </div>
        }
    },
]