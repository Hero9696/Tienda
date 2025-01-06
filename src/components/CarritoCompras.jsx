import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

const CarritoCompras = ({
  cart,
  cancelarCompra,
  actualizarCarrito,
  eliminarProducto,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orden, setOrden] = useState(null);
  const [compraConfirmada, setCompraConfirmada] = useState(false);

  useEffect(() => {
    if (orden) {
      console.log("Detalles de la orden actualizada: ", orden);
    }
  }, [orden]);

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const confirmarCompra = async () => {
    setLoading(true);
    setError(null);
    setCompraConfirmada(true);

    try {
      const idUsuario = localStorage.getItem("idUsuarios");

      if (!idUsuario) {
        throw new Error("Usuario no autenticado.");
      }

      const detalles = cart.map((item) => ({
        idProductos: item.idProductos,
        cantidad: item.cantidad,
      }));

      const response = await axios.post(
        "http://localhost:5000/api/insertarordendetalles",
        {
          idUsuarios: idUsuario,
          detalles: detalles,
        }
      );

      if (response.data.success) {
        setOrden(response.data.result);
      } else {
        throw new Error("La API no confirmó el éxito de la operación.");
      }
    } catch (err) {
      console.error("Error en confirmarCompra:", err.response || err.message);
      setError(
        "Error al confirmar la compra. " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const aumentarCantidad = async (idProductos) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/productos`);
      const productoEnApi = response.data.find(
        (item) => item.idProductos === idProductos
      );

      if (!productoEnApi) {
        alert("Producto no encontrado en la base de datos.");
        return;
      }

      const stockDisponible = productoEnApi.stock;
      const producto = cart.find((item) => item.idProductos === idProductos);

      if (producto.cantidad < stockDisponible) {
        actualizarCarrito(idProductos, 1);
      } else {
        alert(
          "No puedes aumentar la cantidad más allá del stock disponible: " +
            stockDisponible
        );
      }
    } catch (error) {
      console.error("Error al obtener el stock:", error);
      alert("Error al verificar el stock disponible.");
    }
  };

  const reducirCantidad = (idProducto) => {
    actualizarCarrito(idProducto, -1);
  };

  const handleEliminarProducto = (idProducto) => {
    eliminarProducto(idProducto);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ color: "#004d40", fontWeight: "bold" }}
      >
        Carrito de Compras
      </Typography>

      {error && (
        <Typography
          variant="body1"
          color="error"
          align="center"
          sx={{ marginBottom: 2 }}
        >
          {error}
        </Typography>
      )}

      {cart.length > 0 ? (
        <Box>
          <List>
            {cart.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  marginBottom: 2,
                  padding: 2,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                }}
              >
                <ListItemText
                  primary={item.nombre}
                  secondary={`Precio: Q${item.precio} x ${item.cantidad} = Q${
                    item.precio * item.cantidad
                  }`}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => aumentarCantidad(item.idProductos)}
                  startIcon={<AddCircle />}
                  disabled={compraConfirmada}
                  sx={{ marginRight: 1 }}
                >
                  +
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => reducirCantidad(item.idProductos)}
                  disabled={item.cantidad === 1 || compraConfirmada}
                  startIcon={<RemoveCircle />}
                  sx={{ marginRight: 1 }}
                >
                  -
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleEliminarProducto(item.idProductos)}
                  disabled={compraConfirmada}
                >
                  Eliminar
                </Button>
              </ListItem>
            ))}
          </List>

          <Typography
            variant="h6"
            align="center"
            sx={{ fontWeight: "bold", marginTop: 2 }}
          >
            Total: Q{total}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={confirmarCompra}
              disabled={loading || compraConfirmada}
              sx={{
                marginRight: 2,
                backgroundColor: "#FF5722",
                ":hover": { backgroundColor: "#E64A19" },
              }}
            >
              {loading ? "Confirmando..." : "Confirmar Compra"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={cancelarCompra}
              disabled={compraConfirmada}
              sx={{
                backgroundColor: "#004d40",
                ":hover": { backgroundColor: "#00251a" },
              }}
            >
              Cancelar compra
            </Button>
          </Box>

          {orden && (
            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "1.2rem", // Aumenta el tamaño de la fuente
              }}
            >
              <Typography
                variant="h4"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                Compra Realizada
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                Número de Orden: {orden.recordset[0].idOrden}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                Total: Q{orden.recordset[0].total_orden}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                Nombre Completo: {orden.recordset[0].orden_nombre_completo}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                Teléfono: {orden.recordset[0].telefono}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                Correo Electrónico: {orden.recordset[0].correo_electronico}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                Dirección: {orden.recordset[0].direccion}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                Estado: {orden.recordset[0].estado_nombre}
              </Typography>
              <Button
                variant="contained"
                color="warning"
                sx={{ marginTop: 3, fontSize: "1rem" }} // Aumenta el tamaño del botón
                onClick={() => {
                  cancelarCompra();
                  eliminarProducto();
                }}
              >
                Vaciar Carrito
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <Typography variant="h6" color="error" align="center">
          El carrito está vacío.
        </Typography>
      )}
    </Box>
  );
};

CarritoCompras.propTypes = {
  cart: PropTypes.array.isRequired,
  cancelarCompra: PropTypes.func.isRequired,
  actualizarCarrito: PropTypes.func.isRequired,
  eliminarProducto: PropTypes.func.isRequired,
};

export default CarritoCompras;
