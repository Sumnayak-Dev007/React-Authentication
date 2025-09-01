import axios from 'axios';
const BASE_URL = 'https://web-production-04061.up.railway.app/api';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});