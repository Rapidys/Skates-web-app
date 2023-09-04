import React, {FC} from 'react';
import Card from "../../Cards/Card";


interface IFullScreenModal {
    children:React.ReactNode,
    open:boolean
}
const FullScreenModal:FC<IFullScreenModal> = ({children,open}) => {
    return (
        open && (
            <div className={'fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center'}>
                <Card className={'bg-custom_button'}>
                    {children}
                </Card>
            </div>
        )
    );
};

export default FullScreenModal;