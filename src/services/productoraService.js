import { axiosInstance } from "../helper/axios-config";

const getProductora = () => {
    return axiosInstance.get('productora', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const crearProductora = (data) => {
    return axiosInstance.post('productora', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const actualizarProductora = (data, productoraId) => {
    return axiosInstance.put(`productora/${productoraId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const eliminarProductora = (productoraId) => {
    return axiosInstance.delete(`productora/${productoraId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getProductora, crearProductora, actualizarProductora, eliminarProductora
}