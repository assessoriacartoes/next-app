import axios from 'axios';

const api = axios.create({
    baseURL: 'http://assessoriacartoes-api.assessoriacartoes.com.br:5000/'
});

export default api;