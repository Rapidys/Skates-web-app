import {TableColumn} from "../../../types";
import {format} from "date-fns";

export const GroupOrdersCol: TableColumn[] = [
    {id: 1, head: 'კლიენტის სახელი', dataKey: 'displayName'},
    {
        id: 2, head: 'შეკვეთები', render: (item) => {
            return <div>
                {item?.orders?.map((element, index) => {
                    return (
                        <div key={index}>
                            <div className={'mb-3 flex'}>
                                <div>
                                    {index === 0 && (
                                        <div className={'mb-2 font-light'}>
                                            დან
                                        </div>
                                    )}
                                    <span>
                                       {format(new Date(element?.startDate), 'yyyy-MM-dd')}
                                    </span>
                                    {' ~ '}
                                </div>

                                <div>
                                    {index === 0 && (
                                        <div className={'mb-2 font-light'}>
                                            მდე
                                        </div>
                                    )}
                                    &nbsp;
                                    {format(new Date(element?.endDate), 'yyyy-MM-dd')}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        }
    },
]