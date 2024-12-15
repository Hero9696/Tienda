// server.js
//import multer from "multer";
import express from "express";
import {
  getProductosActivosConStock,
  insertarProducto,
  actualizarProducto,
 
} from "./models/productos.js";
import { getCategoriasActivas } from "./models/categorias.js";
import cors from "cors";


//const storage = multer.memoryStorage(); // Usar memoria para almacenar el archivo temporalmente
//const upload = multer({ storage: storage }).single("foto");
const app = express();
const port = 5000;

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS para permitir solicitudes desde React
app.use(cors());

// Ruta para obtener los datos de la base de datos usando el modelo
app.get("/api/datos", async (req, res) => {
  try {
    const productos = await getProductosActivosConStock(); // Llamamos al modelo para obtener los productos
    if (productos.length === 0) {
      return res.status(404).send("No se encontraron datos.");
    }
    res.json(productos);
  } catch (err) {
    console.error("Error al obtener datos:", err);
    res.status(500).send("Error al conectar a la base de datos");
  }
});

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

// Ruta para insertar un producto
app.post("/api/insertarProducto",  async (req, res) => {
  const producto = req.body;
  

  console.log("Producto recibido:", producto); // Verifica los datos
   

  try {
    const result = await insertarProducto({
      ...producto,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/actualizarProducto", async (req, res) => {
  const producto = req.body;
  const foto = req.file ? `/uploads/${req.file.filename}` : null; // Guardamos la ruta de la imagen

  console.log("Producto recibido para actualizar:", producto); // Verifica los datos
  console.log("Foto recibida para actualizar:", foto); // Verifica la foto (ruta de la imagen)

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



// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
