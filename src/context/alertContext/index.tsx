import React, {FC, useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Toast} from "flowbite-react";


const AlertContext = React.createContext({
    handleAlert:(message:string,type:string) => {}
})

interface IAccountContext {
    children:React.ReactNode
}
const AlertContextProvider:FC<IAccountContext> = ({children}) => {

    const [state,setState] = useState({
        type:'',
        message:''
    })

    const handleAlert = (message:string,type:string) => {
        setState({
            ...state,
            message,
            type
        })
    }

    const handleToggle = () => {
        setState({
            type:'',
            message:''
        })
    }

    return (
        <AlertContext.Provider value={{
            handleAlert:handleAlert
        }}>
            {
                state?.message  && (
                    <Toast className = {`fixed top-10 z-30 ${state?.type === 'error' ? 'bg-custom_danger' : 'bg-custom_button'}`} style = {{transform:'translateX(-50%)',left:'50%'}}>
                        <div className="ml-3 text-sm font-normal text-white">
                            {state?.message}
                        </div>
                        <Toast.Toggle  className={`${state?.type === 'error' ? 'bg-custom_danger' : 'bg-custom_button'}\`}`} onClick={handleToggle}/>
                    </Toast>
                )
            }

            {children}
        </AlertContext.Provider>
    );
};

export default AlertContextProvider;

export const useAlert = () => useContext(AlertContext)