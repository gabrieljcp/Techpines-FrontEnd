import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlbumList from '../../components/AlbumList';
import TrackList from '../../components/TrackList';
import SearchIcon from '@mui/icons-material/Search';

import api from '../../services/api';

import './styles.css';

const Home = () => {
    const [albums, setAlbums] = useState([]);
    const [album, setAlbum] = useState('');
    const [faixa, setFaixa] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [selectedFaixa, setSelectedFaixa] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [track, setTrack] = useState([]);
    const [newAlbumTitle, setNewAlbumTitle] = useState('');
    const [newFaixaTitle, setNewFaixaTitle] = useState('');
    const [isInputVisibleAlbum, setInputVisibleAlbum] = useState(false);
    const [isInputVisibleFaixa, setInputVisibleFaixa] = useState(false);
  
    useEffect(() => {
      const fetchAlbums = async () => {
        try {
          const response = await api.get('api/albuns/listar');
          setAlbums(response.data);
        } catch (error) {
          console.error('Erro ao buscar álbuns:', error);
        }
      };
  
      fetchAlbums();
    }, []);

    const fetchAlbum = async () => {
        if (!album) {
            alert('Por favor, digite um álbum.');
            return;
        }

        try {
          const response = await api.get('api/album/listar', {
            params: {
              name: album
            }
          });
          setAlbums([response.data]);
        } catch (error) {
          alert('Álbum não encontrado, favor tentar novamente');
          console.error('Erro ao buscar álbum:', error);
        }
      };
  
    const fetchTracks = async (albumId) => {
        try {
            const response = await api.get('api/faixas/listar', {
              params: {
                album_id: albumId
              }
            });
            setTracks(response.data);
            setSelectedAlbum(albumId);
          } catch (error) {
            console.error('Erro ao buscar faixas:', error);
          }
    };

    const fetchTrack = async (faixaName) => {
        try {
            const response = await api.get('api/faixa/listar', {
              params: {
                name: faixaName
              }
            });
            setTrack(response.data);
            setSelectedFaixa(response.data.id);
          } catch (error) {
            console.error('Erro ao buscar faixas:', error);
          }
    };

    const fetchFaixa = async (faixa) => {
        if (!faixa) {
            alert('Por favor, digite uma faixa.');
            return;
        }

        try {
            const response = await api.get('api/faixa/listar', {
              params: {
                name: faixa
              }
            });
            setTrack(response.data);
            setSelectedFaixa(response.data.id);
            setTracks([response.data]);
            setSelectedAlbum(response.data.album_id);
          } catch (error) {
            alert('Faixa não encontrada, favor tentar novamente');
            console.error('Erro ao buscar faixas:', error);
          }
    };

    const addAlbum = async () => {
        if (!newAlbumTitle) {
            alert('Por favor, digite um título para o álbum.');
            return;
        }

        try {
            const newAlbum = {
                name: newAlbumTitle
            };
            const response = await api.post('api/albuns/criar', newAlbum);
            setAlbums([...albums, response.data]);
            setNewAlbumTitle('');
        } catch (error) {
            console.error('Erro ao adicionar álbum:', error);
        }
    };

    const addFaixa = async () => {
        if (!newFaixaTitle) {
            alert('Por favor, digite um título para a faixa.');
            return;
        }

        try {
            const newFaixa = {
                name: newFaixaTitle,
                album_id: selectedAlbum,
            };
            const response = await api.post('api/faixas/criar', newFaixa);
            setTracks([...tracks, response.data]);
            setNewFaixaTitle('');
        } catch (error) {
            console.error('Erro ao adicionar faixa:', error);
        }
    };

    const deleteAlbum = async (albumId) => {
    try {
        await api.delete('api/albuns/deletar', {
            params: {
              id: albumId
            }
          });
        setAlbums(albums.filter((album) => album.id !== albumId));
    } catch (error) {
        console.error('Erro ao excluir álbum:', error);
    }
    }; 

    const deleteFaixa = async (selectedFaixa) => {
        try {
            await api.delete('api/faixas/deletar', {
                params: {
                id: selectedFaixa
                }
            });
            setTracks(tracks.filter((track) => track.id !== selectedFaixa));
        } catch (error) {
            console.error('Erro ao excluir álbum:', error);
        }
    }; 
    
    const handleKeyDownAlbum = (event) => {
        if (event.key === 'Enter') {
          fetchAlbum();
        }
    };

    const handleKeyDownFaixa = (event) => {
        if (event.key === 'Enter') {
          fetchFaixa(faixa);
        }
    };
  
    return (
    <div className="app">
        <h1 className="titulo">Tião Carreiro e Pardinho</h1>
        <div className="titulo1">
            <h1>Álbuns</h1>
            <button className="search-button" onClick={() => setInputVisibleAlbum(!isInputVisibleAlbum)}>
                <SearchIcon />
            </button>
            {isInputVisibleAlbum && (
                <input
                    type="text"
                    className="add-album-input"
                    placeholder="Pesquisar"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                    onKeyDown={handleKeyDownAlbum}
                    style={{ width: `${album.length + 12}ch` }}
                />
            )}
        </div>
        <AlbumList 
            albums={albums} 
            onAlbumClick={fetchTracks} 
            onDeleteAlbum={deleteAlbum}
            selectedAlbum={selectedAlbum} 
        />
        <div className="add-album-container">
            <input
                type="text"
                className="add-album-input"
                placeholder="Digite o título do novo álbum"
                value={newAlbumTitle}
                onChange={(e) => setNewAlbumTitle(e.target.value)}
            />
            <button className="add-album-button" onClick={addAlbum}>
                <p>+</p>
            </button>
        </div>
        <br></br>
        {selectedAlbum && (
        <div>
            <div className="titulo1">
                <h1>Faixas</h1>
                <button className="search-button" onClick={() => setInputVisibleFaixa(!isInputVisibleFaixa)}>
                    <SearchIcon />
                </button>
                {isInputVisibleFaixa && (
                    <input
                        type="text"
                        className="add-album-input"
                        placeholder="Pesquisar"
                        value={faixa}
                        onChange={(e) => setFaixa(e.target.value)}
                        onKeyDown={handleKeyDownFaixa}
                        style={{ width: `${faixa.length + 12}ch` }}
                    />
                )}
            </div>
            <TrackList 
                tracks={tracks}
                onDeleteFaixa={deleteFaixa} 
                onFaixaClick={fetchTrack}
            />
            <div className="add-faixa-container">
            <input
                type="text"
                className="add-faixa-input"
                placeholder="Digite o título da nova faixa"
                value={newFaixaTitle}
                onChange={(e) => setNewFaixaTitle(e.target.value)}
            />
            <button className="add-faixa-button" onClick={addFaixa}>
                <p>+</p>
            </button>
        </div>
        </div>
        )}
    </div>
    );
  };
  
  export default Home;