import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card, CardContent, Typography, Button, TextField } from "@mui/material";

const Usuarios = () => {
  const [newIdUsuarios, setNewIdUsuarios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newNombre, setNewNombre] = useState("");
  const [newCorreo, setNewCorreo] = useState("");
  const [newTelefono, setNewTelefono] = useState("");
  const [newFechaNacimiento, setNewFechaNacimiento] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRolId, setNewRolId] = useState("");
  const [newEstadoId, setNewEstadoId] = useState("");
  const [newDireccion, setNewDireccion] = useState("");

  // Obtener los usuarios desde el API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/verusuarios");
        setUsuarios(response.data);
       
      } catch (error) {
        console.error("Error al obtener los usuarios", error);
      }
    };

    fetchUsuarios();
  }, []);

  // Función para obtener el nombre del estado
  const obtenerEstado = (estadoId) => {
    return estadoId === 1 ? "Activo" : estadoId === 2 ? "Inactivo" : "Desconocido";
  };

  const obtenerRol = (rolId) => {
    return rolId === 1 || rolId === 3 ? "Operador" : rolId === 2 ? "Cliente" : "Desconocido";
  };
  

  // Función para manejar la edición de un usuario
  const handleEdit = (id) => {
    const usuario = usuarios.find((usuario) => usuario.idUsuarios === id);
    setNewIdUsuarios(usuario.idUsuarios);
    setNewNombre(usuario.nombre_completo);
    setNewCorreo(usuario.correo_electronico);
    setNewTelefono(usuario.telefono);
    setNewFechaNacimiento(usuario.fecha_nacimiento);
    setNewPassword(usuario.password);
    setNewRolId(usuario.rol_idRol);
    setNewEstadoId(usuario.estados_idEstados);
    setNewDireccion(usuario.direccion);
    setEditing(id);
  };

  // Función para guardar los cambios del usuario
  const handleSave = async (id) => {
    try {
      console.log("Datos a guardar", {
        idUsuario: newIdUsuarios,
        nombre_completo: newNombre,
        correo_electronico: newCorreo,
        telefono: newTelefono,
        fecha_nacimiento: newFechaNacimiento,
        password: newPassword,
        rol_idRol: newRolId,
        estados_idEstados: newEstadoId,
        direccion: newDireccion
      });
      await axios.put("http://localhost:5000/api/actualizarusuarios", {
        idUsuario: newIdUsuarios,
        nombre_completo: newNombre,
        correo_electronico: newCorreo,
        telefono: newTelefono,
        fecha_nacimiento: newFechaNacimiento,
        password: newPassword,
        rol_idRol:newRolId,
        estados_idEstados: newEstadoId,
        direccion: newDireccion
      });

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.idUsuarios === id
            ? {
                ...usuario,
                idUsuario: newIdUsuarios,
                nombre_completo: newNombre,
                correo_electronico: newCorreo,
                telefono: newTelefono,
                fecha_nacimiento: newFechaNacimiento,
                password: newPassword,
                rol_idRol: newRolId,
                estados_idEstados: newEstadoId,
                direccion: newDireccion
              }
            : usuario
        )
      );

      setEditing(null);
      setNewIdUsuarios("");
      setNewNombre("");
      setNewCorreo("");
      setNewTelefono("");
      setNewFechaNacimiento("");
      setNewPassword("");
      setNewRolId("");
      setNewEstadoId("");
      setNewDireccion("");
      alert("Usuario actualizado con éxito");
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
                <Typography variant="body2">Fecha de Nacimiento: {new Date(usuario.fecha_nacimiento).toLocaleDateString("es-ES")}</Typography>
                <Typography variant="body2">Dirección: {usuario.direccion}</Typography>
                <Typography variant="body2">Rol: {obtenerRol(usuario.rol)}</Typography>
                <Typography variant="body2">Estado: {obtenerEstado(usuario.estado)}</Typography>

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
                    <TextField
                      label="Nueva Dirección"
                      value={newDireccion}
                      onChange={(e) => setNewDireccion(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Nuevo Rol"
                      value={newRolId}
                      onChange={(e) => setNewRolId(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    {/* Mostrar un select o texto con "Activo" o "Inactivo" */}
                    <TextField
                      label="Nuevo Estado"
                      value={newEstadoId}
                      onChange={(e) => setNewEstadoId(e.target.value)}
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
