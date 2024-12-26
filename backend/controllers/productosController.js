import fproductos from "../models/productos.js";

const verProductos = async (req, res) => {
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
}

const insertarProducto = async (req, res) => {
  const producto = req.body;

  try {
    const result = await fproductos.insertarProducto({ ...producto });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const actualizarProducto =  async (req, res) => {
    const producto = req.body;
    const foto = req.file ? `/uploads/${req.file.filename}` : null;
  
    try {
      const result = await fproductos.actualizarProducto({ ...producto, foto });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

export default { verProductos, insertarProducto, actualizarProducto };