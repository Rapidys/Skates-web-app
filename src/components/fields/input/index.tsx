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
    textColor?:string,
    maxLength?:number,
    withPercent?:boolean,
    inputClassName?:string,
}

const Input: FC<IInputProps> = React.forwardRef(({label,maxLength,withPercent,textColor,isValid= true,withEye,error,labelClassName,onEnterPress ,renderIcon,inputClassName,...props},ref) => {

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
            {label && (
                <label className={`block text-${textColor ? textColor : 'white'} text-sm font-light mb-2 ${labelClassName}`} htmlFor="username">
                    {label}  {!isValid && <span className = {'text-custom_light'}> / {error}</span>}
                </label>
            )}

            <div className = {'relative'}>
                <input
                    className={`block transition-all duration-300 w-full outline-0 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 text-gray-900 font-light focus:ring disabled:opacity-40 focus:border-fuchsia-500 focus:ring-fuchsia-500/20 text-sm ${!isValid ? 'border-2 border-custom_light' : ''} ${isValid ? 'border-gray-300' : ''} rounded-md`}
                    ref = {ref}
                    style={{outline:"none"}}
                    type = {toggleEye ? 'password' : 'text'}
                    onKeyDown={handleKeyDown}
                    maxLength = {maxLength}
                    {...props}
                />
                {withEye && (
                    <div className={'absolute right-4 cursor-pointer'} style = {{top:'50%',transform:'translateY(-50%)'}}
                      onClick={toggle}
                    >
                        {toggleEye ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}

                    </div>
                )}
                {withPercent && (
                    <div className={'absolute right-4 cursor-pointer'} style = {{top:'50%',transform:'translateY(-50%)'}}
                    >
                        {'%'}

                    </div>
                )}
                {renderIcon && renderIcon()}
            </div>

        </>
    )
});

export default Input;