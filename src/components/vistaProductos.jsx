import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress, Button, Box } from "@mui/material";
import PropTypes from "prop-types";

const Vista = ({ addToCart, actualizarCarrito }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Obtener los productos desde la API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/productos")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError("Error al obtener los datos");
        console.error(err);
      });
  }, []);

  // Manejo de errores en la carga de productos
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Aumentar cantidad en el producto
  const aumentarCantidad = (idProductos) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.idProductos === idProductos && item.stock > (item.cantidad || 1)
          ? { ...item, cantidad: (item.cantidad || 1) + 1 }
          : item
      )
    );
  };

  // Reducir cantidad en el producto
  const reducirCantidad = (idProductos) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.idProductos === idProductos && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  const handleAddToCart = (producto) => {
    const quantity = producto.cantidad || 1; // Obtiene la cantidad seleccionada
console.log(quantity);
    if (producto.stock >= quantity) {
      addToCart({ ...producto, stock: quantity });
      actualizarCarrito({ ...producto, stock: quantity });

      // Reducir el stock en el array de productos
      setData((prevData) =>
        prevData.map((item) =>
          item.idProductos === producto.idProductos
            ? { ...item, stock: item.stock - quantity }
            : item
        )
      );

      alert(`${producto.nombre} ha sido agregado al carrito. Stock restante: ${producto.stock - quantity}`);
    } else {
      alert("No hay suficiente stock para este producto.");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: 4 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ marginBottom: 4 }}>
        🛒 Bienvenido a Mi Tiendita
      </Typography>

      {data.length > 0 ? (
        <Grid container spacing={3}>
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.idProductos}>
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardMedia component="img" alt={item.nombre} height="200" image={item.foto} sx={{ objectFit: "cover" }} />
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {item.nombre}
                  </Typography>
                  <Typography color="textSecondary">
                    <strong>Marca:</strong> {item.marca}
                  </Typography>
                  <Typography color="textSecondary">
                    <strong>Cantidad:</strong> {item.stock}
                  </Typography>
                  <Typography color="textSecondary" sx={{ marginBottom: 2 }}>
                    <strong>Precio:</strong> Q{item.precio}
                  </Typography>

                  {/* Control de cantidad */}
                  <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <Button variant="outlined" onClick={() => reducirCantidad(item.idProductos)} sx={{ marginRight: 1 }} disabled={item.cantidad === 1}>
                      -
                    </Button>
                    <Typography>{item.cantidad || 1}</Typography>
                    <Button variant="outlined" onClick={() => aumentarCantidad(item.idProductos)} sx={{ marginLeft: 1 }} disabled={item.cantidad === item.stock}>
                      +
                    </Button>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(item)}
                    disabled={item.stock === 0}
                    fullWidth
                    sx={{ backgroundColor: "#1976d2", ":hover": { backgroundColor: "#1565c0" } }}
                  >
                    {item.stock === 0 ? "Sin Stock" : "Agregar al Carrito"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

Vista.propTypes = {
  addToCart: PropTypes.func.isRequired,
  actualizarCarrito: PropTypes.func.isRequired, // Asegúrate de pasar esta función
};

export default Vista;
