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
        backgroundColor: "#f5f5f5", // Gris claro similar al fondo de Walmart
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 3,
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff", // Fondo blanco
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            {/* Logotipo o encabezado */}
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                color: "#0066cc", // Azul Walmart
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "'Arial', sans-serif", // Tipografía simple y clara
              }}
            >
              🛒 Mi Tiendita
            </Typography>

            <Typography
              variant="h6"
              component="p"
              sx={{
                marginBottom: 3,
                color: "#ffcc00", // Amarillo Walmart
                textAlign: "center",
                fontFamily: "'Arial', sans-serif",
              }}
            >
              ¡Inicia sesión para disfrutar de la mejor experiencia de compra!
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#0066cc", // Azul Walmart
                    },
                    "&:hover fieldset": {
                      borderColor: "#ffcc00", // Amarillo Walmart
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0066cc", // Azul Walmart
                    },
                  },
                }}
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#0066cc", // Azul Walmart
                    },
                    "&:hover fieldset": {
                      borderColor: "#ffcc00", // Amarillo Walmart
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0066cc", // Azul Walmart
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  marginTop: 3,
                  backgroundColor: "#0066cc", // Azul Walmart
                  color: "#fff",
                  ":hover": { backgroundColor: "#004c99" }, // Azul más oscuro en hover
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
