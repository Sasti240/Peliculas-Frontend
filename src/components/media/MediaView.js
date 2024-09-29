import React, { useEffect, useState } from "react";
import { getMedia } from "../../services/mediaService";
import { MediaCard } from "./MediaCard";
import { MediaNew } from "./MediaNew";
import Swal from 'sweetalert2';

export const MediaView = () => {

  const [ media, setMedia ] = useState([]);
  const [ openModal, setOpenModal ] = useState(false);

  const listarMedia = async () => {
    try{
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const{ data } = await getMedia();
      console.log(data);
      Swal.close();
      setMedia(data);

    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }
  
  useEffect(() => {
    listarMedia();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }

  return (
    <div className="container">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          media.map((media) => {
            return <MediaCard key = {media._id} media = {media} />
          })
        }
      </div> 
      {
        openModal ? <MediaNew 
        handleOpenModal = { handleOpenModal }
        listarMedia = { listarMedia } /> :
        <button type="button" className="btn btn-primary agr" onClick= { handleOpenModal }>
        <i className="fa-solid fa-plus"></i>
        </button>
      }

    </div>
  )
}

