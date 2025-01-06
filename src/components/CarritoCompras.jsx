import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
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
   // Nueva función pasada como prop
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
    <div>
      <Typography variant="h4" gutterBottom>
        Carrito de Compras
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {cart.length > 0 ? (
        <div>
          <List>
            {cart.map((item, index) => (
              <ListItem key={index}>
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
                >
                  1
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => reducirCantidad(item.idProductos)}
                  disabled={item.cantidad === 1 || compraConfirmada}
                  startIcon={<RemoveCircle />}
                >
                  1
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

          <Typography variant="h6">Total: Q{total}</Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={confirmarCompra}
            disabled={loading || compraConfirmada}
          >
            {loading ? "Confirmando..." : "Confirmar Compra"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: "10px", marginLeft: "10px" }}
            onClick={cancelarCompra}
            disabled={compraConfirmada}
          >
            Cancelar compra
          </Button>

          {orden && (
            <div style={{ marginTop: "20px" }}>
              <Typography variant="h6" color="primary">
                Compra Confirmada
              </Typography>
              <Typography variant="body1">
                Número de Orden: {orden.recordset[0].idOrden}
              </Typography>
              <Typography variant="body1">
                Total: Q{orden.recordset[0].total_orden}
              </Typography>
              <Typography variant="body1">
                Nombre Completo: {orden.recordset[0].orden_nombre_completo}
              </Typography>
              <Typography variant="body1">
                Teléfono: {orden.recordset[0].telefono}
              </Typography>
              <Typography variant="body1">
                Correo Electrónico: {orden.recordset[0].correo_electronico}
              </Typography>
              <Typography variant="body1">
                Dirección: {orden.recordset[0].direccion}
              </Typography>
              <Typography variant="body1">
                Estado: {orden.recordset[0].estado_nombre}
              </Typography>
              <Button
                variant="contained"
                color="warning"
                style={{ marginTop: "20px" }}
                onClick={() => {
                  cancelarCompra();

                  eliminarProducto();
                }}
              >
                Vaciar Carrito
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Typography variant="h6" color="error">
          El carrito está vacío.
        </Typography>
      )}
    </div>
  );
};

CarritoCompras.propTypes = {
  cart: PropTypes.array.isRequired,
  cancelarCompra: PropTypes.func.isRequired,
  actualizarCarrito: PropTypes.func.isRequired,
  eliminarProducto: PropTypes.func.isRequired,
   
};

export default CarritoCompras;
