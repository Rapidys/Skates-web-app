import axios from 'axios';

const axiosInstance = (handleSetError?:any) => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    });

    instance.interceptors.response.use(
        (response) => {
            const { errorMessage ,status } = response?.data

            if(response.status === 200 && errorMessage){
                handleSetError(errorMessage);
            }
            return response;
        },
        (error) => {
            // Handle any errors here
            const { status } = error?.response
            const { Message ,errorMessage } = error?.response?.data

            if(status === 401){
                localStorage.removeItem('token')
                handleSetError(Message);
                return Promise.reject(error.response.data);
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
