import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Box,
} from "@mui/material";

const ProductoForm = ({ onSubmit, producto }) => {
  const [formData, setFormData] = useState({
    categoriaProductos_idCategoriaProductos: producto
      ? producto.categoriaProductos_idCategoriaProductos
      : "",
    usuarios_idUsuarios: "", // Inicializamos el campo idUsuarios vacío
    nombre: producto ? producto.nombre : "",
    marca: producto ? producto.marca : "",
    codigo: producto ? producto.codigo : "",
    stock: producto ? producto.stock : "",
    estados_idEstados: producto ? producto.estados_idEstados : "",
    precio: producto ? producto.precio : "",
  });

  const [categorias, setCategorias] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Obtener las categorías de productos desde el servidor
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categorias/activas"
        );
        const categoriasSoloNombres = response.data.map((categoria) => ({
          idCategoriaProductos: categoria.idCategoriaProductos,
          nombre: categoria.nombreCategoria,
        }));
        setCategorias(categoriasSoloNombres);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategorias();

    // Obtener el idUsuario desde el localStorage
    const idUsuario = localStorage.getItem("idUsuarios");
    if (idUsuario) {
      setFormData((prevData) => ({
        ...prevData,
        usuarios_idUsuarios: idUsuario,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      ["stock", "precio", "usuarios_idUsuarios", "estados_idEstados"].includes(
        name
      )
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value ? Number(value) : "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!window.confirm("¿Estás seguro de enviar los datos?")) return;

    setIsSubmitting(true);
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const url = producto
        ? "http://localhost:5000/api/actualizarProducto"
        : "http://localhost:5000/api/insertarProducto";
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(
        producto
          ? "Producto actualizado correctamente."
          : "Producto agregado correctamente."
      );
      onSubmit && onSubmit(response.data);

      setFormData({
        categoriaProductos_idCategoriaProductos: "",
        usuarios_idUsuarios: "",
        nombre: "",
        marca: "",
        codigo: "",
        stock: "",
        estados_idEstados: "",
        precio: "",
      });
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message || "Error al guardar el producto.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="form-section"
      style={{
        background: "#f4f7fb",
        padding: "40px 0",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="form-container"
        style={{
          maxWidth: "800px",
          margin: "auto",
          background: "#ffffff",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#333",
            marginBottom: "20px",
            fontSize: "24px",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          {producto ? "Actualizar Producto" : "Formulario de Producto"}
        </h2>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel
                id="categoria-label"
                style={{
                  color: "#555",
                }}
              >
                Categoría
              </InputLabel>
              <Select
                labelId="categoria-label"
                name="categoriaProductos_idCategoriaProductos"
                value={formData.categoriaProductos_idCategoriaProductos}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#f4f7fb",
                  borderRadius: "4px",
                  padding: "10px",
                  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <MenuItem value="">Selecciona una categoría</MenuItem>
                {categorias.map((categoria) => (
                  <MenuItem
                    key={categoria.idCategoriaProductos}
                    value={categoria.idCategoriaProductos}
                  >
                    {categoria.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <InputLabel
                id="usuario-label"
                style={{
                  color: "#555",
                }}
              >
                ID Usuario
              </InputLabel>
              <span
                style={{
                  backgroundColor: "#f4f7fb",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                  fontWeight: "bold",
                }}
              >
                {formData.usuarios_idUsuarios}
              </span>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              name="nombre"
              label="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                style: {
                  backgroundColor: "#f4f7fb",
                  borderRadius: "4px",
                  padding: "10px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              name="marca"
              label="Marca"
              value={formData.marca}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                style: {
                  backgroundColor: "#f4f7fb",
                  borderRadius: "4px",
                  padding: "10px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              name="codigo"
              label="Código"
              value={formData.codigo}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                style: {
                  backgroundColor: "#f4f7fb",
                  borderRadius: "4px",
                  padding: "10px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="number"
              name="stock"
              label="Stock"
              value={formData.stock}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                style: {
                  backgroundColor: "#f4f7fb",
                  borderRadius: "4px",
                  padding: "10px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="number"
              name="estados_idEstados"
              label="ID Estado"
              value={formData.estados_idEstados}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                style: {
                  backgroundColor: "#f4f7fb",
                  borderRadius: "4px",
                  padding: "10px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="number"
              step="0.01"
              name="precio"
              label="Precio"
              value={formData.precio}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                style: {
                  backgroundColor: "#f4f7fb",
                  borderRadius: "4px",
                  padding: "10px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                style={{
                  backgroundColor: "#1e88e5",
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: "4px",
                  textTransform: "none",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                }}
              >
                {isSubmitting
                  ? "Guardando..."
                  : producto
                  ? "Actualizar"
                  : "Guardar"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </section>
  );
};

ProductoForm.propTypes = {
  onSubmit: PropTypes.func,
  producto: PropTypes.object,
};

export default ProductoForm;
