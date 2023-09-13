import {IConsumeOrder} from "../../../types/Dashboard";

export interface IAuthServices {
    login: (data:any) => Promise<any>,
}


const AuthServices = (axios: any): IAuthServices => {

    const login = (data:any) => {
        return axios.post('/auth/login',data)
    }

    return { login }

}

export default AuthServices