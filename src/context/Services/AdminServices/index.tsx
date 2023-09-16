export interface IAdminServices {
    getUsers: () => Promise<any>,
    updateUsers: (data:any) => Promise<any>,
    updateService: (data:any) => Promise<any>,
}


const AdminServices = (axios: any): IAdminServices => {

    const getUsers = () => {
        return axios.get('/user/getUsers')
    }
    const updateUsers = (data:any) => {
        return axios.post('/user/UpdateUser',data)
    }

    const updateService = (data:any) => {
        return axios.post('/reference/UpdateService',data)
    }



    return { getUsers,updateUsers,updateService }

}

export default AdminServices

