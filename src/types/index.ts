export interface ITableHead {
    id: number,
    head: string,
    checked?:boolean
}

export interface IPaymentTypes {
    "id"?: number,
    "displayName"?: string
    "isActive": boolean
}

export interface ITrainers {
    "id"?: number,
    "displayName"?: string,
    "isActive"?: string,
}

export interface TableColumn {
    id: number;
    head?: string;
    dataKey?: string;
    type?: string; // Optional type property
    render?: (item: any,props:any,onChange?:any) => JSX.Element;
    renderTitle?: (item:any,props:any,onChange?:any) => JSX.Element;
    checked?:boolean
}
