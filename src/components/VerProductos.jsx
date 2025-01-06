import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card, CardContent, Typography, Button, TextField, CardMedia } from "@mui/material";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("");
  const [newCodigo, setNewCodigo] = useState("");
  const [newFoto, setNewFoto] = useState("");
  const [newCategoriaId, setNewCategoriaId] = useState("");
  const [newMarca, setNewMarca] = useState("");

  // Obtener los productos desde el API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/verproductos");
        setProductos(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener los productos", error);
      }
    };

    const fetchEstados = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/estados");
        setEstados(response.data);
      } catch (error) {
        console.error("Error al obtener los estados", error);
      }
    };

    fetchProductos();
    fetchEstados();
  }, []);

  // Función para manejar la edición de un producto
  const handleEdit = (id) => {
    const producto = productos.find((producto) => producto.idProductos === id);
    setNewName(producto.nombre);
    setNewPrice(producto.precio);
    setNewStock(producto.stock);
    setNewCodigo(producto.codigo);
    setNewFoto(producto.foto);
    setNewCategoriaId(producto.categoriaProductos_idCategoriaProductos);
    setNewMarca(producto.marca);
    setEditing(id);
  };

  // Función para guardar los cambios del producto
  const handleSave = async (id) => {
    try {
      await axios.put(`/api/productos/${id}`, { 
        nombre: newName, 
        precio: newPrice, 
        stock: newStock,
        codigo: newCodigo,
        foto: newFoto,
        categoriaProductos_idCategoriaProductos: newCategoriaId,
        marca: newMarca
      });
      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.idProductos === id
            ? { ...producto, nombre: newName, precio: newPrice, stock: newStock, codigo: newCodigo, foto: newFoto, categoriaProductos_idCategoriaProductos: newCategoriaId, marca: newMarca }
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
    } catch (error) {
      console.error("Error al guardar el producto", error);
    }
  };

  // Función para eliminar un producto
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/productos/${id}`);
      setProductos(productos.filter((producto) => producto.idProductos !== id));
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  // Función para cambiar el estado del producto
  const handleChangeStatus = async (id) => {
    const producto = productos.find((producto) => producto.idProductos === id);
   
    const updatedStatus = producto.estados_idEstados === 1 ? 2 : 1; // 1: Activo, 2: Inactivo
  
    try {
      await axios.post('http://localhost:5000/api/alternarestado', { idProducto: id });
  
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
  
  // Obtener el nombre del estado por ID
  const getEstadoNombre = (idEstados) => {
    const estado = estados.find((e) => e.idEstados === idEstados);
    return estado ? estado.nombre : "Desconocido";
  };

  return (
    <div>
      <Grid container spacing={2}>
        {productos.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.idProductos}>
            <Card>
              <CardContent>
                {producto.foto && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={producto.foto}
                    alt={producto.nombre}
                  />
                )}
                <Typography variant="h6">{producto.nombre}</Typography>
                <Typography variant="body2">Marca: {producto.marca}</Typography>
                <Typography variant="body2">Precio: Q{producto.precio}</Typography>
                <Typography variant="body2">Stock: {producto.stock}</Typography>
                <Typography variant="body2">Estado: {getEstadoNombre(producto.estados_idEstados)}</Typography>

                {editing === producto.idProductos ? (
                  <>
                    <TextField
                      label="Nuevo Nombre"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Nuevo Precio"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      fullWidth
                      margin="normal"
                      type="number"
                    />
                    <TextField
                      label="Nuevo Stock"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      fullWidth
                      margin="normal"
                      type="number"
                    />
                    <TextField
                      label="Nuevo Codigo"
                      value={newCodigo}
                      onChange={(e) => setNewCodigo(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Nueva Foto URL"
                      value={newFoto}
                      onChange={(e) => setNewFoto(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Nueva Marca"
                      value={newMarca}
                      onChange={(e) => setNewMarca(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Nueva Categoria ID"
                      value={newCategoriaId}
                      onChange={(e) => setNewCategoriaId(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <Button onClick={() => handleSave(producto.idProductos)} variant="contained" color="primary" style={{ marginRight: 8 }}>
                      Guardar
                    </Button>
                    <Button onClick={() => setEditing(null)} variant="outlined" color="secondary" style={{ marginRight: 8 }}>
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <div>
                    <Button onClick={() => handleEdit(producto.idProductos)} variant="outlined" color="secondary" style={{ marginRight: 8 }}>
                      Editar
                    </Button>
                    <Button onClick={() => handleDelete(producto.idProductos)} variant="outlined" color="error" style={{ marginRight: 8 }}>
                      Eliminar
                    </Button>
                    <Button onClick={() => handleChangeStatus(producto.idProductos)} variant="outlined" color="info">
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
