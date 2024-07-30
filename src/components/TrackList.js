import React from 'react';
import './TrackList.css';
import { FaTrash } from 'react-icons/fa';

const TrackList = ({ tracks, onDeleteFaixa, onFaixaClick }) => {
  return (
    <div className="track-list">
      {tracks.map((track) => (
        <div key={track.id} className="track-item" onClick={() => onFaixaClick(track.name)} >
          <h3>{track.name}</h3>
          <button className="delete-faixa-button" onClick={(e) => {
                e.stopPropagation();
                onDeleteFaixa(track.id);
            }}
            title="Excluir Faixa"
            >
                <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
