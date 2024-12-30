import { Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios"; // Asegúrate de importar axios

const CarritoCompras = ({ cart, cancelarCompra }) => {
  const [loading, setLoading] = useState(false); // Estado para la carga
  const [error, setError] = useState(null); // Estado para errores
  const [orden, setOrden] = useState(null); // Estado para la orden confirmada

  const total = cart.reduce((acc, item) => acc + item.precio * item.stock, 0); // Calcular el total

  // Función para confirmar la compra
  const confirmarCompra = async () => {
    setLoading(true);
    setError(null);

    try {
      const idUsuario = 1; // Aquí debes obtener el ID del usuario, por ejemplo desde el estado o contexto de autenticación

      // Formato del carrito para enviarlo al backend
      const detalles = cart.map(item => ({
        idProductos: item.id,
        cantidad: item.cantidad
      }));

      // Enviar la solicitud POST con los detalles
      const response = await axios.post('http://localhost:500/api/insertarordendetalles', {
        idUsuarios: idUsuario,
        detalles: detalles
      });

      // Manejar la respuesta
      if (response.data.success) {
        setOrden(response.data.result); // Guardamos los detalles de la orden
        cancelarCompra(); // Limpiar el carrito después de la compra
      }
    } catch (err) {
      setError("Error al confirmar la compra."+err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Carrito de Compras
      </Typography>
      {error && <Typography color="error">{error}</Typography>} {/* Mostrar el error si ocurre */}
      {cart.length > 0 ? (
        <div>
          <List>
            {cart.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item.nombre}
                  secondary={`Precio: Q${item.precio} x ${item.stock}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">
            Total: Q{total}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '10px' }}
            onClick={confirmarCompra} // Llamamos a la función de confirmar compra
            disabled={loading} // Deshabilitamos el botón mientras estamos cargando
          >
            {loading ? 'Confirmando...' : 'Confirmar Compra'}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: '10px', marginLeft: '10px' }}
            onClick={cancelarCompra} // Llamamos a la función que cancela la compra
          >
            Cancelar compra
          </Button>

          {orden && ( // Si la orden ha sido creada, mostramos los detalles
            <div style={{ marginTop: '20px' }}>
              <Typography variant="h6" color="primary">
                Compra Confirmada
              </Typography>
              <Typography variant="body1">
                Número de Orden: {orden.idOrden}
              </Typography>
              <Typography variant="body1">
                Total: Q{orden.total_orden}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Estado: {orden.estado}
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

// Validación de props con PropTypes
CarritoCompras.propTypes = {
  cart: PropTypes.array.isRequired,
  cancelarCompra: PropTypes.func.isRequired, // Aseguramos que cancelarCompra es una función
};

export default CarritoCompras;
