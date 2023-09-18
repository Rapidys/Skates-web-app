export interface IUsers {
    "id": number,
    "displayName": string,
    "username": string,
    "isAdmin": boolean,
    "isActive"?: boolean,
    "password"?: string,
}

export interface ILogin {
    userName:string,
    password:string
}
