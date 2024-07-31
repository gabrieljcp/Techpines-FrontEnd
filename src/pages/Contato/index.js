import React from 'react';
import { Box, TextField, Button, Typography, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#f9f9f9',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const Contato = () => {
  return (
    <CustomContainer maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Contato
      </Typography>
      <Typography variant="body1" gutterBottom>
        Se você tiver alguma dúvida, sugestão ou quiser entrar em contato, preencha o formulário abaixo.
      </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="nome"
              label="Nome"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="mensagem"
              label="Mensagem"
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Nossa Localização
          </Typography>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.085123703114!2d-122.42172988468164!3d37.77851987975895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085811d3e716c1b%3A0x2f0a4f7c3e9e0c0!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1618874534096!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Maps"
          ></iframe>
        </Paper>
      </Box>
    </CustomContainer>
  );
};

export default Contato;
