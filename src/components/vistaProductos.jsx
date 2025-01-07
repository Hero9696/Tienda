import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress, Button, Box } from "@mui/material";
import PropTypes from "prop-types";

const Vista = ({ addToCart, actualizarCarrito }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Añadimos estado de carga

  // Obtener los productos desde la API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/productos")
      .then((response) => {
        setData(response.data);
        setLoading(false); // Terminamos de cargar los productos
      })
      .catch((err) => {
        setError("Error al obtener los datos");
        setLoading(false); // Terminamos de cargar aunque haya error
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

      // Actualizamos el stock localmente solo para la vista, si no es un error
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
    <Box sx={{ backgroundColor: "#f9e48f", minHeight: "100vh", padding: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{
          marginBottom: 4,
          color: "#f58c42", // Color inspirado en One Piece
          fontWeight: "bold",
          textTransform: "uppercase",
          fontFamily: '"Rock Salt", cursive', // Tipografía estilo manga
        }}
      >
        🏴‍☠️ Bienvenido a Mi Tiendita
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
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {data.map((item) =>
            item.foto && item.foto.endsWith(".jpg") ? ( // Verificamos que la URL termine en .jpg
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
                    backgroundColor: "#fff7e6", // Fondo claro para los productos
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={item.nombre}
                    image={item.foto}
                    sx={{
                      height: "200px", // Establecer una altura fija
                      width: "100%", // Asegurarse de que ocupe todo el ancho disponible
                      objectFit: "cover", // Asegura que la imagen cubra el área sin deformarse
                      borderBottom: "2px solid #f58c42", // Borde inferior de color naranja
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#f58c42" }}>
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
                        color: "#f58c42",
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
                        backgroundColor: "#f58c42",
                        color: "#fff",
                        ":hover": { backgroundColor: "#f57c00" },
                      }}
                    >
                      {item.stock === 0 ? "Sin Stock" : "Agregar al Carrito"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ) : null // Si no tiene imagen o no termina en .jpg, no se renderiza nada
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
