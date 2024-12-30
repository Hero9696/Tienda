import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress, Button, Chip } from "@mui/material";

const Vista = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]); // Estado para el carrito

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

  const addToCart = (product) => {
    if (product.stock > 0) {
      setCart([...cart, product]);
      alert(`${product.nombre} ha sido agregado al carrito.`);
    } else {
      alert("El producto no tiene stock disponible");
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Catálogo de Productos
      </Typography>

      <div className="registro">
        {data.length > 0 ? (
          <Grid container spacing={3}>
            {data.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={item.nombre}
                    height="200"
                    image={item.foto}
                  />
                  <CardContent>
                    <Typography variant="h6">{item.nombre}</Typography>
                    <Typography color="textSecondary">
                      <strong>Marca:</strong> {item.marca}
                    </Typography>
                    <Typography color="textSecondary">
                      <strong>Cantidad:</strong> {item.stock}
                    </Typography>
                    <Typography color="textSecondary">
                      <strong>Precio:</strong> Q{item.precio}
                    </Typography>

                    {/* Indicador de stock agotado */}
                    {item.stock === 0 && (
                      <Chip label="Sin Stock" color="secondary" style={{ marginTop: '10px' }} />
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => addToCart(item)}
                      disabled={item.stock === 0}
                      style={{ marginTop: '10px' }}
                    >
                      {item.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default Vista;
