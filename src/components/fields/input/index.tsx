import React, {FC, InputHTMLAttributes, RefObject, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';


interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    ref?: any; // Include the 'ref' prop here
    isValid?:boolean,
    error?:string,
    labelClassName?:string,
    renderIcon?:() => React.ReactNode,
    withEye?:boolean
}

const Input: FC<IInputProps> = React.forwardRef(({label,isValid= true,withEye,error,labelClassName ,renderIcon,...props},ref) => {

    const [toggleEye,setToggleEye] = useState(withEye)

    const toggle = () => {
        setToggleEye(!toggleEye)
    }

    return (
        <>
            <label className={`block text-white text-sm font-bold mb-2 ${labelClassName}`} htmlFor="username">
                {label}  {!isValid && <span className = {'text-custom_light'}> / {error}</span>}
            </label>
            <div className = {'relative'}>
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isValid ? 'border-2 border-r-custom_light' : ''}`}
                    ref = {ref}
                    type = {toggleEye ? 'password' : 'text'}
                    {...props}
                />
                {withEye && (
                    <div className={'absolute right-4 cursor-pointer'} style = {{top:'50%',transform:'translateY(-50%)'}}
                      onClick={toggle}
                    >
                        {toggleEye ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}

                    </div>
                )}
                {renderIcon && renderIcon()}
            </div>

        </>
    )
});

export default Input;