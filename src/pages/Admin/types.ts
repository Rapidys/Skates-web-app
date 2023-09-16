export interface IReferenceOptions {
   row:string,
}

export interface IUsers {
    "id": number,
    "displayName": string,
    "username": string,
    "isAdmin": boolean,
    "isActive": boolean,
    "password"?:string,
}