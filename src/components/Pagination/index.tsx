import React, {FC} from 'react';
import {Pagination} from "flowbite-react";
import Select from "react-select";
import {IOptions} from "../../pages/Admin/orders/types";

interface IPagination {
    total:number,
    pageNumber:number,
    pageSize:IOptions,
    onPageChange:(page:number) => void
    onPageSizeChange:(pageSize:IOptions) => void
}
const pageSizeOptions: IOptions[] = [
    {id: 1, label: '10', value: '10'},
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

                <Select
                    menuPortalTarget={document.body}
                    value={pageSize}
                    options={pageSizeOptions}
                    onChange={(item: IOptions) => onPageSizeChange(item)}
                    styles={{
                        menuPortal: base => (
                            {...base, zIndex: 9999}
                        ),
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? '#14b8a6' : '#d1d5db',
                            backgroundColor: '#fff',
                            borderRadius:'0.5rem',
                            color: '#0f172a',
                            marginTop: '0.5rem',
                            marginLeft: 5
                        })
                    }}
                />
            </div>
    );
};

export default MyPagination;