import axios from 'axios';

const api = axios.create({
    baseURL: 'http://212.1.214.170:5000/'
});

export default api;