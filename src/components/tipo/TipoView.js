import React, { useState, useEffect } from 'react';
import { getTipo, crearTipo, actualizarTipo, eliminarTipo } from '../../services/tipoService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const TipoView = () => { 

  const [valoresForm, setValoresForm] = useState([]);
  const [tipo, setTipo] = useState([]);
  const { nombre = '', descripcion = '' } = valoresForm;
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  
  const listarTipo = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getTipo();
      setTipo(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }
  
  useEffect(() => {
    listarTipo();
  }, []);
  
  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }
  
  const handleCrearTipo = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
  
      if (tipoSeleccionado) {
        await actualizarTipo(valoresForm, tipoSeleccionado);
        setTipoSeleccionado(null);
      } else {
        await crearTipo(valoresForm);
      }
      
      setValoresForm({ nombre: '', descripcion: '' });
      listarTipo();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };
  
  const handleActualizarTipo = async (e, tipo) => {
    e.preventDefault();
    setValoresForm({ nombre: tipo.nombre, descripcion: tipo.descripcion });
    setTipoSeleccionado(tipo._id); 
  };

  const handleEliminarTipo = async (tipoId) => {
    try {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar'
        });

        if (result.isConfirmed) {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();

            await eliminarTipo(tipoId);
            listarTipo();

            Swal.fire('Eliminado', 'El tipo ha sido eliminado.', 'success');
        }
    } catch (error) {
        console.log(error);
        Swal.close();
        if (error.response && error.response.status === 400) {
            Swal.fire('Error!', 'No se puede eliminar el tipo porque está en uso.', 'error');
        } else {
            Swal.fire('Error!', 'Ocurrió un error al eliminar el tipo.', 'error');
        }
    }
  };

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handleCrearTipo(e)} >
        <div className="row">
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='nombre' value={nombre} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea name='descripcion' value={descripcion} className="form-control" 
                onChange={(e) => handleOnChange(e)}></textarea>
            </div>
          </div>
        </div>
        <button className="btn btn-primary mb-3">Guardar</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            tipo.length > 0 && tipo.map((tipo, index) => {
              return <tr key={index}>
                <th scope='row'> {index + 1}</th>
                <td>{tipo.nombre}</td>
                <td>{tipo.descripcion}</td>
                <td>{moment(tipo.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(tipo.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>
                  <button className='btn btn-success btn-sm me-2' onClick={(e) => handleActualizarTipo(e, tipo)}>Actualizar</button>
                  <button className='btn btn-danger btn-sm' onClick={() => handleEliminarTipo(tipo._id)}>Eliminar</button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}