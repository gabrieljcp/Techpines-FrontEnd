import React from 'react';
import './AlbumList.css';
import { FaTrash } from 'react-icons/fa';

const AlbumList = ({ albums, onAlbumClick, onDeleteAlbum, selectedAlbum  }) => {
  return (
    
    <div className="album-list">
      {albums.map((album) => (
        <div 
            key={album.id} 
            className={`album-item ${selectedAlbum === album.id ? 'selected' : ''}`}
            onClick={() => onAlbumClick(album.id)} 
        >
          <h2>{album.name}</h2>
          <button className="delete-album-button" onClick={(e) => {
                e.stopPropagation();
                onDeleteAlbum(album.id);
            }}
            title="Excluir Álbum"
            >
                <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
