import React, {FC} from 'react';


interface ICard {
    children:React.ReactNode
}
const Card:FC<ICard> = ({children}) => {
    return (
        <div className={'w-1/3 h-1/4 shadow border-b-2 border-b-custom_light p-2 rounded-lg'}>
            {children}
        </div>
    );
};

export default Card;