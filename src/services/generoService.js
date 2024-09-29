import { axiosInstance } from "../helper/axios-config";

const getGenero = () => {
    return axiosInstance.get('genero',{
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

const crearGenero = (data) => {
    return axiosInstance.post('genero', data, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

const actualizarGenero = (data, generoId) => {
    return axiosInstance.put(`genero/${generoId}`, data,{
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

const eliminarGenero = (generoId) => {
    return axiosInstance.delete(`genero/${generoId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getGenero, crearGenero, actualizarGenero, eliminarGenero
}