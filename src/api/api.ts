import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.7:3000',  // Use local IP for mobile debugging
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Fetch the token from localStorage
        if (token) {
            config.headers['Authorization'] = token; // Attach token to the request
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response, // Return the response if it's successful
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log('Unauthorized access - Please log in again.');
        }
        return Promise.reject(error);
    }
);

export default api;