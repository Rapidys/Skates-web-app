export interface IDashboardServices {
    getServices: () => Promise<any>,
    getPaymentTypes: () => Promise<any>,
    getTrainers: () => Promise<any>,
}

const DashboardServices = (axios: any): IDashboardServices => {

    const getServices = () => {
        return axios.get('/Reference/GetServices')
    }
    const getPaymentTypes = () => {
        return axios.get('/Reference/GetPaymentTypes')
    }
    const getTrainers = () => {
        return axios.get('/Reference/GetTrainers')
    }

    return {getServices,getPaymentTypes,getTrainers}

}

export default DashboardServices