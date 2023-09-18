import React, {FC} from 'react';
import {Table} from "flowbite-react";


interface IMyTable {
    columnData: any[],
    rowData: any[],
}

const FakeDate = () => {
    return <Table.HeadCell>
        {[1, 2, 3, 4, 5].map(item => {
           return <div className={'bg-custom_dark'} key={item}/>
        })}
    </Table.HeadCell>
}

const MyTable: FC<IMyTable> = ({columnData, rowData,...props}) => {

    return (
        <Table className={'table mb-0 p-5'} hoverable>
            <Table.Head>
                {
                    columnData ? (
                        columnData.map((item,index) => {
                            return (
                                <Table.HeadCell key={index}>
                                    {item.head}
                                    {item.renderTitle && item.renderTitle()}
                                </Table.HeadCell>

                            )
                        })
                   ) : (
                       <FakeDate />
                    )

                }
            </Table.Head>
            <Table.Body className="divide-y">
                {rowData && rowData.map((item, index) => {
                    return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item?.id}>
                        {columnData.map((title, i) => {
                            return (
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                                 key = {item.id + title.id}
                                >
                                    {title.type === 'bool' ?
                                        item[title.dataKey] === true ? 'კი' : 'არა' : (
                                        item[title.dataKey]
                                    )}
                                    {title.render && title.render(item, props)}
                                </Table.Cell>
                            )
                        })}
                    </Table.Row>

                })}
            </Table.Body>

        </Table>
    );
};

export default MyTable;