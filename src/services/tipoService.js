import { axiosInstance } from "../helper/axios-config";

const getTipo = () => {
    return axiosInstance.get('tipo',{
        header:{
            'Content-Type': 'application/json'
        }
    })
}

const crearTipo = (data) => {
    return axiosInstance.post('tipo', data, {
        header:{
            'Content-Type': 'application/json'
        }
    })
}

const actualizarTipo = (data, tipoId) => {
    return axiosInstance.put(`tipo/${tipoId}`, data,{
        header:{
            'Content-Type': 'application/json'
        }
    })
}

const eliminarTipo = (tipoId) => {
    return axiosInstance.delete(`tipo/${tipoId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getTipo, crearTipo, actualizarTipo, eliminarTipo
}