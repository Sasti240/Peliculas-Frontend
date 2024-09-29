import { axiosInstance } from "../helper/axios-config";

const getGenero = () => {
    return axiosInstance.get('genero',{
        header:{
            'Content-Type': 'application/json'
        }
    })
}

const crearGenero = (data) => {
    return axiosInstance.post('genero', data, {
        header:{
            'Content-Type': 'application/json'
        }
    })
}

const actualizarGenero = (data, generoId) => {
    return axiosInstance.put(`genero/${generoId}`, data,{
        header:{
            'Content-Type': 'application/json'
        }
    })
}

const eliminarGenero = (generoId) => {
    return axiosInstance.delete(`genero/${generoId}`, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getGenero, crearGenero, actualizarGenero, eliminarGenero
}