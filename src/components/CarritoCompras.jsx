import { Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import PropTypes from 'prop-types'; // Importar PropTypes

const CarritoCompras = ({ cart }) => {
  const total = cart.reduce((acc, item) => acc + item.precio, 0); // Calcular el total

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Carrito de Compras
      </Typography>
      {cart.length > 0 ? (
        <div>
          <List>
            {cart.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item.nombre}
                  secondary={`Precio: Q${item.precio}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">
            Total: Q{total}
          </Typography>
          <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
            Comprar
          </Button>
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
  cart: PropTypes.array.isRequired, // Validar que 'cart' es un array y es obligatorio
};

export default CarritoCompras;
