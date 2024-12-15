import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const ProductoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    categoriaProductos_idCategoriaProductos: "",
    usuarios_idUsuarios: "",
    nombre: "",
    marca: "",
    codigo: "",
    stock: "",
    estados_idEstados: "",
    precio: "",
    foto: null,
  });

  const [categorias, setCategorias] = useState([]); // Estado para las categorías
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
        setCategorias(categoriasSoloNombres); // Guardar solo los nombres
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      setFormData({ ...formData, foto: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
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
      const response = await axios.post(
        "http://localhost:5000/insertarProducto",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Producto agregado correctamente.");
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
        foto: null,
      });
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message || "Error al agregar el producto.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="form-section">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Formulario de Producto</h2>

        {/* Campo Select para Categorías */}
        <select
          name="categoriaProductos_idCategoriaProductos"
          value={formData.categoriaProductos_idCategoriaProductos}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria) => (
            <option
              key={categoria.idCategoriaProductos}
              value={categoria.idCategoriaProductos}
            >
              {categoria.nombre} {/* Mostrar solo el nombre de la categoría */}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="usuarios_idUsuarios"
          placeholder="ID Usuario"
          value={formData.usuarios_idUsuarios}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={formData.marca}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="codigo"
          placeholder="Código"
          value={formData.codigo}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="estados_idEstados"
          placeholder="ID Estado"
          value={formData.estados_idEstados}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          step="0.01"
          name="precio"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
          required
        />
        <input type="file" name="foto" onChange={handleChange} />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </section>
  );
};

ProductoForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ProductoForm;
