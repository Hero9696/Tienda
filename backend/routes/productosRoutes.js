import express from "express";
import fproductos from "../models/productos.js";

const router = express.Router();

// Ruta para obtener los productos
router.get("/api/productos", async (req, res) => {
  try {
    const productos = await fproductos.getProductosActivosConStock();
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
router.post("/api/insertarProducto", async (req, res) => {
  const producto = req.body;

  try {
    const result = await fproductos.insertarProducto({ ...producto });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para actualizar un producto
router.put("/api/actualizarProducto", async (req, res) => {
  const producto = req.body;
  const foto = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const result = await fproductos.actualizarProducto({ ...producto, foto });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
