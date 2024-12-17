import express from "express";
import festados from "../models/estados.js";

const router = express.Router();

// Ruta para insertar estados
router.post("/api/insertarestados", async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "El campo 'nombre' es obligatorio." });
  }

  try {
    const resultado = await festados.insertarEstado({ nombre });
    res.status(201).json({ mensaje: "Estado insertado correctamente", datos: resultado.recordset });
  } catch (error) {
    res.status(500).json({ error: "Error al insertar el estado.", detalles: error.message });
  }
});

// Ruta para actualizar estados
router.put("/api/actualizarestados", async (req, res) => {
  const { idEstados, nombre } = req.body;

  if (!idEstados || !nombre) {
    return res.status(400).json({ error: "Los campos 'idEstados' y 'nombre' son obligatorios." });
  }

  try {
    const resultado = await festados.ActualizarEstados({ idEstados: parseInt(idEstados, 10), nombre });
    res.status(200).json({ mensaje: "Estado actualizado correctamente", datos: resultado.recordset });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el estado.", detalles: error.message });
  }
});

export default router;
