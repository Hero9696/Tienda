import { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Login = () => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Usamos el hook para navegar

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/iniciarsesion', {
        correo_electronico: correoElectronico,
        password
      });
  
      console.log("Respuesta completa del servidor:", response); // Muestra toda la respuesta, incluyendo los encabezados
      console.log("Datos de la respuesta (response.data):", response.data); // Muestra solo el cuerpo de la respuesta
  
      // Acceder al rol_idRol desde la respuesta
      const rol = response.data.rol_idRol;
      console.log("Rol del usuario:", rol); // Muestra el rol en la consola
  
      if (response.status === 200) {
        alert(response.data.message || 'Inicio de sesión exitoso');
        
        // Verificar el rol_idRol
        if (rol === 2) {
          navigate('/catalogo'); // Redirige a la vista de productos si el rol es 2 (cliente)
        } else {
          alert('No tienes acceso como Cliente');
        }
      }
    } catch (error) {
      console.error(error);
  
      if (error.response) {
        alert(error.response.data.error || 'Error al iniciar sesión');
      } else {
        alert(error.message || 'Error al iniciar sesión');
      }
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

export default Login;
