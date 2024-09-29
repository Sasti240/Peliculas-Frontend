import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaPorId, actualizarMedia } from '../../services/mediaService';
import { getGenero } from '../../services/generoService';
import { getProductora } from '../../services/productoraService';
import { getTipo } from '../../services/tipoService';
import { getDirector } from '../../services/directorService';
import Swal from 'sweetalert2';

export const MediaUpdate = () => {
    const { mediaId = '' } = useParams();
    const [media, setMedia] = useState();
    const [director, setDirector] = useState([]);
    const [genero, setGenero] = useState([]);
    const [productora, setProductora] = useState([]);
    const [tipo, setTipo] = useState([]);
    const [valoresForm, setValoresForm] = useState([]);
    const { serial = '', titulo = '', sinopsis = '', url = '', imagen = '', anioEstreno = '', generos, directores, productoras, tipos } = valoresForm;

    const listarGenero = async () => {
        try {
            const { data } = await getGenero();
            setGenero(data);
        } catch (error) {
            console.log(error);
        }
    };

    const listarDirector = async () => {
        try {
            const { data } = await getDirector();
            setDirector(data);
        } catch (error) {
            console.log(error);
        }
    };

    const listarProductora = async () => {
        try {
            const { data } = await getProductora();
            setProductora(data);
        } catch (error) {
            console.log(error);
        }
    };

    const listarTipo = async () => {
        try {
            const { data } = await getTipo();
            setTipo(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getMedia = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await getMediaPorId(mediaId);
            console.log(data);
            setMedia(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    };

    useEffect(() => {
        listarGenero();
        listarDirector();
        listarProductora();
        listarTipo();
        getMedia();
    }, [mediaId]);

    useEffect(() => {
        if (media) {
            setValoresForm({
                serial: media.serial,
                titulo: media.titulo,
                sinopsis: media.sinopsis,
                url: media.url,
                imagen: media.imagen,
                anioEstreno: media.anioEstreno,
                generos: media.genero,
                directores: media.director,
                productoras: media.productora,
                tipos: media.tipo
            });
        }
    }, [media]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const media = {
            serial, titulo, sinopsis, url, imagen, anioEstreno,
            genero: {
                _id: generos
            },
            director: {
                _id: directores
            },
            productora: {
                _id: productoras
            },
            tipo: {
                _id: tipos
            }
        };
        console.log(media);
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await actualizarMedia(mediaId, media);
            Swal.close();
            window.location.href = '/';
        } catch (error) {
            console.log(error);
            Swal.close();
            let mensaje;
            if (error && error.response && error.response.data) {
                mensaje = error.response.data;
            } else {
                mensaje = "Ocurrió un error, por favor intente de nuevo";
            }
            Swal.fire('Error', mensaje, 'error');
        }
    };

    return (
        <div className='container-fluid mt-3 mv-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Detalle Activo</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img 
                                src={media?.imagen} 
                                alt={titulo} 
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
                            />
                        </div>
                        <div className='col-md-8'>
                            <form onSubmit={handleOnSubmit}>
                                <div className='row mb-3'>
                                    <div className='col-md-6'>
                                        <label className="form-label">Serial</label>
                                        <input 
                                            type="text" 
                                            name='serial' 
                                            value={serial}
                                            onChange={handleOnChange}
                                            className="form-control" 
                                            required 
                                        />
                                    </div>
                                    <div className='col-md-6'>
                                        <label className="form-label">Título</label>
                                        <input 
                                            type="text" 
                                            name='titulo' 
                                            value={titulo}
                                            onChange={handleOnChange}              
                                            className="form-control" 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col-md-6'>
                                        <label className="form-label">Sinopsis</label>
                                        <input 
                                            type="text" 
                                            name='sinopsis' 
                                            value={sinopsis}
                                            onChange={handleOnChange}              
                                            className="form-control" 
                                            required 
                                        />
                                    </div>
                                    <div className='col-md-6'>
                                        <label className="form-label">Url</label>
                                        <input 
                                            type="text" 
                                            name='url' 
                                            value={url}
                                            onChange={handleOnChange}              
                                            className="form-control" 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col-md-6'>
                                        <label className="form-label">Imagen</label>
                                        <input 
                                            type="text" 
                                            name='imagen' 
                                            value={imagen}
                                            onChange={handleOnChange}              
                                            className="form-control" 
                                            required 
                                        />
                                    </div>
                                    <div className='col-md-6'>
                                        <label className="form-label">Año de Estreno</label>
                                        <input 
                                            type="number" 
                                            name='anioEstreno' 
                                            value={anioEstreno}
                                            onChange={handleOnChange}              
                                            className="form-control" 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col-md-6'>
                                        <label className="form-label">Género</label>
                                        <select 
                                            className='form-select'
                                            required
                                            name='generos'
                                            value={generos}
                                            onChange={handleOnChange}
                                        >
                                            <option value="" disabled>Selecciona un género</option>
                                            {
                                                genero.map(({ _id, nombre }) => (
                                                    <option key={_id} value={_id}>{nombre}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-md-6'>
                                        <label className="form-label">Director</label>
                                        <select 
                                            className='form-select'
                                            required
                                            name='directores'
                                            value={directores}
                                            onChange={handleOnChange}
                                        >
                                            <option value="" disabled>Selecciona un director</option>
                                            {
                                                director.map(({ _id, nombre }) => (
                                                    <option key={_id} value={_id}>{nombre}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col-md-6'>
                                        <label className="form-label">Productora</label>
                                        <select 
                                            className='form-select'
                                            required
                                            name='productoras'
                                            value={productoras}
                                            onChange={handleOnChange}
                                        >
                                            <option value="" disabled>Selecciona una productora</option>
                                            {
                                                productora.map(({ _id, nombre }) => (
                                                    <option key={_id} value={_id}>{nombre}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col-md-6'>
                                        <label className="form-label">Tipo</label>
                                        <select 
                                            className='form-select'
                                            required
                                            name='tipos'
                                            value={tipos}
                                            onChange={handleOnChange}
                                        >
                                            <option value="" disabled>Selecciona un tipo</option>
                                            {
                                                tipo.map(({ _id, nombre }) => (
                                                    <option key={_id} value={_id}>{nombre}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col text-start'>
                                        <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Actualizar</button>
                                        <button type="button" className="btn btn-secondary" style={{ marginTop: '10px', marginLeft: '10px' }} onClick={() => window.location.href = '/'}>Cancelar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

