import React from 'react';
import { Link } from 'react-router-dom';

export const MediaCard = (props) => {
    const { media } = props;

    return (
        <div className="col">
            <div className="card h-100">
                <img src={media.imagen} className="card-img-top" alt="Img" />
                <div className="card-body">
                    <h5 className="card-title">Detalles</h5>
                    <hr />
                    <p className="card-text"><strong>Serial:</strong> {media.serial}</p>
                    <p className="card-text"><strong>Título:</strong> {media.titulo}</p>
                    <p className="card-text"><strong>Sinopsis:</strong> {media.sinopsis}</p>
                    <p className="card-text"><strong>Año:</strong> {media.anioEstreno}</p>
                    <p className="card-text"><strong>Género:</strong> {media.genero.nombre}</p>
                    <p className="card-text"><strong>Director:</strong> {media.director.nombre}</p>
                    <p className="card-text"><strong>Productora:</strong> {media.productora.nombre}</p>
                    <p className="card-text"><strong>Tipo:</strong> {media.tipo.nombre}</p>
                </div>
                <div className="card-footer">
                    <Link to={`media/edit/${media._id}`}>Actualizar</Link>
                </div>
            </div>
        </div>
    );
};


