import React, {FC, useEffect, useState} from 'react';
import {IData, IServiceData} from "../../../types/Dashboard";
import Convert from "../../Convert";
import Button from "../../Button";
import {Simulate} from "react-dom/test-utils";


interface ICard {
    item: IServiceData,
    GridType:string,
}

const Card: FC<ICard> = ({item,GridType}) => {
    const [loading,setLoading] = useState(false)


    useEffect(() => {
        let timer:any;
        if(loading){
            timer = setTimeout(() => {
                setLoading(false)
            },2000)
        }
        return () => clearTimeout(timer)
    },[loading])

    const handleDetail = () => {
        setLoading(true)
    }

    console.log(GridType)

    return (
        <div className={`px-2 py-2 shadow rounded-lg mt-2 cursor-pointer w-full ${GridType === 'vertical' ? 'flex' : 'flex-col'}`}>
            <div className={`rounded-sm overflow-hidden px-2 ${GridType === 'vertical' ? 'w-1/4' : 'w-full' }`}>
                <img src={item.img} alt="#" className={'w-full h-full rounded-lg'}/>
            </div>
            <div className={`px-2 flex-col justify-between ${GridType === 'vertical' ? ' w-3/4' : 'w-full'}`} style = {{display:'flex',justifyContent:'space-between',flexDirection:'column'}}>
                <div>
                    <div className={'flex justify-between'}>
                        <div className={'text-custom_ocean font-bold'}>
                            {item.title}
                            <div className={'text-custom_ocean text-sm font-light'}>
                                {item.trainerName}
                            </div>
                        </div>
                        <div className={'text-custom_loading'}>
                            ფასი : <Convert text={item.price}/>
                        </div>
                    </div>


                    <div>
                        <div className={'text-custom_ocean py-4'}>
                            {item.description}
                            {item.description}
                            {item.description}
                        </div>
                    </div>
                </div>

                <div className={'flex justify-between'}>
                    <div className={'text-custom_ocean'}>
                        დრო: {item.time} / თვე
                    </div>
                    <Button
                        loading = {loading}
                        onClick = {handleDetail}
                    >Click Me</Button>
                </div>


            </div>

        </div>
    );
};

export default Card;