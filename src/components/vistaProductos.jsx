import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress, Button, Box } from "@mui/material";
import PropTypes from "prop-types";

const Vista = ({ addToCart }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({}); // Estado para manejar la cantidad de cada producto

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

  // Manejo de incremento y decremento de cantidad
  const handleIncrement = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 1) + 1,
    }));
  };

  const handleDecrement = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max((prevQuantities[itemId] || 1) - 1, 1),
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1; // Obtiene la cantidad seleccionada

    if (product.stock >= quantity) {
      addToCart({ ...product, cantidad: quantity });
      const updatedProduct = { ...product, stock: product.stock - quantity };

      alert(
        `${updatedProduct.nombre} ha sido agregado al carrito. Stock restante: ${updatedProduct.stock}`
      );

      // Actualiza el stock localmente
      setData((prevData) =>
        prevData.map((item) =>
          item.id === product.id ? { ...item, stock: updatedProduct.stock } : item
        )
      );
    } else {
      alert("No hay suficiente stock para este producto.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <Typography variant="h3" gutterBottom align="center" sx={{ marginBottom: 4 }}>
        🛒 Bienvenido a Mi Tiendita
      </Typography>

      {data.length > 0 ? (
        <Grid container spacing={3}>
          {data.map((item) => {
            const quantity = quantities[item.id] || 1; // Obtiene la cantidad actual del estado

            return (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    alt={item.nombre}
                    height="200"
                    image={item.foto}
                    sx={{ objectFit: "cover" }}
                  />
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
                      <Button
                        variant="outlined"
                        onClick={() => handleDecrement(item.id)}
                        sx={{ marginRight: 1 }}
                        disabled={quantity === 1}
                      >
                        -
                      </Button>
                      <Typography>{quantity}</Typography>
                      <Button
                        variant="outlined"
                        onClick={() => handleIncrement(item.id)}
                        sx={{ marginLeft: 1 }}
                        disabled={quantity === item.stock}
                      >
                        +
                      </Button>
                    </Box>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddToCart(item)}
                      disabled={item.stock === 0}
                      fullWidth
                      sx={{
                        backgroundColor: "#1976d2",
                        ":hover": { backgroundColor: "#1565c0" },
                      }}
                    >
                      {item.stock === 0 ? "Sin Stock" : "Agregar al Carrito"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

Vista.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default Vista;
