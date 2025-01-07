import { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import axios from "axios";

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    rol_idRol: "",
    correo_electronico: "",
    nombre_completo: "",
    password: "",
    telefono: "",
    fecha_nacimiento: "",
    direccion_entrega: "",
  });

  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [error, setError] = useState(""); // Para mostrar el error de edad
  const [telefonoError, setTelefonoError] = useState(""); // Para mostrar el error de teléfono

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/obtenerroles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error al obtener los roles:", error);
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para calcular la edad y verificar si es mayor de 18 años
  const calcularEdad = (fechaNacimiento) => {
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de la edad (18 años o más)
    const edad = calcularEdad(formData.fecha_nacimiento);
    if (edad < 18) {
      setError("Debes tener al menos 18 años para registrarte.");
      return;
    }

    // Validación de teléfono (máximo 8 dígitos)
    if (formData.telefono.length !== 8) {
      setTelefonoError("El teléfono debe tener 8 dígitos.");
      return;
    } else {
      setTelefonoError(""); // Limpiar mensaje de error de teléfono
    }

    setError(""); // Limpiar mensaje de error de edad
    
    try {
      const response = await axios.post("http://localhost:5000/api/insertarusuarios", {
        rol_idRol: formData.rol_idRol,
        correo_electronico: formData.correo_electronico,
        nombre_completo: formData.nombre_completo,
        password: formData.password,
        telefono: formData.telefono,
        fecha_nacimiento: formData.fecha_nacimiento,
        direccion: formData.direccion_entrega, // Usamos direccion_entrega como dirección
      });

      if (response.data) {
        alert("Usuario registrado con éxito.");
      } else {
        alert("Error: No se pudo registrar el usuario.");
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      alert("Hubo un problema al procesar el registro.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "#ff9800", // Naranja como el gi de Goku
        border: "3px solid #4caf50", // Borde verde
      }}
    >
      <Typography variant="h5" align="center" gutterBottom sx={{ color: "#1e88e5" }}>
        Registro de Usuario
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Rol"
          name="rol_idRol"
          value={formData.rol_idRol}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          sx={{
            backgroundColor: "#e3f2fd", // Azul claro
            borderRadius: 1,
            marginBottom: 2,
          }}
        >
          {loadingRoles ? (
            <MenuItem>Cargando roles...</MenuItem>
          ) : (
            roles.map((rol) => (
              <MenuItem key={rol.idRol} value={rol.idRol}>
                {rol.nombre}
              </MenuItem>
            ))
          )}
        </TextField>

        <TextField
          label="Correo Electrónico"
          name="correo_electronico"
          value={formData.correo_electronico}
          onChange={handleChange}
          type="email"
          fullWidth
          margin="normal"
          required
          sx={{
            backgroundColor: "#e3f2fd", // Azul claro
            borderRadius: 1,
            marginBottom: 2,
          }}
        />
        <TextField
          label="Nombre Completo"
          name="nombre_completo"
          value={formData.nombre_completo}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          sx={{
            backgroundColor: "#e3f2fd", // Azul claro
            borderRadius: 1,
            marginBottom: 2,
          }}
        />
        <TextField
          label="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          fullWidth
          margin="normal"
          required
          sx={{
            backgroundColor: "#e3f2fd", // Azul claro
            borderRadius: 1,
            marginBottom: 2,
          }}
        />
        <TextField
          label="Teléfono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ maxLength: 8 }}
          sx={{
            backgroundColor: "#e3f2fd", // Azul claro
            borderRadius: 1,
            marginBottom: 2,
          }}
        />
        {telefonoError && <Typography color="error">{telefonoError}</Typography>}
        <TextField
          label="Fecha de Nacimiento"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          required
          sx={{
            backgroundColor: "#e3f2fd", // Azul claro
            borderRadius: 1,
            marginBottom: 2,
          }}
        />
        <TextField
          label="Dirección"
          name="direccion_entrega"
          value={formData.direccion_entrega}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          sx={{
            backgroundColor: "#e3f2fd", // Azul claro
            borderRadius: 1,
            marginBottom: 2,
          }}
        />
        {error && <Typography color="error">{error}</Typography>}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            borderRadius: 1,
            backgroundColor: "#fbc02d", // Amarillo como el aura de Goku
            "&:hover": {
              backgroundColor: "#f57f17", // Naranja oscuro
            },
          }}
        >
          Registrar
        </Button>
      </form>
    </Box>
  );
};

export default RegistroUsuario;
