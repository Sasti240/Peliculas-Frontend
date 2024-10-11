import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:4000'
    baseURL: 'https://peliculas-backend-lfz5.onrender.com/'
});

export{
    axiosInstance
}