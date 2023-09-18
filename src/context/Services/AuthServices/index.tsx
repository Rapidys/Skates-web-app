import {MyAxios} from "../ServiceContextProvider";
import {AxiosResponse} from "axios";
import {ILogin} from "../../../types/auth";

export interface IAuthServices {
    login: (data:ILogin) => Promise<AxiosResponse>,
}

const AuthServices = (axios: MyAxios): IAuthServices => {

    const login = (data:ILogin) => {
        return axios.post('/auth/login',data)
    }

    return { login }

}

export default AuthServices