import React, {FC} from 'react';


interface IConvert {
    text:string
}
const Convert:FC<IConvert> = ({text}) => {
    const numWithFranctions = Number(text).toFixed(2)
    const getDecimals = numWithFranctions.slice(numWithFranctions.indexOf('.'),numWithFranctions.length)
    const getFractions = numWithFranctions.slice(0,numWithFranctions.indexOf('.'))


    return (
        <span className={'italic'}>
            <span>
                {getFractions.toString()}
            </span>
            <span className={'text-sm'}>
                {getDecimals} / GEL
            </span>
        </span>
    );
};
export default Convert;