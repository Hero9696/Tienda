import mssql from "mssql";
import connectDB from "../db.js";

const insertarEstado = async (estado) => {
  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("nombre", mssql.NVarChar, estado.nombre)
      .execute("InsertarEstados");
    return result;
  } catch (err) {
    console.error("Error al insertar el estado:", err);
    throw new Error("Error al insertar el estado");
  }
};

const ActualizarEstados = async (estado) => {
  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("idEstados", mssql.Int, estado.idEstados)
      .input("nombre", mssql.NVarChar, estado.nombre)
      .execute("ActualizarEstados");
    return result;
  } catch (err) {
    console.error("Error al actualizar el estado:", err);
    throw new Error("Error al actualizar el estado");
  }
};

const getEstados = async () => {
  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .query("SELECT * FROM VistaEstados");
    return result.recordset;
  } catch (err) {
    console.error("Error al obtener datos:", err);
    throw new Error("Error al obtener datos de la base de datos");
  }
};


const alternarEstadoProducto = async (idProducto) => {
  try {
    const pool = await connectDB();

    // Ejecutamos el procedimiento almacenado AlternarEstadoProducto
    const result = await pool
      .request()
      .input("idProductos", mssql.Int, idProducto)
      .execute("AlternarEstadoProducto");

    return result;
    
  } catch (err) {
    console.error("Error al alternar el estado del producto:", err);
    throw new Error("Error al alternar el estado del producto");
  }
};




export default { insertarEstado, ActualizarEstados, getEstados, alternarEstadoProducto };
