export interface IAdminServices {
    getUsers: () => Promise<any>,
    updateUsers: (data:any) => Promise<any>,
}


const AdminServices = (axios: any): IAdminServices => {

    const getUsers = () => {
        return axios.get('/user/getUsers')
    }
    const updateUsers = (data:any) => {
        return axios.post('/user/UpdateUser',data)
    }

    return { getUsers,updateUsers }

}

export default AdminServices

// {
//     "Id": -1000, //tu 0 ze metia axali tu 0ze naklebi dzveli
//     "displayName": "jumberiko",
//     "userName: "jumberiko@arena.ge",
//     "password": "asdASD123",
//     "IsAdmin": false,
//     "IsActive": true,
// }