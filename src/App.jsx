import { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const App = () => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('/api/iniciarsesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo_electronico: correoElectronico,
          password,
        }),
      });

      console.log(response)
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al iniciar sesión');
      }
  
      // Verifica si la respuesta tiene contenido
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
  
      if (response.status === 200) {
        alert(data.message || 'Inicio de sesión exitoso');
        // Realizar acciones después de un inicio de sesión exitoso
      }
    } catch (error) {
      console.error(error);
      alert(error.message || 'Error al iniciar sesión');
    }
  };
  

  const handleRegister = () => {
    // Lógica para redirigir o manejar el registro de usuarios
    alert('Redirigiendo al registro de usuario...');
  };

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
        <form noValidate autoComplete="off" onSubmit={handleLogin}>
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            type="button"
            variant="contained"
            color="secondary"
            fullWidth
            style={{ marginTop: '16px' }}
            onClick={handleRegister}
          >
            Registrar Usuario
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default App;
