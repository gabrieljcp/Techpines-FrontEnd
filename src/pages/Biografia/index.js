import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#f9f9f9',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  marginTop: theme.spacing(4),
}));

const Biografia = () => {
  return (
    <CustomContainer maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Biografia
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Tião Carreiro e Pardinho
        </Typography>
        <Typography variant="body1" paragraph>
          Tião Carreiro e Pardinho foi uma das duplas mais influentes da música sertaneja brasileira, sendo referência no estilo caipira e de moda de viola. A dupla era composta por José Dias Nunes, o Tião Carreiro (1934-1993), e Antônio Henrique de Lima, o Pardinho (1932-2001).
        </Typography>
        <Typography variant="body1" paragraph>
          Tião Carreiro, natural de Montes Claros, Minas Gerais, começou sua carreira muito jovem e se destacou por seu virtuosismo na viola caipira. Ele é amplamente reconhecido como um dos maiores violeiros do Brasil, inovando no estilo pagode de viola.
        </Typography>
        <Typography variant="body1" paragraph>
          Pardinho, nascido em São Carlos, São Paulo, também teve um início precoce na música e se tornou um parceiro ideal para Tião Carreiro devido à sua habilidade vocal e carisma. Juntos, eles formaram a dupla em 1954 e rapidamente ganharam popularidade.
        </Typography>
        <Typography variant="body1" paragraph>
          Ao longo de sua carreira, Tião Carreiro e Pardinho gravaram mais de 30 discos, com sucessos que incluíram "Pagode em Brasília", "Rei do Gado", "Boi Soberano", entre outros. Eles foram pioneiros na introdução de novos elementos musicais na música sertaneja, como o uso do pagode de viola, que se tornou uma marca registrada do estilo da dupla.
        </Typography>
        <Typography variant="body1" paragraph>
          A parceria entre Tião Carreiro e Pardinho foi interrompida várias vezes devido a desentendimentos e problemas de saúde, mas sempre voltaram a se reunir devido ao grande sucesso que faziam juntos. A dupla encerrou definitivamente suas atividades com o falecimento de Tião Carreiro em 1993, e Pardinho continuou a se apresentar até sua morte em 2001.
        </Typography>
        <Typography variant="body1" paragraph>
          O legado de Tião Carreiro e Pardinho continua a influenciar gerações de músicos sertanejos e a encantar fãs da música caipira em todo o Brasil.
        </Typography>
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <img src="https://lastfm.freetls.fastly.net/i/u/avatar170s/1b4c2c445b4c21a5b5c3478096d31dd8" alt="Tião Carreiro e Pardinho" style={{ maxWidth: '100%', borderRadius: '8px' }} />
      </Box>
    </CustomContainer>
  );
};

export default Biografia;
