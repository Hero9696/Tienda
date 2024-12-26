import fod from "../models/ordenDetalles";

const insertarordendetalles =  async (req, res) => {
  const { idUsuarios, detalles } = req.body;

  if (!idUsuarios || !detalles || detalles.length === 0) {
    return res.status(400).json({ error: "Faltan datos en la solicitud" });
  }

  try {
    const result = await fod.crearOrdenDetalles(idUsuarios, detalles);
    return res.status(200).json({ success: true, result });
  } catch (error) {
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

export default { insertarordendetalles, actualizarOrdenDetalles, actualizarOrden };