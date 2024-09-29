import React, { useState, useEffect } from 'react';
import { getDirector } from '../../services/directorService';
import { getGenero } from '../../services/generoService';
import { getTipo } from '../../services/tipoService';
import { getProductora } from '../../services/productoraService';
import { crearMedia } from '../../services/mediaService';
import Swal from 'sweetalert2';


export const MediaNew = ({ handleOpenModal, listarMedia }) => {

    const[ director, setDirector ] = useState([]);
    const[ genero, setGenero ] = useState([]);
    const[ productora, setProductora ] = useState([]);
    const[ tipo, setTipo ] = useState([]);
    const[ valoresForm, setValoresForm ] = useState([]);
    const { serial = '', titulo = '', sinopsis = '', url = '', imagen = '', anioEstreno = '', generos, directores, productoras, tipos } = valoresForm

    const listarGenero = async () => {
      try{
        const { data } = await getGenero();
        setGenero(data);

      } catch(error){
        console.log(error);
      }
    }

    useEffect(() => {
      listarGenero();
    }, []);


    const listarDirector = async () => {
      try{
        const { data } = await getDirector();
        setDirector(data);

      } catch(error){
        console.log(error);
      }
    }

    useEffect(() => {
      listarDirector();
    }, []);


    const listarProductora = async () => {
      try{
        const { data } = await getProductora();
        setProductora(data);

      } catch(error){
        console.log(error);
      }
    }

    useEffect(() => {
      listarProductora();
    }, []);


    const listarTipo = async () => {
      try{
        const { data } = await getTipo();
        setTipo(data);

      } catch(error){
        console.log(error);
      }
    }

    useEffect(() => {
      listarTipo();
    }, []);


    const handleOnChange = ({ target }) => {
      const { name, value } = target;
      setValoresForm({ ...valoresForm, [name]: value });
    }

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
      }
      console.log(media);
      try {
        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando...'
        });
        Swal.showLoading();
        const { data } = await crearMedia(media);
        handleOpenModal();
        listarMedia();
        Swal.close();
      
      } catch(error){
        console.log(error);
        Swal.close();
        let mensaje;
        if ( error && error.response && error.response.data ) {
            mensaje = error.response.data
        } else {
            mensaje = "Ocurrió un error, por favor intente de nuevo"
        }
        Swal.fire('Error', mensaje, 'error');
      }
    } 


  return (
    <div className='sidebar'>
      <div className="container-fluid">
        <div className='row mb-3'>
          <div className='col'>
            <div className='sidebar-header d-flex justify-content-between align-items-center'>
              <h3>Nueva Media</h3>
              <i className="fa-solid fa-xmark" onClick={handleOpenModal} style={{ cursor: 'pointer' }}></i>
            </div>
          </div>
        </div>
        <hr />

        <form onSubmit={(e) => handleOnSubmit(e)}>
          <div className='row mb-3'>
            <div className='col-md-6'>
              <label className="form-label">Serial</label>
              <input type="text" name='serial' 
              value={serial}
              onChange={e => handleOnChange(e)}
              className="form-control" required />
            </div>

            <div className='col-md-6'>
              <label className="form-label">Título</label>
              <input type="text" name='titulo' 
              value={titulo}
              onChange={e => handleOnChange(e)}              
              className="form-control" required />
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label className="form-label">Sinopsis</label>
              <input type="text" name='sinopsis' 
              value={sinopsis}
              onChange={e => handleOnChange(e)}              
              className="form-control" required />
            </div>

            <div className='col-md-6'>
              <label className="form-label">Url</label>
              <input type="text" name='url' 
              value={url}
              onChange={e => handleOnChange(e)}              
              className="form-control" required />
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label className="form-label">Imagen</label>
              <input type="text" name='imagen' 
              value={imagen}
              onChange={e => handleOnChange(e)}              
              className="form-control" required />
            </div>

            <div className='col-md-6'>
              <label className="form-label">Año de Estreno</label>
              <input type="number" name='anioEstreno' 
              value={anioEstreno}
              onChange={e => handleOnChange(e)}              
              className="form-control" required />
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label className="form-label">Género</label>
              <select className='form-select'
              required
              name = 'generos'
              value={generos}
              onChange={e => handleOnChange(e)}>
              <option value="" disabled selected>Selecciona un género</option>
                {
                  genero.map(({ _id, nombre }) => {
                    return <option key={_id} value={_id}>{nombre}</option>
                  })
                }
              </select>
            </div>

            <div className='col-md-6'>
              <label className="form-label">Director</label>
              <select className='form-select'
              required
              name = 'directores'
              value={directores}
              onChange={e => handleOnChange(e)}>
                <option value="" disabled selected>Selecciona un director</option>
                {
                  director.map(({ _id, nombre }) => {
                    return <option key={_id} value={_id}>{nombre}</option>
                  })
                }
              </select>
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label className="form-label">Productora</label>
              <select className='form-select'
              required
              name = 'productoras'
              value={productoras}
              onChange={e => handleOnChange(e)}>
                <option value="" disabled selected>Selecciona una productora</option>
                {
                  productora.map(({ _id, nombre }) => {
                    return <option key={_id} value={_id}>{nombre}</option>
                  })
                }
              </select>
            </div>

            <div className='col-md-6'>
              <label className="form-label">Tipo</label>
              <select className='form-select'
              required
              name = 'tipos'
              value={tipos}
              onChange={e => handleOnChange(e)}>
                <option value="" disabled selected>Selecciona un tipo</option>
                {
                  tipo.map(({ _id, nombre }) => {
                    return <option key={_id} value={_id}>{nombre}</option>
                  })
                }
              </select>
            </div>
          </div>

          <div className='row'>
            <div className='col text-start'>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Agregar Media</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};


