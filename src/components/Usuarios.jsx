import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card, CardContent, Typography, Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [estados, setEstados] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newNombre, setNewNombre] = useState("");
  const [newCorreo, setNewCorreo] = useState("");
  const [newTelefono, setNewTelefono] = useState("");
  const [newFechaNacimiento, setNewFechaNacimiento] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRolId, setNewRolId] = useState("");
  const [newEstadoId, setNewEstadoId] = useState("");
  const [newClienteId, setNewClienteId] = useState("");

  // Obtener los usuarios, roles y estados desde el API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/verusuarios");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error al obtener los roles", error);
      }
    };

    const fetchEstados = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/estados");
        setEstados(response.data);
      } catch (error) {
        console.error("Error al obtener los estados", error);
      }
    };

    fetchUsuarios();
    fetchRoles();
    fetchEstados();
  }, []);

  // Función para manejar la edición de un usuario
  const handleEdit = (id) => {
    const usuario = usuarios.find((usuario) => usuario.idUsuarios === id);
    setNewNombre(usuario.nombre_completo);
    setNewCorreo(usuario.correo_electronico);
    setNewTelefono(usuario.telefono);
    setNewFechaNacimiento(usuario.fecha_nacimiento);
    setNewPassword(usuario.password);
    setNewRolId(usuario.rol_idRol);
    setNewEstadoId(usuario.estados_idEstados);
    setNewClienteId(usuario.clientes_idClientes);
    setEditing(id);
  };

  // Función para guardar los cambios del usuario
  const handleSave = async (id) => {
    try {
      const idUsuarios = localStorage.getItem("idUsuarios");

      if (!idUsuarios) {
        console.error("No se encontró el id del usuario en localStorage.");
        return;
      }

      await axios.put("http://localhost:5000/api/actualizarusuarios", {
        idUsuarios: id,
        nombre_completo: newNombre,
        correo_electronico: newCorreo,
        telefono: newTelefono,
        fecha_nacimiento: newFechaNacimiento,
        password: newPassword,
        rol_idRol: newRolId,
        estados_idEstados: newEstadoId,
        clientes_idClientes: newClienteId
      });

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.idUsuarios === id
            ? {
                ...usuario,
                nombre_completo: newNombre,
                correo_electronico: newCorreo,
                telefono: newTelefono,
                fecha_nacimiento: newFechaNacimiento,
                password: newPassword,
                rol_idRol: newRolId,
                estados_idEstados: newEstadoId,
                clientes_idClientes: newClienteId
              }
            : usuario
        )
      );

      setEditing(null);
      setNewNombre("");
      setNewCorreo("");
      setNewTelefono("");
      setNewFechaNacimiento("");
      setNewPassword("");
      setNewRolId("");
      setNewEstadoId("");
      setNewClienteId("");
    } catch (error) {
      console.error("Error al guardar el usuario", error);
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        {usuarios.map((usuario) => (
          <Grid item xs={12} sm={6} md={4} key={usuario.idUsuarios}>
            <Card>
              <CardContent>
                <Typography variant="h6">{usuario.nombre_completo}</Typography>
                <Typography variant="body2">Correo: {usuario.correo_electronico}</Typography>
                <Typography variant="body2">Teléfono: {usuario.telefono}</Typography>
                <Typography variant="body2">Fecha de Nacimiento: {usuario.fecha_nacimiento}</Typography>
                <Typography variant="body2">Rol: {roles.find((rol) => rol.idRol === usuario.rol_idRol)?.nombre}</Typography>
                <Typography variant="body2">Estado: {estados.find((estado) => estado.idEstados === usuario.estados_idEstados)?.nombre}</Typography>

                {editing === usuario.idUsuarios ? (
                  <>
                    <TextField
                      label="Nuevo Nombre"
                      value={newNombre}
                      onChange={(e) => setNewNombre(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Nuevo Correo"
                      value={newCorreo}
                      onChange={(e) => setNewCorreo(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Nuevo Teléfono"
                      value={newTelefono}
                      onChange={(e) => setNewTelefono(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Nueva Fecha de Nacimiento"
                      type="date"
                      value={newFechaNacimiento}
                      onChange={(e) => setNewFechaNacimiento(e.target.value)}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      label="Nueva Contraseña"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Rol</InputLabel>
                      <Select
                        value={newRolId}
                        onChange={(e) => setNewRolId(e.target.value)}
                        label="Rol"
                      >
                        {roles.map((rol) => (
                          <MenuItem key={rol.idRol} value={rol.idRol}>
                            {rol.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Estado</InputLabel>
                      <Select
                        value={newEstadoId}
                        onChange={(e) => setNewEstadoId(e.target.value)}
                        label="Estado"
                      >
                        {estados.map((estado) => (
                          <MenuItem key={estado.idEstados} value={estado.idEstados}>
                            {estado.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      label="ID Cliente"
                      value={newClienteId}
                      onChange={(e) => setNewClienteId(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <Button onClick={() => handleSave(usuario.idUsuarios)} variant="contained" color="primary" style={{ marginRight: 8 }}>
                      Guardar
                    </Button>
                    <Button onClick={() => setEditing(null)} variant="outlined" color="secondary" style={{ marginRight: 8 }}>
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <div>
                    <Button onClick={() => handleEdit(usuario.idUsuarios)} variant="outlined" color="secondary" style={{ marginRight: 8 }}>
                      Editar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Usuarios;
