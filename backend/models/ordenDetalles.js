import mssql from "mssql";
import connectDB from "../db.js";

const crearOrdenDetalles = async (idUsuarios, detalles) => {
  try {
    const productosValidos = [];
    const productosNoEncontrados = [];

    for (const detalle of detalles) {
      const producto = await verProductoPorId(detalle.idProductos);
      if (producto.length > 0) {
        productosValidos.push({
          idProductos: detalle.idProductos,
          cantidad: detalle.cantidad,
        });
      } else {
        productosNoEncontrados.push(detalle.idProductos);
      }
    }

    if (productosNoEncontrados.length > 0) {
      return { error: `Productos no encontrados: ${productosNoEncontrados.join(", ")}` };
    }

    const pool = await connectDB();

    const result = await pool
      .request()
      .input("idUsuarios", mssql.Int, idUsuarios)
      .input("detalles", mssql.NVarChar, JSON.stringify(productosValidos))
      .execute("CrearOrdenDetalles");

    return result;
  } catch (err) {
    console.error("Error al crear la orden y sus detalles:", err);
    throw new Error("Error al crear la orden y sus detalles");
  }
};


const verProductoPorId = async (idProductos) => {
  try {
    const pool = await connectDB();

    const result = await pool
      .request()
      .input("idProductos", mssql.Int, idProductos)
      .execute("VerProductoPorId");
      

    return result.recordset;
  } catch (err) {
    console.error("Error al obtener el producto:", err);
    throw new Error("Error al obtener el producto");
  }
};

const actualizarOrdenDetalles = async (idOrden, detalles) => {
  try {
    if (!idOrden || !Array.isArray(detalles) || detalles.length === 0) {
      throw new Error("Faltan parámetros: idOrden y detalles son necesarios.");
    }

    const pool = await connectDB();

    const result = await pool
      .request()
      .input("idOrden", mssql.Int, idOrden)
      .input("detalles", mssql.NVarChar, JSON.stringify(detalles))
      .execute("ActualizarOrdenDetalles");

    if (!result.recordset || result.recordset.length === 0) {
      throw new Error("No se encontraron resultados para la orden actualizada.");
    }

    return result.recordset;
  } catch (err) {
    console.error("Error al actualizar los detalles de la orden:", err.message);
    throw new Error("Error al actualizar los detalles de la orden");
  }
};


const actualizarOrden = async (idOrden, direccion, idEstado) => {
  try {
    const pool = await connectDB();

    const result = await pool
      .request()
      .input("idOrden", mssql.Int, idOrden)
      .input("direccion", mssql.NVarChar, direccion)
      .input("idEstado", mssql.Int, idEstado)
      .execute("ActualizarOrden");

    return result.recordset;
  } catch (err) {
    console.error("Error al actualizar la orden:", err);
    throw new Error("Error al actualizar la orden");
  }
};


const obtenerOrdenDetalles = async (idUsuarios) => {
  try {
    // Conectar a la base de datos
    const pool = await connectDB();

    // Ejecutar el procedimiento almacenado
    const result = await pool
      .request()
      .input("usuarios_idUsuarios", mssql.Int, idUsuarios)
      .execute("ObtenerOrdenPorId");

    // Devolver el resultado
    return result.recordset;
  } catch (err) {
    console.error("Error al obtener los detalles de la orden:", err);
    throw new Error("Error al obtener los detalles de la orden");
  }
};


export default { crearOrdenDetalles, actualizarOrdenDetalles, actualizarOrden, obtenerOrdenDetalles };
