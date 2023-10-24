import React, {ButtonHTMLAttributes, FC} from 'react';
import Loader from "../Loader";


interface IButton extends ButtonHTMLAttributes<HTMLElement> {
    children: React.ReactNode,
    disabled?: boolean,
    loading?: boolean,
    className?: string,
    color?: string
}

const Button: FC<IButton> = ({children, loading, className, color, disabled, ...props}) => {


    const ButtonStyleByType = (disabled = false) => {
        if (disabled) {
            return 'bg-custom_disabled'
        }
        switch (color) {
            case 'secondary' :
                return 'bg-custom_loading';
            case 'danger' :
                return 'bg-custom_danger';
            case 'inherit' :
                return 'inherit';
            default :
                return 'bg-custom_ocean'
        }
    }


    return (
        <button
            className={`btn px-4 py-2 flex justify-center items-center text-white shadow ${loading ? 'w-10 h-10 rounded-full' : 'rounded-lg'} ${ButtonStyleByType(disabled)} hover:${disabled ? '' :'bg-custom_light'} transition ${className ? className : ''}`}
            disabled={disabled}
            {...props}
        >
            {loading ? <Loader/> : children}
        </button>

    );
};

export default Button;