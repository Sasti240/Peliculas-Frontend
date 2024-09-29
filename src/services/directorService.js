import { axiosInstance } from "../helper/axios-config";

const getDirector = () => {
    return axiosInstance.get('director', {
        headers: {  
            'Content-Type': 'application/json'
        }
    });
}

const crearDirector = (data) => {
    return axiosInstance.post('director', data, {
        headers: { 
            'Content-Type': 'application/json'
        }
    });
}

const actualizarDirector = (data, directorId) => {
    return axiosInstance.put(`director/${directorId}`, data, {
        headers: { 
            'Content-Type': 'application/json'
        }
    });
}

const eliminarDirector = (directorId) => {
    return axiosInstance.delete(`director/${directorId}`, {
        headers: { 
            'Content-Type': 'application/json'
        }
    });
}

export {
    getDirector, crearDirector, actualizarDirector, eliminarDirector  
};