import  { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid, Container, Typography } from '@mui/material';
import axios from 'axios';

const RegistroForm = () => {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    correo_electronico: '',
    password: '',
    telefono: '',
    fecha_nacimiento: '',
    rol_idRol: '',
    estados_idEstados: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar los datos al servidor
      const response = await axios.post('http://localhost:5000/api/insertarusuarios', formData);

      if (response.data.success) {
        alert('Usuario registrado exitosamente');
      } else {
        alert('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert('Hubo un error, intente nuevamente');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center" gutterBottom>
        Formulario de Registro
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre Completo"
              name="nombre_completo"
              value={formData.nombre_completo}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              name="correo_electronico"
              type="email"
              value={formData.correo_electronico}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Fecha de Nacimiento"
              name="fecha_nacimiento"
              type="date"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Rol</InputLabel>
              <Select
                name="rol_idRol"
                value={formData.rol_idRol}
                onChange={handleChange}
              >
                <MenuItem value={1}>Administrador</MenuItem>
                <MenuItem value={2}>Empleado</MenuItem>
                <MenuItem value={3}>Cliente</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Estado</InputLabel>
              <Select
                name="estados_idEstados"
                value={formData.estados_idEstados}
                onChange={handleChange}
              >
                <MenuItem value={1}>Activo</MenuItem>
                <MenuItem value={2}>Inactivo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Registrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegistroForm;
