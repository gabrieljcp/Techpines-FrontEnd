import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box, IconButton, Input, Modal, TextField, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import api from '../../services/api';
import SearchIcon from '@mui/icons-material/Search';

const Faixas = () => {
  const location = useLocation();
  const album  = location.state?.album;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newTrackTitle, setNewTrackTitle] = useState('');
  const [tracks, setTracks] = useState([]);
  const [track, setTrack] = useState([]);

  useEffect(() => {
  const fetchTracks = async () => {
    try {
        const response = await api.get('api/faixas/listar', {
          params: {
            album_id: album.id
          }
        });
        setTracks(response.data);
      } catch (error) {
        console.error('Erro ao buscar faixas:', error);
      }
  };

  fetchTracks();
  }, []);

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
        if (newTrackTitle == '') {
            alert('Por favor, digite um título para a faixa.');
            return;
        }
        
        try {
          const newTrack = {
            album_id: album.id,
            name: newTrackTitle
          };  
          const response = await api.post('api/faixas/criar', newTrack);
          
          setTracks([...tracks, response.data]);
          setNewTrackTitle('');
          handleClose();
        } catch (error) {
          console.error('Erro ao adicionar faixa:', error);
        }
    }
  };

  const handleDeleteTrack = async (trackId) => {
    try {
        await api.delete('api/faixas/deletar', {
            params: {
              id: trackId
            }
          });
        setTracks(tracks.filter((track) => track.id !== trackId));
    } catch (error) {
      console.error('Erro ao excluir álbum:', error);
    }
  };

  const handleKeyDownTrack = async (event) => {
    if (event.key === 'Enter') {
        if (track == '') {
            try {
                const response = await api.get('api/faixas/listar', {
                    params: {
                      album_id: album.id
                    }
                  });
                setTracks(response.data);
              } catch (error) {
                console.error('Erro ao buscar faixas:', error);
              }
              return;
        }
        
        try {
        const response = await api.get('api/faixa/listar', {
            params: {
                name: track
            }
              });
          
          setTracks([response.data]);
        } catch (error) {
          alert('Álbum não encontrado!');  
          console.error('Álbum não cadastrado', error);
        }
    }
  };

  const Container = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center',
    padding: '16px',
  });
  
  const modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

  if (!album) {
    return (
      <div>
        <Typography variant="h5">Todas as Faixas</Typography>
      </div>
    );
  }
  
  return (
    <div>
      <div className="container">
        <Typography variant="h4" gutterBottom>
        Todas as Faixas do álbum: {album.name}
        </Typography>
        <Input 
            placeholder="Pesquisar faixa" 
            startAdornment={<SearchIcon />}
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            onKeyDown={handleKeyDownTrack}
        />
      </div>
      <Container gutterBottom>
        {tracks.map((track) => (
          <Card sx={{ minWidth: 275 }} key={track.id}>
            <CardContent>
              <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                {track.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                sx={{ fontSize: '0.7rem', padding: '2px 5px', ml: 1 }}
                onClick={() => handleDeleteTrack(track.id)}
              >
                Excluir Faixa
              </Button>
            </CardActions>
          </Card>
        ))}
        <Card sx={{ minWidth: 275, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
            <Button onClick={handleOpen} size="large" variant="contained">Adicionar nova faixa</Button>
        </Card>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-title" variant="h6" component="h2">
                    Adicionar Nova Faixa
                </Typography>
                <TextField 
                    id="standard-basic" 
                    label="Título" 
                    variant="standard" 
                    value={newTrackTitle}
                    onChange={(e) => setNewTrackTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default Faixas;
