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
} from "@mui/material";

const ProductoForm = ({ onSubmit, producto }) => {
  const [formData, setFormData] = useState({
    categoriaProductos_idCategoriaProductos: producto
      ? producto.categoriaProductos_idCategoriaProductos
      : "",
    usuarios_idUsuarios: producto ? producto.usuarios_idUsuarios : "",
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convierte valores de tipo número
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
      // Para los demás campos, solo actualizamos el valor
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

    // Agregar todos los campos a FormData
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
    <section className="form-section">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>{producto ? "Actualizar Producto" : "Formulario de Producto"}</h2>

        <Grid container spacing={2}>
          {/* Campo Select para Categorías */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="categoria-label">Categoría</InputLabel>
              <Select
                labelId="categoria-label"
                name="categoriaProductos_idCategoriaProductos"
                value={formData.categoriaProductos_idCategoriaProductos}
                onChange={handleChange}
                required
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
            <TextField
              type="number"
              name="usuarios_idUsuarios"
              label="ID Usuario"
              value={formData.usuarios_idUsuarios}
              onChange={handleChange}
              fullWidth
              required
            />
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
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Guardando..."
                : producto
                ? "Actualizar"
                : "Guardar"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </section>
  );
};

ProductoForm.propTypes = {
  onSubmit: PropTypes.func,
  producto: PropTypes.object, // Producto a editar (opcional)
};

export default ProductoForm;
