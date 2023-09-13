import axios from 'axios';

const axiosInstance = (handleSetError?:any) => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    });

    instance.interceptors.response.use(
        (response) => {
            // If the request was successful, return the response
            return response;
        },
        (error) => {
            // Handle any errors here
            const { status } = error?.response
            const { Message } = error?.response?.data

            if(status === 401){
                localStorage.removeItem('token')
            }
            if (error.response) {
                handleSetError(Message);
                return Promise.reject(error.response.data);
            } else if (error.request) {
                handleSetError(Message);
                return Promise.reject('Network Error');
            } else {
                handleSetError(Message);
                return Promise.reject(error.message);
            }
        }
    );

    return instance;
};

export default axiosInstance;
