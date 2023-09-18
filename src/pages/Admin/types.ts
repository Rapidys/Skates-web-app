import {IServiceItem} from "../Dashboard/types";
import React from "react";
type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export interface IModal {
    createUserModal?: boolean,
    createServiceModal?: boolean,
    alertModal?: boolean,
    createPaymentType?: boolean,
    createTrainers?: boolean,
}

export interface ICreate {
    modals: IModal,
    setModals: SetStateFunction<IModal>,
    currentReferenceItem: IServiceItem,
    getCall: () => void,
    setCurrentServiceItem: SetStateFunction<IServiceItem>,
}