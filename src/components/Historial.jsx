import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const BuscarOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const idUsuario = localStorage.getItem("idUsuarios");
    if (idUsuario) {
      handleBuscar(idUsuario);
    } else {
      setError("No se encontró el ID de usuario en el localStorage.");
    }
  }, []);

  const handleBuscar = async (idUsuario) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/obtenerordendetalles",
        { idUsuarios: idUsuario }
      );
      setOrdenes(response.data.orden);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Aún no tienes órdenes.");
      setOrdenes([]);
    } finally {
      setLoading(false);
    }
  };

  const eliminarOrden = async (idOrden, idEstado) => {
    if (idEstado === "Confirmado") {
      alert("No se puede cancelar la compra porque ya está confirmada.");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/api/eliminarorden/${idOrden}`);
      alert(response.data.message);
      handleBuscar(localStorage.getItem('idUsuarios'));
    } catch (err) {
      alert('Error al eliminar la orden: ' + err.response?.data?.message || err.message);
    }
  };

  const groupedOrders = ordenes.reduce((acc, orden) => {
    if (!acc[orden.idOrden]) {
      acc[orden.idOrden] = {
        orders: [],
        total: 0,
        direccionEntrega: orden.direccion,
        idEstado: orden.estado_orden,
      };
    }
    acc[orden.idOrden].orders.push(orden);
    acc[orden.idOrden].total += parseFloat(orden.subtotal) || 0;
    return acc;
  }, {});

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
        backgroundColor: "#f1f1f1",
        p: 3,
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#0071ce", // Azul Walmart
          fontFamily: '"Roboto", sans-serif',
        }}
      >
        Buscar Detalles de la Orden
      </Typography>

      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={() =>
          !loading && handleBuscar(localStorage.getItem("idUsuarios"))
        }
        sx={{
          mb: 3,
          backgroundColor: "#ffc220", // Amarillo Walmart
          color: "#0071ce",
          "&:hover": { backgroundColor: "#e5b01c" },
          fontWeight: "bold",
        }}
      >
        Buscar
      </Button>

      {loading && <CircularProgress sx={{ color: "#0071ce" }} />}

      {error && (
        <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
          {error}
        </Alert>
      )}

      {Object.keys(groupedOrders).length > 0 ? (
        <List sx={{ width: "100%" }}>
          {Object.keys(groupedOrders).map((idOrden) => (
            <ListItem
              key={idOrden}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                mb: 2,
                p: 2,
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <ListItemText
                primary={`ID Orden: ${idOrden}`}
                secondary={
                  <div>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Dirección de Entrega:{" "}
                      {groupedOrders[idOrden].direccionEntrega}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Estado De La Compra: {groupedOrders[idOrden].idEstado}
                    </Typography>
                    {groupedOrders[idOrden].orders.map((orden, index) => (
                      <div key={index}>
                        <Typography variant="body2">
                          Cliente: {orden.nombre_completo}
                        </Typography>
                        <Typography variant="body2">
                          Producto: {orden.nombre_producto}
                        </Typography>
                        <Typography variant="body2">
                          Cantidad: {orden.cantidad}
                        </Typography>
                        <Typography variant="body2">
                          Subtotal: Q{orden.subtotal}
                        </Typography>
                      </div>
                    ))}
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        mt: 1,
                      }}
                    >
                      Total: Q{groupedOrders[idOrden].total.toFixed(2)}
                    </Typography>
                  </div>
                }
              />
              <Button
                variant="contained"
                onClick={() =>
                  eliminarOrden(idOrden, groupedOrders[idOrden].idEstado)
                }
                sx={{
                  mt: 1,
                  backgroundColor: "#0071ce", // Azul Walmart
                  color: "#ffffff",
                  "&:hover": { backgroundColor: "#005fa3" },
                  fontWeight: "bold",
                }}
              >
                Cancelar Compra
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        !loading && (
          <Typography
            variant="body1"
            sx={{
              color: "#0071ce",
              fontWeight: "bold",
            }}
          >
            No hay órdenes para mostrar.
          </Typography>
        )
      )}
    </Container>
  );
};

export default BuscarOrdenes;
