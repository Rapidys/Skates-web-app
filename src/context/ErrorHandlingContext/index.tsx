import React, {FC, useContext, useEffect, useState} from 'react';
import {Toast} from "flowbite-react";


const ErrorHandling = React.createContext({
    error: {},
    handleSetError: (message: string,type:string) => {
    }
})

interface IErrorHandlingContextProvider {
    children: React.ReactNode
}

const ErrorHandlingContextProvider: FC<IErrorHandlingContextProvider> = ({children}) => {

    const [error, setError] = useState({type: '', message: ''})

    const handleSetError = (message: string,type = 'error') => {
        setError({
            ...error,
            type,
            message
        })
    }

    const handleHide = () => {
        setError({type: '', message: ''})
    }


    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        if (error.message) {
            timer = setTimeout(() => {
                handleHide();
            }, 3000);
        }

        // Return a cleanup function
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [error]);


    return (
        <ErrorHandling.Provider
            value={{error, handleSetError}}
        >
            {
                error?.message && (
                    <Toast
                        className={`fixed top-10 z-30 transition ${error?.type === 'error' ? 'bg-custom_danger' : 'bg-custom_button'}`}
                        style={{transform: 'translateX(-50%)', left: '50%',zIndex:99999}}>
                        <div className="ml-3 text-sm font-normal text-white">
                            {error?.message}
                        </div>
                        <Toast.Toggle className={`${error?.type === 'error' ? 'bg-custom_danger' : 'bg-custom_button'} hover:bg-custom_danger hover:text-white`}
                                      onClick={handleHide}/>
                    </Toast>
                )
            }

            {children}
        </ErrorHandling.Provider>
    );
};

export const useErrorHandling = () => useContext(ErrorHandling)
export default ErrorHandlingContextProvider;