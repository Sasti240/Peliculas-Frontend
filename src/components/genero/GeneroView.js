import React, { useState, useEffect } from 'react';
import { getGenero, crearGenero, actualizarGenero, eliminarGenero } from '../../services/generoService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const GeneroView = () => { 

  const [valoresForm, setValoresForm] = useState({ nombre: '', descripcion: '', estado: '' });
  const [genero, setGenero] = useState([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState(null);
  
  const listarGenero = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getGenero();
      setGenero(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };
  
  useEffect(() => {
    listarGenero();
  }, []);
  
  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  };
  
  const handleCrearGenero = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
  
      if (generoSeleccionado) {
        await actualizarGenero(valoresForm, generoSeleccionado);
        setGeneroSeleccionado(null);
      } else {
        await crearGenero(valoresForm);
      }
      
      setValoresForm({ nombre: '', descripcion: '', estado: '' });
      listarGenero();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };
  
  const handleActualizarGenero = async (e, genero) => {
    e.preventDefault();
    setValoresForm({ 
      nombre: genero.nombre, 
      descripcion: genero.descripcion, 
      estado: genero.estado 
    });
    setGeneroSeleccionado(genero._id); 
  };
  
  const handleEliminarGenero = async (generoId) => {
    try {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await eliminarGenero(generoId);
          Swal.fire('Eliminado!', 'El género ha sido eliminado.', 'success');
          listarGenero();
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire('Error!', 'Ocurrió un error al eliminar el género.', 'error');
    }
  };
  
  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handleCrearGenero(e)} >
        <div className="row">
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='nombre' value={valoresForm.nombre} type="text" className="form-control"
                onChange={handleOnChange} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea required name='descripcion' value={valoresForm.descripcion} className="form-control" 
                onChange={handleOnChange}></textarea>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select required name='estado' value={valoresForm.estado} className="form-select" 
                onChange={handleOnChange}>
                <option value="">--SELECCIONE--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
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
            <th scope="col">Estado</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            genero.length > 0 && genero.map((genero, index) => {
              return <tr key={index}>
                <th scope='row'> {index + 1}</th>
                <td>{genero.nombre}</td>
                <td>{genero.descripcion}</td>
                <td>{genero.estado}</td>
                <td>{moment(genero.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(genero.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>
                  <button className='btn btn-success btn-sm me-2' onClick={(e) => handleActualizarGenero(e, genero)}>Actualizar</button>
                  <button className='btn btn-danger btn-sm' onClick={() => handleEliminarGenero(genero._id)}>Eliminar</button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}