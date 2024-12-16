import express from "express";
import {
  getProductosActivosConStock,
  insertarProducto,
  actualizarProducto,
} from "./models/productos.js";
import {
  getCategoriasActivas,
  insertarCategoria,
  actualizarCategoria,
} from "./models/categorias.js";
import cors from "cors";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// RUTAS DE PRODUCTOS

// Ruta para obtener los datos de la base de datos usando el modelo
app.get("/api/productos", async (req, res) => {
  try {
    const productos = await getProductosActivosConStock();
    if (productos.length === 0) {
      return res.status(404).send("No se encontraron datos.");
    }
    res.json(productos);
  } catch (err) {
    console.error("Error al obtener datos:", err);
    res.status(500).send("Error al conectar a la base de datos");
  }
});

// Ruta para insertar un producto
app.post("/api/insertarProducto", async (req, res) => {
  const producto = req.body;

  try {
    const result = await insertarProducto({
      ...producto,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para actualizar un producto
app.put("/api/actualizarProducto", async (req, res) => {
  const producto = req.body;
  const foto = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const result = await actualizarProducto({
      ...producto,
      foto: foto,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RUTAS DE CATEGORIAS

// Ruta para obtener las categorías activas
app.get("/api/categorias/activas", async (req, res) => {
  try {
    const categoriasActivas = await getCategoriasActivas();
    if (categoriasActivas.length === 0) {
      return res.status(404).send("No se encontraron categorías activas.");
    }
    res.json(categoriasActivas);
  } catch (err) {
    console.error("Error al obtener las categorías activas:", err);
    res.status(500).send("Error al obtener las categorías activas");
  }
});

// Ruta para Insertar Categorias
app.post("/api/insertarcategorias", async (req, res) => {
  const { usuarios_idUsuarios, estados_idEstados, nombre } = req.body;

  if (!usuarios_idUsuarios || !estados_idEstados || !nombre) {
    return res.status(400).json({
      error:
        "Todos los campos (usuarios_idUsuarios, estados_idEstados, nombre) son obligatorios.",
    });
  }

  try {
    const resultado = await insertarCategoria({
      usuarios_idUsuarios,
      estados_idEstados,
      nombre,
    });
    res.status(201).json({
      mensaje: "Categoría insertada correctamente",
      datos: resultado.recordset,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor al insertar la categoría.",
      detalles: error.message,
    });
  }
});

// Ruta para Actualizar Categorias
app.put("/api/actualizarcategorias", async (req, res) => {
  const { idCategoriaProductos, usuarios_idUsuarios, estados_idEstados, nombre } = req.body;

  // Validar datos enviados
  if (!idCategoriaProductos || !usuarios_idUsuarios || !estados_idEstados || !nombre) {
    return res.status(400).json({
      error: "Todos los campos (idCategoriaProductos, usuarios_idUsuarios, estados_idEstados, nombre) son obligatorios.",
    });
  }

  try {
    // Llamar a la función para actualizar la categoría
    const resultado = await actualizarCategoria({
      idCategoriaProductos,
      usuarios_idUsuarios,
      estados_idEstados,
      nombre,
    });

    res.status(200).json({
      mensaje: "Categoría actualizada correctamente",
      datos: resultado.recordset,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor al actualizar la categoría.",
      detalles: error.message,
    });
  }
});


// INICIANDO SERVIDOR
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
