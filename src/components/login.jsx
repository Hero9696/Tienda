import { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/iniciarsesion', {
        correo_electronico: correoElectronico,
        password
      });
  
      const { message, rol_idRol, idUsuarios, token } = response.data;
      if (response.status === 200) {
        alert(message || 'Inicio de sesión exitoso');
  
       
        localStorage.setItem('token', token);
        localStorage.setItem('idUsuarios', idUsuarios);
  
        
        if (rol_idRol === 2) {
          navigate('/catalogo'); 
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
        
        </form>
      </Box>
    </Container>
  );
};

export default Login;
