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

const CarritoCompras = ({ cart, cancelarCompra }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orden, setOrden] = useState(null);

  // Depuración: registrar cambios en la orden
  useEffect(() => {
    if (orden) {
      console.log("Detalles de la orden actualizada: ");
    }
  }, [orden]);

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const confirmarCompra = async () => {
    setLoading(true);
    setError(null);

    try {
      // Obtener el ID del usuario desde localStorage
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
                  secondary={`Precio: Q${item.precio} x ${item.cantidad}`}
                />
              </ListItem>
            ))}
          </List>

          <Typography variant="h6">Total: Q{total}</Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={confirmarCompra}
            disabled={loading}
          >
            {loading ? "Confirmando..." : "Confirmar Compra"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: "10px", marginLeft: "10px" }}
            onClick={cancelarCompra}
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
};

export default CarritoCompras;
