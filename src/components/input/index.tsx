import React, {FC, InputHTMLAttributes} from 'react';


interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
}

const Input: FC<IInputProps> = ({label, ...props}) => {

    return (
        <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                {label}
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...props}/>
        </div>
    )
};

export default Input;