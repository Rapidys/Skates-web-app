import React, {FC, InputHTMLAttributes, RefObject} from 'react';


interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    ref?: any; // Include the 'ref' prop here
    isValid?:boolean,
    error?:string,
    labelClassName?:string,
    renderIcon?:() => React.ReactNode
}

const Input: FC<IInputProps> = React.forwardRef(({label,isValid= true,error,labelClassName ,renderIcon,...props},ref) => {

    return (
        <div className="mb-4">
            <label className={`block text-white text-sm font-bold mb-2 ${labelClassName}`} htmlFor="username">
                {label}  {!isValid && <span className = {'text-custom_light'}> / {error}</span>}
            </label>
            <div className = {'relative'}>
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isValid ? 'border-2 border-r-custom_light' : ''}`}
                    ref = {ref}
                    {...props}
                />
                {renderIcon && renderIcon()}
            </div>

        </div>
    )
});

export default Input;