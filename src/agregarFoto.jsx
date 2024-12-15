import { useState } from 'react';
import axios from 'axios';

const ProductoForm = () => {
  const [foto, setFoto] = useState(null);
  const [idProductos, setIdProducto] = useState(''); // Cambié el valor inicial a un string vacío

  // Cambiar el estado de la foto cuando se selecciona un archivo
  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  // Cambiar el estado de idProductos cuando el usuario ingresa un ID
  const handleIdChange = (e) => {
    setIdProducto(e.target.value);
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que se haya seleccionado un archivo y un idProducto
    if (!foto) {
      alert('Por favor, selecciona una imagen.');
      return;
    }

    if (!idProductos) {
      alert('Por favor, ingresa un ID de producto.');
      return;
    }

    const formData = new FormData();
    formData.append('foto', foto);
    formData.append('idProductos', idProductos);

    try {
      const response = await axios.post('http://localhost:5000/api/producto/foto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Imagen guardada:', response.data);
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="idProductos">ID del Producto:</label>
        <input
          type="number"
          id="idProductos"
          value={idProductos}
          onChange={handleIdChange}
          placeholder="Ingresa el ID del producto"
        />
      </div>
      <div>
        <label htmlFor="foto">Seleccionar Foto:</label>
        <input type="file" id="foto" onChange={handleFileChange} />
      </div>
      <button type="submit">Subir Foto</button>
    </form>
  );
};

export default ProductoForm;
