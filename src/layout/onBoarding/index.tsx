import React, {FC} from 'react';


interface IOnBoarding {
    children:React.ReactNode
}
const OnBoardingLayout:FC<IOnBoarding> = ({children}) => {
    return (
        <div className={'w-screen h-screen bg-custom_dark flex justify-center items-center'}>
            {children}
        </div>
    );
};

export default OnBoardingLayout;