import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [error, setError] = useState(null);
  const [editingUsuario, setEditingUsuario] = useState(null); // Para el usuario que está siendo editado
  const [formData, setFormData] = useState({
    idUsuarios: "",
    nombre_completo: "",
    correo_electronico: "",
    telefono: "",
    fecha_nacimiento: "",
    direccion: "",
    rol_idRol: "",
  });

  // useEffect para cargar los usuarios
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/verusuarios");
        setUsuarios(response.data);
        console.log("usuario", response.data);
      } catch (err) {
        setError(`Hubo un error al cargar los usuarios: ${err.message}`);
      } finally {
        setLoadingUsuarios(false);
      }
    };

    fetchUsuarios();
  }, []);

  // useEffect para cargar los roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/obtenerroles"
        );
        setRoles(response.data);
        console.log("roles", response.data);
      } catch (error) {
        console.error("Error al obtener los roles:", error);
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  if (loadingUsuarios || loadingRoles) {
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

  // Función para mapear el ID de estado al nombre
  const getRolesName = (rolId) => {
    const rol = roles.find((role) => role.idRol === rolId);
    console.log("Rol:", rol);
    return rol ? rol.nombre : "Rol no encontrado";
  };

  const handleEditClick = (usuario) => {
    // Al hacer clic en el botón de editar, cargamos los datos en el formulario de edición
    setEditingUsuario(usuario);
    setFormData({
      idUsuarios: usuario.idUsuarios,
      nombre_completo: usuario.nombre_completo,
      correo_electronico: usuario.correo_electronico,
      telefono: usuario.telefono,
      fecha_nacimiento: usuario.fecha_nacimiento,
      direccion: usuario.direccion || "",
      rol_idRol: usuario.rol_idRol,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put("http://localhost:5000/api/actualizarusuarios", formData);
      if (response.status === 200) {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario.idUsuarios === formData.idUsuarios ? formData : usuario
          )
        );
        setEditingUsuario(null); // Terminar la edición
        alert("Usuario actualizado con éxito.");
      }
    } catch (err) {
      alert(`Error al actualizar el usuario: ${err.message}`);
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {usuarios.map((usuario) => (
          <Grid item xs={12} sm={6} md={4} key={usuario.idUsuarios}>
            <Card>
              <CardContent>
                <Typography variant="h6">ID Usuario: {usuario.idUsuarios}</Typography>
                <Typography variant="h6">{usuario.nombre_completo}</Typography>
                {editingUsuario?.idUsuarios === usuario.idUsuarios ? (
                  // Si el usuario está en modo edición
                  <form>
                    <TextField
                      label="Nombre Completo"
                      name="nombre_completo"
                      value={formData.nombre_completo}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Correo Electrónico"
                      name="correo_electronico"
                      value={formData.correo_electronico}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Teléfono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Fecha de Nacimiento"
                      name="fecha_nacimiento"
                      type="date"
                      value={formData.fecha_nacimiento}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Dirección"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      select
                      label="Rol"
                      name="rol_idRol"
                      value={formData.rol_idRol}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    >
                      {roles.map((rol) => (
                        <MenuItem key={rol.idRol} value={rol.idRol}>
                          {rol.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                      Guardar Cambios
                    </Button>
                  </form>
                ) : (
                  <>
                    <Typography color="textSecondary">Correo: {usuario.correo_electronico}</Typography>
                    <Typography color="textSecondary">Teléfono: {usuario.telefono}</Typography>
                    <Typography color="textSecondary">Fecha de nacimiento: {new Date(usuario.fecha_nacimiento).toLocaleDateString()}</Typography>
                    <Typography color="textSecondary">Fecha de creación: {new Date(usuario.fecha_creacion).toLocaleDateString()}</Typography>
                    <Typography color="textSecondary">Cliente ID: {usuario.clientes_idClientes}</Typography>
                    <Typography color="textSecondary">Rol: {getRolesName(usuario.rol)}</Typography>
                    {usuario.direccion && <Typography color="textSecondary">Dirección: {usuario.direccion}</Typography>}
                    <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => handleEditClick(usuario)}>
                      Editar
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UsuariosList;
