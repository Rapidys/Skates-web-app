import React, {useState} from 'react';
import ProductGrid from "../../components/ProductGrid";
import {data} from "../../utils/constants/mock";
import {faTh, faThLarge} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Tooltip } from 'react-tooltip'

const Dashboard = () => {


    const [GridType, setGridType] = useState('vertical')
    const [loading,setLoading] = useState(false)

    const handleGridType = (type:string) => {
        setGridType(type)
    }

    return (
        <div className={'h-screen'}>

            <div className={'flex px-2 pt-4 justify-end'}
            >
                <div className={'cursor-pointer px-2 text-2xl'}
                     data-tooltip-id="vertical-tooltip"
                     onClick = {() => handleGridType('vertical')}
                >
                    <FontAwesomeIcon icon={faThLarge}/>
                </div>

                <Tooltip
                    id="vertical-tooltip"
                    place="bottom"
                    content="ვერტიკალური"
                />


                <Tooltip
                    id="horizontal-tooltip"
                    place="bottom"
                    content="ჰორიზონტალური"
                />

                <div className={'cursor-pointer text-2xl'}
                     data-tooltip-id="horizontal-tooltip"
                     onClick = {() => handleGridType('horizontal')}
                >
                    <FontAwesomeIcon icon={faTh}/>
                </div>
            </div>

            <ProductGrid ProductData={data} GridType = { GridType } loading={loading}/>

        </div>
    );
};

export default Dashboard;