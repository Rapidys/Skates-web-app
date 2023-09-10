import React, {FC, useContext, useEffect, useState} from 'react';
import {Toast} from "flowbite-react";


const ErrorHandling = React.createContext({
    error: {},
    handleSetError: (message: string) => {
    }
})

interface IErrorHandlingContextProvider {
    children: React.ReactNode
}

const ErrorHandlingContextProvider: FC<IErrorHandlingContextProvider> = ({children}) => {

    const [error, setError] = useState({type: 'error', message: ''})

    const handleSetError = (message: string) => {
        setError({
            ...error,
            message
        })
    }

    const handleHide = () => {
        setError({type: 'error', message: ''})
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
                        className={`fixed top-10 z-30 ${error?.type === 'error' ? 'bg-custom_danger' : 'bg-custom_button'}`}
                        style={{transform: 'translateX(-50%)', left: '50%'}}>
                        <div className="ml-3 text-sm font-normal text-white">
                            {error?.message}
                        </div>
                        <Toast.Toggle className={`${error?.type === 'error' ? 'bg-custom_danger' : 'bg-custom_button'}\`}`}
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