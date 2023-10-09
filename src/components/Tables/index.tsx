import React, {FC} from 'react';
import {Table} from "flowbite-react";
import {TableColumn} from "../../types";


interface IMyTable {
    columnData: TableColumn[],
    rowData: any[],
    iterationKey?: string,
    onCellClick?: (item: any, title: any, props: any) => void,
    onChange?: (e: any) => void
    onChangeHead?: (e: any) => void,
    onRowClick?: (item: any) => void,
    loading?:boolean
}

const FakeDate = () => {
    return <Table.HeadCell>
        {[1, 2, 3, 4, 5].map(item => {
            return <div className={'bg-custom_dark'} key={item}/>
        })}
    </Table.HeadCell>
}

const FakeCell = ({columnData}) => {
    return [1, 2, 3, 4, 5].map(item => {
        return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 h-12" key={item}>
            {columnData?.map((item, index) => {
                return (
                    <Table.Cell
                        className="animate-pulse whitespace-nowrap font-medium text-gray-900 dark:text-white cursor-pointer"
                        key={index}
                    >
                        <div className={'bg-gray-200 h-6 rounded-lg'}/>
                    </Table.Cell>
                )
            })}

        </Table.Row>
    })
}


const MyTable: FC<IMyTable> = ({columnData, rowData, onCellClick, iterationKey,onRowClick, onChange,loading, onChangeHead, ...props}) => {

    return (
        <div className={'overflow-x-scroll'}>
            <Table className={'table mb-0 p-5'} hoverable>
                <Table.Head>
                    {
                        columnData ? (
                            columnData.map((item, index) => {
                                return (
                                    <Table.HeadCell key={index}>
                                        {item.head}
                                        {item.renderTitle && item.renderTitle(item, props, onChangeHead)}
                                    </Table.HeadCell>

                                )
                            })
                        ) : (
                            <FakeDate/>
                        )

                    }
                </Table.Head>
                <Table.Body className="divide-y">
                    {!loading ? (
                        rowData && rowData.map((item, index) => {
                            const keyRow = iterationKey ? item[iterationKey] : item?.id
                            return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                              key={keyRow}
                                              onClick={() => onRowClick && onRowClick(item)}
                            >
                                {columnData.map((title, i) => {
                                    return (
                                        <Table.Cell
                                            className="whitespace-nowrap font-medium text-gray-900 dark:text-white cursor-pointer"
                                            key={keyRow + title.id}
                                            onClick={(e) => {
                                                if (title.type) {
                                                    e.stopPropagation()
                                                    onCellClick(item, title, props)
                                                }
                                            }}
                                        >
                                            {title.type === 'bool' ?
                                                item[title.dataKey] === true ? 'კი' : 'არა' : (
                                                    item[title.dataKey]
                                                )}
                                            {title.render && title.render(item, props, onChange)}
                                        </Table.Cell>
                                    )
                                })}
                            </Table.Row>

                        })
                    ) : (
                        <FakeCell columnData={columnData}/>
                    )}

                </Table.Body>

            </Table>
        </div>

    );
};

export default MyTable;