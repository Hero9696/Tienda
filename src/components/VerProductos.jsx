import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  CardMedia,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("");
  const [newCodigo, setNewCodigo] = useState("");
  const [newFoto, setNewFoto] = useState("");
  const [newCategoriaId, setNewCategoriaId] = useState("");
  const [newMarca, setNewMarca] = useState("");
  const [newEstadoId, setNewEstadoId] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/verproductos"
        );
        setProductos(response.data);
        console.log("Productos", response.data);
      } catch (error) {
        console.error("Error al obtener los productos", error);
      }
    };
    fetchProductos();
  }, []);

  const getEstadoNombre = (idEstados) => {
    return idEstados === 1
      ? "Activo"
      : idEstados === 2
      ? "Inactivo"
      : "Desconocido";
  };

  const handleEdit = (id) => {
    const producto = productos.find((producto) => producto.idProductos === id);
    setNewName(producto.nombre);
    setNewPrice(producto.precio);
    setNewStock(producto.stock);
    setNewCodigo(producto.codigo);
    setNewFoto(producto.foto);
    setNewCategoriaId(producto.categoriaProductos_idCategoriaProductos);
    setNewMarca(producto.marca);
    setNewEstadoId(producto.estados_idEstados);
    setEditing(id);
  };

  const handleSave = async (id) => {
    try {
      const idUsuarios = localStorage.getItem("idUsuarios");

      if (!idUsuarios) {
        console.error("No se encontró el id del usuario en localStorage.");
        return;
      }

      await axios.put("http://localhost:5000/api/actualizarProducto", {
        idProductos: id,
        nombre: newName,
        precio: newPrice,
        stock: newStock,
        codigo: newCodigo,
        foto: newFoto,
        categoriaProductos_idCategoriaProductos: newCategoriaId,
        marca: newMarca,
        usuarios_idUsuarios: idUsuarios,
        estados_idEstados: newEstadoId,
      });

      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.idProductos === id
            ? {
                ...producto,
                nombre: newName,
                precio: newPrice,
                stock: newStock,
                codigo: newCodigo,
                foto: newFoto,
                categoriaProductos_idCategoriaProductos: newCategoriaId,
                marca: newMarca,
                usuarios_idUsuarios: idUsuarios,
                estados_idEstados: newEstadoId,
              }
            : producto
        )
      );

      setEditing(null);
      setNewName("");
      setNewPrice("");
      setNewStock("");
      setNewCodigo("");
      setNewFoto("");
      setNewCategoriaId("");
      setNewMarca("");
      setNewEstadoId("");
    } catch (error) {
      console.error("Error al guardar el producto", error);
    }
  };

  const handleChangeStatus = async (id) => {
    const producto = productos.find((producto) => producto.idProductos === id);
    const updatedStatus = producto.estados_idEstados === 1 ? 2 : 1;

    try {
      await axios.post("http://localhost:5000/api/alternarestado", {
        idProducto: id,
      });

      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.idProductos === id
            ? { ...producto, estados_idEstados: updatedStatus }
            : producto
        )
      );
    } catch (error) {
      console.error("Error al cambiar el estado", error);
    }
  };

  const styles = {
    card: {
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      transition: "transform 0.3s",
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
    cardContent: {
      padding: "16px",
    },
    title: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "#003366",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#003366",
    },
    button: {
      backgroundColor: "#ffcc00", // Amarillo Walmart
      color: "#003366", // Azul Walmart
      marginTop: "8px",
      textTransform: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      "&:hover": {
        backgroundColor: "#e6b800", // Amarillo más oscuro
      },
    },
    buttonOutlined: {
      marginTop: "8px",
      textTransform: "none",
      borderColor: "#003366",
      color: "#003366",
      "&:hover": {
        backgroundColor: "#003366",
        color: "#fff",
      },
    },
    input: {
      backgroundColor: "#f9f9f9",
      borderRadius: "4px",
      padding: "8px",
      marginBottom: "10px",
    },
  };

  return (
    <div>
      <Grid container spacing={2}>
        {productos.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.idProductos}>
            <Card style={styles.card}>
              <CardContent style={styles.cardContent}>
                {producto.foto && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={producto.foto}
                    alt={producto.nombre}
                  />
                )}
                <Typography variant="h6" style={styles.title}>
                  {producto.nombre}
                </Typography>
                <Typography variant="body2" style={styles.subtitle}>
                  Marca: {producto.marca}
                </Typography>
                <Typography variant="body2" style={styles.subtitle}>
                  Precio: Q{producto.precio}
                </Typography>
                <Typography variant="body2" style={styles.subtitle}>
                  Stock: {producto.stock}
                </Typography>
                <Typography variant="body2" style={styles.subtitle}>
                  Estado: {getEstadoNombre(producto.estados_idEstados)}
                </Typography>
                <Typography variant="body2" style={styles.subtitle}>
                  Categoría: {producto.categoriaNombre}
                </Typography>

                {editing === producto.idProductos ? (
                  <>
                    <TextField
                      label="Nuevo Nombre"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      fullWidth
                      margin="normal"
                      style={styles.input}
                    />
                    <TextField
                      label="Nuevo Precio"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      fullWidth
                      margin="normal"
                      type="number"
                      style={styles.input}
                    />
                    <TextField
                      label="Nuevo Stock"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      fullWidth
                      margin="normal"
                      type="number"
                      style={styles.input}
                    />
                    <TextField
                      label="Nuevo Codigo"
                      value={newCodigo}
                      onChange={(e) => setNewCodigo(e.target.value)}
                      fullWidth
                      margin="normal"
                      style={styles.input}
                    />
                    <TextField
                      label="Nueva Foto URL"
                      value={newFoto}
                      onChange={(e) => setNewFoto(e.target.value)}
                      fullWidth
                      margin="normal"
                      style={styles.input}
                    />
                    <TextField
                      label="Nueva Marca"
                      value={newMarca}
                      onChange={(e) => setNewMarca(e.target.value)}
                      fullWidth
                      margin="normal"
                      style={styles.input}
                    />
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Categoria</InputLabel>
                      <Select
                        value={newCategoriaId}
                        onChange={(e) => setNewCategoriaId(e.target.value)}
                        label="Categoria"
                      >
                        {Array.from(
                          new Set(
                            productos.map(
                              (producto) => producto.idCategoriaProductos
                            )
                          )
                        ).map((idCategoria) => {
                          const categoria = productos.find(
                            (producto) =>
                              producto.idCategoriaProductos === idCategoria
                          );
                          return (
                            <MenuItem key={idCategoria} value={idCategoria}>
                              {categoria.categoriaNombre}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                      <InputLabel>Estado</InputLabel>
                      <Select
                        value={newEstadoId}
                        onChange={(e) => setNewEstadoId(e.target.value)}
                        label="Estado"
                      >
                        <MenuItem value={1}>Activo</MenuItem>
                        <MenuItem value={2}>Inactivo</MenuItem>
                      </Select>
                    </FormControl>

                    <Button
                      onClick={() => handleSave(producto.idProductos)}
                      variant="contained"
                      style={styles.button}
                    >
                      Guardar
                    </Button>
                    <Button
                      onClick={() => setEditing(null)}
                      variant="outlined"
                      style={styles.buttonOutlined}
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <div>
                    <Button
                      onClick={() => handleEdit(producto.idProductos)}
                      variant="outlined"
                      style={styles.buttonOutlined}
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleChangeStatus(producto.idProductos)}
                      variant="outlined"
                      color="info"
                      style={styles.button}
                    >
                      Cambiar Estado
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Productos;
