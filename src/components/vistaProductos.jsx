import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress, Button, Chip } from "@mui/material";
import PropTypes from 'prop-types'; // Importar PropTypes


const Vista = ({ addToCart }) => {
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

                    {item.stock === 0 && (
                      <Chip label="Sin Stock" color="secondary" style={{ marginTop: '10px' }} />
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => addToCart(item)} // Llamada a la función para agregar al carrito
                      disabled={item.stock === 0} // Desactivar el botón si no hay stock
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

// Definir los tipos de las propiedades
Vista.propTypes = {
  addToCart: PropTypes.func.isRequired, // La propiedad addToCart debe ser una función
};

export default Vista;
