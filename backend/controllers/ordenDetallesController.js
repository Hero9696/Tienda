import fod from "../models/ordenDetalles.js";

const insertarordendetalles = async (req, res) => {
  const { idUsuarios, detalles } = req.body;

  if (!idUsuarios || !detalles || detalles.length === 0) {
    return res.status(400).json({ error: "Faltan datos en la solicitud" });
  }

  try {
    // Llamar al procedimiento almacenado para crear la orden
    const result = await fod.crearOrdenDetalles(idUsuarios, detalles);

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error al insertar detalles de la orden:", error);
    return res.status(500).json({ error: error.message });
  }
}



const actualizarOrdenDetalles = async (req, res) => {
  const { idOrden, detalles } = req.body;

  try {
    if (!idOrden || !Array.isArray(detalles) || detalles.length === 0) {
      return res.status(400).json({
        message:
          "Faltan parámetros: idOrden y detalles son necesarios, y detalles debe ser un arreglo con al menos un elemento.",
      });
    }

    const result = await fod.actualizarOrdenDetalles(
      parseInt(idOrden),
      detalles
    );

    res.status(200).json({
      message: "Detalles de la orden actualizados correctamente.",
      data: result,
    });
  } catch (err) {
    console.error("Error al actualizar los detalles de la orden:", err.message);
    res.status(500).json({
      message: "Error al actualizar los detalles de la orden.",
      error: err.message,
    });
  }
}

const actualizarOrden = async (req, res) => {
  const { usuarioId, direccion, estado } = req.body;

  if (!usuarioId || !direccion || !estado) {
    return res
      .status(400)
      .json({
        message:
          "Faltan parámetros: usuarioId, dirección y estado son necesarios",
      });
  }

  try {
    const result = await fod.actualizarOrden(
      parseInt(usuarioId),
      direccion,
      estado
    );

    res.status(200).json({
      message: "Orden actualizada correctamente",
      data: result,
    });
  } catch (err) {
    console.error("Error al actualizar la orden:", err);
    res
      .status(500)
      .json({ message: "Error al actualizar la orden", error: err.message });
  }
}

const obtenerOrdenDetalles = async (req, res) => {
  const { idUsuarios } = req.body;

  // Validar que el idUsuarios está presente en la solicitud
  if (!idUsuarios) {
    return res.status(400).json({ error: "Falta el ID de usuario en la solicitud" });
  }

  try {
    // Llamar a la función obtenerOrdenDetalles con el idUsuarios
    const ordenDetalles = await fod.obtenerOrdenDetalles(idUsuarios);

    // Verificar si se encontraron detalles de la orden
    if (ordenDetalles.length > 0) {
      return res.status(200).json({ success: true, orden: ordenDetalles });
    } else {
      return res.status(404).json({ error: "No se encontraron detalles de la orden para este usuario" });
    }
  } catch (error) {
    console.error("Error al obtener los detalles de la orden:", error);
    return res.status(500).json({ error: "Error al obtener los detalles de la orden" });
  }
}

const eliminarOrdenDetalles = async (req, res) => {
  const { idOrden } = req.params;

  try {
    // Llamar a la función para eliminar la orden
    const resultado = await fod.eliminarOrden(parseInt(idOrden));

    // Si la orden no se pudo eliminar, enviar un mensaje de error
    if (resultado === "La orden no está en estado Pendiente y no se puede eliminar.") {
      return res.status(400).json({ message: resultado });
    }

    // Si la orden fue eliminada exitosamente
    return res.status(200).json({ message: resultado });
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
    return res.status(500).json({ message: "Hubo un error al eliminar la orden." });
  }
}

export default { insertarordendetalles, actualizarOrdenDetalles, actualizarOrden, obtenerOrdenDetalles, eliminarOrdenDetalles };