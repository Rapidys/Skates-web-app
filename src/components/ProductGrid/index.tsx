import React, {FC, useCallback} from 'react';
import {IData, IServiceData} from "../../types/Dashboard";
import Card from "../Cards/ListCard";
import Loader from "../Loader";




interface IProductGrid {
    ProductData:IData,
    GridType?:string,
    loading?:boolean
}
const ProductGrid:FC<IProductGrid> = ({ ProductData , GridType = 'vertical',loading }) => {

    const { data } = ProductData


    const RenderItem = useCallback(() => {
        if(loading){
            return <div>
                <Loader />
            </div>
        }
        return data?.map((item:IServiceData) =>  <Card item = {item} key = {item.id} GridType = {GridType} />)
    },[data,GridType,loading])

    return <div className={'px-2 py-2'}>
        <div className={'py-2 ml-3 text-lg font-bold text-custom_ocean'}>
            {ProductData.sectionName}
        </div>
        <div className={`${GridType === 'vertical' ? 'flex-col' : 'flex' } `}>
            {RenderItem()}
        </div>
    </div>
};

export default ProductGrid;