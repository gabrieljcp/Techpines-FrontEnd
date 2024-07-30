import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import api from '../../services/api';
import { Box, IconButton, Modal, TextField, Tooltip } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

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

export default function BasicCard() {
  const [albums, setAlbums] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const navigate = useNavigate();

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

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
        if (newAlbumTitle == '') {
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
          handleClose();
        } catch (error) {
          console.error('Erro ao adicionar álbum:', error);
        }
    }
  };

  const handleDeleteAlbum = async (albumId) => {
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

  const handleViewTracks = (album) => {
    navigate('/faixas', { state: { album } });
  };

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Álbuns
      </Typography>
      <Container>
        {albums.map((album) => (
          <Card sx={{ minWidth: 275 }} key={album.id}>
            <CardContent>
              <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                {album.name}
              </Typography>
            </CardContent>
            <CardActions>
            <Button
                size="small"
                sx={{ fontSize: '0.7rem', padding: '2px 5px' }}
                onClick={() => handleViewTracks(album)}
              >
                Ver Faixas
              </Button>
              <Button
                size="small"
                sx={{ fontSize: '0.7rem', padding: '2px 5px', ml: 1 }}
                onClick={() => handleDeleteAlbum(album.id)}
              >
                Excluir Álbum
              </Button>
            </CardActions>
          </Card>
        ))}
        <Card sx={{ minWidth: 275, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
            <Button onClick={handleOpen} size="large" variant="contained">Adicionar novo álbum</Button>
        </Card>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-title" variant="h6" component="h2">
                    Adicionar Novo Álbum
                </Typography>
                <TextField 
                    id="standard-basic" 
                    label="Título" 
                    variant="standard" 
                    value={newAlbumTitle}
                    onChange={(e) => setNewAlbumTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </Box>
        </Modal>
      </Container>
    </>
  );
}
