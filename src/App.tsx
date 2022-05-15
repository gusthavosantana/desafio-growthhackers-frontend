import { Container, Divider, Typography } from '@mui/material';

function App({ children }: any) {
  return (
    <Container maxWidth="md">
      <Typography variant="h2">Desafio Growth Hackers</Typography>
      <Divider sx={{ marginBottom: 5, marginTop: 2 }}/>
      {children}
    </Container>
  );
}

export default App;
