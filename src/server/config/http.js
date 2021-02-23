import axios from 'axios';

const http = axios.create({
    baseURL: 'https://api.mercadolibre.com/',
    timeout: 10000,
    headers: {
        Accept: 'application/json'
    }
});

export default http;