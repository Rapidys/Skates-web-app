import React, {ButtonHTMLAttributes, FC} from 'react';
import Loader from "../Loader";


interface IButton extends ButtonHTMLAttributes<HTMLElement>{
    children: React.ReactNode,
    disabled?: boolean,
    loading?: boolean,
}

const Button: FC<IButton> = ({children, loading, disabled, ...props}) => {


    return (
        <button
            className={`btn px-4 py-2 flex justify-center items-center bg-custom_ocean text-white shadow ${loading ? 'w-10 h-10 rounded-full' : 'rounded-lg'} hover:bg-custom_light transition`}
            disabled={disabled}
            {...props}
        >
            {loading ? <Loader/> : children}
        </button>

    );
};

export default Button;