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
        backgroundColor: "#e0f7fa",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 3,
            boxShadow: "0px 8px 15px rgba(0, 77, 64, 0.2)",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            {/* Logotipo o encabezado */}
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                color: "#004d40",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              🛒 SuperMarket
            </Typography>

            <Typography
              variant="h6"
              component="p"
              sx={{
                marginBottom: 3,
                color: "#00796b",
                textAlign: "center",
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
                      borderColor: "#004d40",
                    },
                    "&:hover fieldset": {
                      borderColor: "#00796b",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#004d40",
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
                      borderColor: "#004d40",
                    },
                    "&:hover fieldset": {
                      borderColor: "#00796b",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#004d40",
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
                  backgroundColor: "#004d40",
                  color: "#fff",
                  ":hover": { backgroundColor: "#00251a" },
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
