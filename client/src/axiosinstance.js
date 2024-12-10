import axios from 'axios';

const axiosinstance = axios.create({
  baseURL: "http://localhost:5000", 
});

axiosinstance.interceptors.request.use(

    (config) => {
        const token = localStorage.getItem('userToken')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            console.warn('No token found, user may need to log in.');
        }

        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

export default axiosinstance;
