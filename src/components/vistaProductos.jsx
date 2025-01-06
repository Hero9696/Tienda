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

  const handleAddToCart = (producto) => {
    const quantity = producto.cantidad || 1;

    if (producto.stock >= quantity) {
      addToCart({ ...producto, stock: quantity });
      actualizarCarrito({ ...producto, stock: quantity });

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
    <Box sx={{ backgroundColor: "#e0f7fa", minHeight: "100vh", padding: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{
          marginBottom: 4,
          color: "#004d40",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        🛒 Bienvenido a SuperMarket
      </Typography>

      {data.length > 0 ? (
        <Grid container spacing={4}>
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.idProductos}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 5,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  ":hover": {
                    transform: "scale(1.05)",
                    boxShadow: 10,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  alt={item.nombre}
                  height="200"
                  image={item.foto}
                  sx={{
                    objectFit: "cover",
                    borderBottom: "2px solid #004d40",
                  }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#004d40" }}>
                    {item.nombre}
                  </Typography>
                  <Typography color="textSecondary">
                    <strong>Marca:</strong> {item.marca}
                  </Typography>
                  <Typography color="textSecondary">
                    <strong>Stock disponible:</strong> {item.stock}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    sx={{
                      marginBottom: 2,
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#00796b",
                    }}
                  >
                    <strong>Precio:</strong> Q{item.precio}
                  </Typography>

                  <Button
                    variant="contained"
                    onClick={() => handleAddToCart(item)}
                    disabled={item.stock === 0}
                    fullWidth
                    sx={{
                      backgroundColor: "#004d40",
                      color: "#fff",
                      ":hover": { backgroundColor: "#00251a" },
                    }}
                  >
                    {item.stock === 0 ? "Sin Stock" : "Agregar al Carrito"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
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
          <CircularProgress color="secondary" />
        </Box>
      )}
    </Box>
  );
};

Vista.propTypes = {
  addToCart: PropTypes.func.isRequired,
  actualizarCarrito: PropTypes.func.isRequired,
};

export default Vista;
