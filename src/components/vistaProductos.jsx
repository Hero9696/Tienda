import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress, Button, Box } from "@mui/material";
import PropTypes from "prop-types";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; 

const Vista = ({ addToCart, actualizarCarrito }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/productos")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al obtener los datos");
        setLoading(false);
        console.error(err);
      });
  }, []);

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
    <Box sx={{ backgroundColor: "#f3f4f6", minHeight: "100vh", padding: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{
          marginBottom: 4,
          color: "#0071ce", // Azul Walmart
          fontWeight: "bold",
          textTransform: "uppercase",
          fontFamily: '"Roboto", sans-serif',
        }}
      >
        <ShoppingCartIcon sx={{ fontSize: "3rem", color: "#ffc220" }} /> Bienvenido a Mi Tiendita
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {data.map((item) =>
            item.foto && item.foto.endsWith(".jpg") ? (
              <Grid item xs={12} sm={6} md={4} key={item.idProductos}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 2,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    ":hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                    backgroundColor: "#ffffff", // Fondo blanco para los productos
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={item.nombre}
                    image={item.foto}
                    sx={{
                      height: "200px",
                      width: "100%",
                      objectFit: "cover",
                      borderBottom: "3px solid #ffc220", // Borde amarillo
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0071ce" }}>
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
                        color: "#0071ce",
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
                        backgroundColor: "#0071ce",
                        color: "#ffffff",
                        ":hover": { backgroundColor: "#005bb5" },
                      }}
                    >
                      {item.stock === 0 ? "Sin Stock" : "Agregar al Carrito"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ) : null
          )}
        </Grid>
      )}
    </Box>
  );
};

Vista.propTypes = {
  addToCart: PropTypes.func.isRequired,
  actualizarCarrito: PropTypes.func.isRequired,
};

export default Vista;
