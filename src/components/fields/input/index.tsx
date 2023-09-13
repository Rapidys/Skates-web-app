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
    withEye?:boolean,
    onEnterPress?:() => void,
}

const Input: FC<IInputProps> = React.forwardRef(({label,isValid= true,withEye,error,labelClassName,onEnterPress ,renderIcon,...props},ref) => {

    const [toggleEye,setToggleEye] = useState(withEye)

    const toggle = () => {
        setToggleEye(!toggleEye)
    }

    const handleKeyDown = (event:any) => {
        if (event.keyCode === 13 && onEnterPress) {
            onEnterPress()
        }
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
                    onKeyDown={handleKeyDown}
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