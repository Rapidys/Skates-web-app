import React, {FC} from 'react';
import {Pagination} from "flowbite-react";
import Select from "react-select";
import {IOptions} from "../../pages/Admin/orders/types";
import MySelect from "../fields/select";

interface IPagination {
    total:number,
    pageNumber:number,
    pageSize:IOptions,
    onPageChange:(page:number) => void
    onPageSizeChange:(pageSize:IOptions) => void
}
const pageSizeOptions: IOptions[] = [
    {id: 1, label: '5', value: '5'},
    {id: 6, label: '10', value: '10'},
    {id: 2, label: '25', value: '25'},
    {id: 3, label: '50', value: '50'},
    {id: 4, label: '100', value: '100'}
];
const MyPagination:FC<IPagination> = ({pageSize,pageNumber,total,onPageChange,onPageSizeChange}) => {

    const totalCount = Math.ceil(pageSize?.value && total ? total / +pageSize?.value : 0)

    return (
            <div className={'flex items-center my-2 mx-2'}>
                {totalCount > 1 && (
                    <Pagination
                        currentPage={pageNumber}
                        onPageChange = {onPageChange}
                        totalPages={totalCount}
                        previousLabel = {'უკან'}
                        nextLabel = {'წინ'}
                    />
                )}
                {total  > 5 && (
                    <div className={'ml-2 mt-2'}>
                        <MySelect
                            menuPortalTarget={document.body}
                            value={pageSize}
                            options={pageSizeOptions}
                            onSelectChange={(item: IOptions) => onPageSizeChange(item)}
                        />
                    </div>
                )}
            </div>
    );
};

export default MyPagination;