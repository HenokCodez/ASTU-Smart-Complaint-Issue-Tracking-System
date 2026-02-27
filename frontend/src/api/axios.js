import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api`;

const API = axios.create({
    baseURL: API_URL,
});

// Automatically add token to requests if it exists
API.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export default API;
