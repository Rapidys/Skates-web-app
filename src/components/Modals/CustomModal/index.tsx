import React, {FC, useEffect, useState} from 'react';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ICustomModal {
    show:boolean,
    dismissible:boolean,
    onClose:() => void,
    children:React.ReactNode,
    renderFooter:React.ReactNode
    renderHeader:React.ReactNode,
    handleCloseModal:(type?:any) => void
}
const CustomModal:FC<ICustomModal> = ({show,onClose,dismissible,children,renderFooter,renderHeader,handleCloseModal}) => {

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [show]);

    return (
        <div className={`${show ? 'fixed z-20' : '-opacity-1 -z-1 hidden'}  top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center overflow-hidden`}
          onClick={() => dismissible && onClose()}
        >
              <div className={'w-[95%] md:w-2/3 h-2/3 bg-white rounded-lg flex-col justify-between px-2'}>
                  <div className={'h-1/6 flex items-center justify-between relative'}>
                      <div>
                          {renderHeader}
                      </div>
                      <div className={'absolute right-4 top-6 cursor-pointer'} onClick={() => {
                          handleCloseModal()
                          onClose()
                      }}>
                          <FontAwesomeIcon icon={faTimes} className={'text-2xl'}/>
                      </div>
                  </div>
                  <div className={'h-4/6 overflow-scroll'}>
                      {children}
                  </div>
                  <div className={'h-1/6'}>
                      {renderFooter}
                  </div>
              </div>
        </div>
    );
};

export default CustomModal;