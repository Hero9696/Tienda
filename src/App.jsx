import { Container, TextField, Button, Typography, Box } from '@mui/material';


const App = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Inicio de Sesión
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '16px' }}
          >
            Iniciar Sesión
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '16px' }}
          >
            Registrar Usuario
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default App;