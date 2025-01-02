import { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/iniciarsesion", {
        correo_electronico: correoElectronico,
        password,
      });

      const { message, rol_idRol, idUsuarios, token } = response.data;
      if (response.status === 200) {
        alert(message || "Inicio de sesión exitoso");

        localStorage.setItem("token", token);
        localStorage.setItem("idUsuarios", idUsuarios);

        if (rol_idRol === 2) {
          navigate("/catalogo");
        } else if (rol_idRol === 1 || rol_idRol === 3) {
          navigate("/catalogo/operador");
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.error || "Error al iniciar sesión");
      } else {
        alert(error.message || "Error al iniciar sesión");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: `url('https://images.unsplash.com/photo-1589739900882-40ce3ae272bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={4} sx={{ padding: 4, borderRadius: 2 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            {/* Simulación de un logotipo */}
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ color: "#FF5722", fontWeight: "bold" }}
            >
              🛒 Mi Tiendita
            </Typography>

            <Typography
              variant="h6"
              component="p"
              sx={{ marginBottom: 3, color: "#757575" }}
            >
              Bienvenido a su tienda de confianza
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleLogin} style={{ width: "100%" }}>
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
                fullWidth
                sx={{
                  marginTop: 3,
                  backgroundColor: "#FF5722",
                  ":hover": { backgroundColor: "#E64A19" },
                }}
              >
                Iniciar Sesión
              </Button>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
