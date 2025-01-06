import  { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Alert } from "@mui/material";

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/verusuarios");
        setUsuarios(response.data);
      } catch (err) {
        setError("Hubo un error al cargar los usuarios",err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container spacing={2}>
        {usuarios.map((usuario) => (
          <Grid item xs={12} sm={6} md={4} key={usuario.idUsuarios}>
            <Card>
              <CardContent>
                <Typography variant="h6">{usuario.nombre_completo}</Typography>
                <Typography color="textSecondary">Correo: {usuario.correo_electronico}</Typography>
                <Typography color="textSecondary">Teléfono: {usuario.telefono}</Typography>
                <Typography color="textSecondary">Fecha de nacimiento: {new Date(usuario.fecha_nacimiento).toLocaleDateString()}</Typography>
                <Typography color="textSecondary">Fecha de creación: {new Date(usuario.fecha_creacion).toLocaleDateString()}</Typography>
                <Typography color="textSecondary">Cliente ID: {usuario.clientes_idClientes}</Typography>
                <Typography color="textSecondary">Rol: {usuario.rol}</Typography>
                <Typography color="textSecondary">Estado: {usuario.estado}</Typography>
                {usuario.direccion && <Typography color="textSecondary">Dirección: {usuario.direccion}</Typography>}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UsuariosList;
