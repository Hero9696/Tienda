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
    usuarios_idUsuarios: "",
    nombre: producto ? producto.nombre : "",
    marca: producto ? producto.marca : "",
    codigo: producto ? producto.codigo : "",
    stock: producto ? producto.stock : "",
    estados_idEstados: producto ? producto.estados_idEstados : "",
    precio: producto ? producto.precio : "",
    foto: producto ? producto.foto : "",
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
    if (["stock", "precio", "estados_idEstados"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value ? parseFloat(value) : "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "categoriaProductos_idCategoriaProductos",
      "nombre",
      "marca",
      "codigo",
      "stock",
      "estados_idEstados",
      "precio",
      "foto",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`El campo ${field} es obligatorio.`);
        return false;
      }
    }
    return true;
  };const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    if (!window.confirm("¿Estás seguro de enviar los datos?")) return;
  
    setIsSubmitting(true);
  
    // Log para verificar los datos que se están enviando
    console.log("Datos del formulario:", formData);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/insertarProducto", 
        formData, // Enviar los datos directamente como JSON
        {
          headers: {
            "Content-Type": "application/json", // Establecer el tipo de contenido como JSON
          },
        }
      );
  
      alert(
        producto ? "Producto actualizado correctamente." : "Producto agregado correctamente."
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
        foto: "",
      });
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        alert("Error de red. Verifica tu conexión.");
      } else {
        alert("Error desconocido al guardar el producto.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  const styles = {
    formContainer: {
      maxWidth: "800px",
      margin: "auto",
      background: "#ffffff",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    },
    input: {
      backgroundColor: "#f4f7fb",
      borderRadius: "4px",
      padding: "10px",
    },
    button: {
      backgroundColor: "#1e88e5",
      color: "#fff",
      padding: "12px 24px",
      borderRadius: "4px",
      textTransform: "none",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
    },
  };

  return (
    <section
      className="form-section"
      style={{ background: "#f4f7fb", padding: "40px 0" }}
    >
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          {producto ? "Actualizar Producto" : "Formulario de Producto"}
        </h2>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="categoria-label">Categoría</InputLabel>
              <Select
                labelId="categoria-label"
                name="categoriaProductos_idCategoriaProductos"
                value={formData.categoriaProductos_idCategoriaProductos}
                onChange={handleChange}
                required
                style={styles.input}
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
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <InputLabel id="usuario-label">ID Usuario</InputLabel>
              <span style={styles.input}>{formData.usuarios_idUsuarios}</span>
            </Box>
          </Grid>

          {/* TextField inputs */}
          {[
            { name: "nombre", label: "Nombre", type: "text" },
            { name: "marca", label: "Marca", type: "text" },
            { name: "codigo", label: "Código", type: "text" },
            { name: "foto", label: "Foto", type: "text" },
            { name: "stock", label: "Stock", type: "number" },
            { name: "estados_idEstados", label: "ID Estado", type: "number" },
            { name: "precio", label: "Precio", type: "number", step: "0.01" },
          ].map(({ name, label, type, step }, index) => (
            <Grid item xs={12} md={6} key={index}>
              <TextField
                name={name}
                label={label}
                type={type}
                step={step}
                value={formData[name]}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{ style: styles.input }}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Box sx={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                style={styles.button}
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
