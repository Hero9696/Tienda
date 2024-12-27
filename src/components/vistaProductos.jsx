import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress } from "@mui/material";

const Vista = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

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

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Obteniendo Datos
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
