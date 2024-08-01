import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box, IconButton, Input, Modal, TextField} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import api from '../../services/api';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const Faixas = () => {
  const location = useLocation();
  const album = location.state?.album;
  const [newTrackTitle, setNewTrackTitle] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tracks, setTracks] = useState([]);
  const [track, setTrack] = useState('');

  useEffect(() => {
    if (album) {
      fetchTracks(album.id);
    } else {
      listarTodasFaixas();
    }
  }, [album]);

  const fetchTracks = async (albumId) => {
    try {
      const response = await api.get('api/faixas/listar', {
        params: { album_id: albumId },
      });
      setTracks(response.data);
    } catch (error) {
      console.error('Erro ao buscar faixas:', error);
    }
  };

  const listarTodasFaixas = async () => {
    try {
      const response = await api.get('api/faixas/todas/listar');
      setTracks(response.data);
    } catch (error) {
      console.error('Erro ao buscar todas as faixas:', error);
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter' && newTrackTitle !== '') {
      try {
        const newTrack = { album_id: album.id, name: newTrackTitle };
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

  return (
    <div>
      <div className="container">
        <Typography variant="h4" gutterBottom>
          {album ? `Todas as Faixas do álbum: ${album.name}` : 'Todas as Faixas da dupla caipira: Tião Carreiro e Pardinho'}
        </Typography>
        <Input
          placeholder="Pesquisar faixa"
          startAdornment={<SearchIcon />}
          value={track}
          onChange={(e) => setTrack(e.target.value)}
          onKeyDown={handleKeyDownTrack}
        />
      </div>
      <Container>
        {tracks.map((track) => (
          <Card sx={{ minWidth: 275 }} key={track.id}>
            <CardContent>
                {album 
                ? 
                    <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                        {track.name} 
                    </Typography>    
                :   <>
                        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                            Faixa: {track.name} 
                        </Typography>
                        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                            Álbum: {track.album_name}
                        </Typography>
                    </>
                }
            </CardContent>
            {album 
                ? 
                        <CardActions>
                            <Button
                            size="small"
                            sx={{ fontSize: '0.7rem', padding: '2px 5px', ml: 1 }}
                            onClick={() => handleDeleteTrack(track.id)}
                            >
                            Excluir Faixa
                            </Button>
                        </CardActions>    
                :   <></>
            }
          </Card>
        ))}
         {album 
            ? 
                <Card sx={{ minWidth: 275, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                    <Button onClick={handleOpen} size="large" variant="contained">
                    Adicionar nova faixa
                    </Button>
                </Card>   
            :   <></>
        }
      </Container>
        <Modal 
            open={open} 
            onClose={handleClose} 
            aria-labelledby="modal-title" 
            aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography id="modal-title" variant="h6" component="h2">
                Adicionar Nova Faixa
                </Typography>
                <IconButton onClick={handleClose}>
                <CloseIcon />
                </IconButton>
            </Box>
            <TextField
              id="standard-basic"
              label="Título"
              variant="standard"
              value={newTrackTitle}
              onChange={(e) => setNewTrackTitle(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Typography variant="body2" color="textSecondary" align="center" mt={2}>
                Pressione Enter para enviar
            </Typography>
          </Box>
        </Modal>
    </div>
  );
};

export default Faixas;
