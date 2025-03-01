import festados from "../models/estados.js";

const insertarEstado = async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "El campo 'nombre' es obligatorio." });
  }

  try {
    const resultado = await festados.insertarEstado({ nombre });
    res
      .status(201)
      .json({
        mensaje: "Estado insertado correctamente",
        datos: resultado.recordset,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al insertar el estado.", detalles: error.message });
  }
}

const actualizarEstado = async (req, res) => {
    const { idEstados, nombre } = req.body;
  
    if (!idEstados || !nombre) {
      return res
        .status(400)
        .json({ error: "Los campos 'idEstados' y 'nombre' son obligatorios." });
    }
  
    try {
      const resultado = await festados.ActualizarEstados({
        idEstados: parseInt(idEstados, 10),
        nombre,
      });
      res
        .status(200)
        .json({
          mensaje: "Estado actualizado correctamente",
          datos: resultado.recordset,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Error al actualizar el estado.",
          detalles: error.message,
        });
    }
  }

    const estados = async (req, res) => {
      try {
        const productos = await festados.getEstados();
        if (productos.length === 0) {
          return res.status(404).send("No se encontraron datos.");
        }
        res.json(productos);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        res.status(500).send("Error al conectar a la base de datos");
      }
    }

    const alternarEstadoProducto = async (req, res) => {
      try {
        const { idProducto } = req.body; // Obtenemos el idProducto desde el cuerpo de la solicitud
    
        // Validamos que el idProducto exista y sea un número entero
        if (!idProducto || isNaN(idProducto)) {
          return res.status(400).send("El ID del producto es inválido.");
        }
    
        
    
        // Ejecutamos el procedimiento almacenado AlternarEstadoProducto
        const result = await festados.alternarEstadoProducto(idProducto);
    
        if (result.rowsAffected[0] === 0) {
          return res.status(404).send("Producto no encontrado o no se pudo alternar el estado.");
        }
    
        res.status(200).send("Estado del producto alternado con éxito.");
        
      } catch (err) {
        console.error("Error al alternar el estado del producto:", err);
        res.status(500).send("Error al conectar a la base de datos.");
      }
    }
export default { insertarEstado, actualizarEstado, estados, alternarEstadoProducto };