import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  TextField,
  Box,
} from "@mui/material";

const VerOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/ordenes");
        setOrdenes(response.data);
      } catch (err) {
        setError("Error al obtener los datos.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenes();
  }, []);

  const handleChange = (e, idOrden) => {
    const { name, value } = e.target;
    setOrdenes((prevOrdenes) =>
      prevOrdenes.map((orden) =>
        orden.idOrden === idOrden
          ? {
              ...orden,
              [name]: value,
              estados_idEstados: value === "Confirmado" ? 3 : 5,
            }
          : orden
      )
    );
  };

  const handleSave = async (idOrden) => {
    const ordenToUpdate = ordenes.find((orden) => orden.idOrden === idOrden);

    const detalles = [
      {
        estado_nombre: ordenToUpdate.estado_nombre,
        usuario_nombre_completo: ordenToUpdate.usuario_nombre_completo,
        direccion: ordenToUpdate.direccion,
        total_orden: ordenToUpdate.total_orden,
        telefono: ordenToUpdate.telefono,
        usuario_correo: ordenToUpdate.usuario_correo,
      },
    ];

    const ordenData = {
      idOrden,
      direccion: ordenToUpdate.direccion,
      estado: ordenToUpdate.estados_idEstados,
    };

    try {
      await axios.put("http://localhost:5000/api/actualizarordendetalles", {
        idOrden,
        detalles,
      });

      await axios.put("http://localhost:5000/api/actualizarorden", ordenData);

      alert("Orden actualizada correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar la orden");
    }
  };

  const eliminarOrden = async (idOrden, idEstado) => {
    if (idEstado === "Confirmado") {
      alert("No se puede cancelar la compra porque ya está confirmada.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/eliminarorden/${idOrden}`
      );
      alert(response.data.message);
      setOrdenes((prevOrdenes) =>
        prevOrdenes.filter((orden) => orden.idOrden !== idOrden)
      );
    } catch (err) {
      alert(
        "Error al eliminar la orden: " + err.response?.data?.message ||
          err.message
      );
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        Órdenes
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#0040ff" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                ID Orden
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Estado De La Compra
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Nombre Del Cliente
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Número De Teléfono
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Correo Electrónico
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Dirección De Entrega
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Total De La Compra
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordenes.map((orden) => (
              <TableRow key={orden.idOrden}>
                <TableCell>{orden.idOrden}</TableCell>
                <TableCell>
                  <Select
                    fullWidth
                    name="estado_nombre"
                    value={orden.estado_nombre}
                    onChange={(e) => handleChange(e, orden.idOrden)}
                    sx={{
                      backgroundColor: "#f5f5f5",
                      borderRadius: "4px",
                    }}
                  >
                    <MenuItem value="Confirmado">Confirmado</MenuItem>
                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="usuario_nombre_completo"
                    value={orden.usuario_nombre_completo}
                    onChange={(e) => handleChange(e, orden.idOrden)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="Numero_telefono"
                    value={orden.telefono}
                    onChange={(e) => handleChange(e, orden.idOrden)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="Correo_electronico"
                    value={orden.usuario_correo}
                    onChange={(e) => handleChange(e, orden.idOrden)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="direccion"
                    value={orden.direccion}
                    onChange={(e) => handleChange(e, orden.idOrden)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="total_orden"
                    type="number"
                    value={orden.total_orden}
                    onChange={(e) => handleChange(e, orden.idOrden)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSave(orden.idOrden)}
                    sx={{ marginRight: "10px" }}
                  >
                    Guardar Cambios
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                      eliminarOrden(orden.idOrden, orden.estado_nombre)
                    }
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default VerOrdenes;
