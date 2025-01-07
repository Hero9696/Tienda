import mssql from "mssql";
import connectDB from "../db.js";

const insertarUsuario = async (usuario) => {
  try {
    const pool = await connectDB();

    // Verificar si el correo electrónico ya está registrado
    const resultBusqueda = await pool
      .request()
      .input("Correo", mssql.NVarChar, usuario.correo_electronico)
      .execute("BuscarUsuarioPorCorreo");

    if (resultBusqueda.recordset.length > 0) {
      throw new Error("El correo electrónico ya está registrado.");
    }

    // Insertar el usuario con todos los campos del nuevo procedimiento
    const result = await pool
      .request()
      .input("rol_idRol", mssql.Int, usuario.rol_idRol)
      .input("correo_electronico", mssql.NVarChar, usuario.correo_electronico)
      .input("nombre_completo", mssql.NVarChar, usuario.nombre_completo)
      .input("password", mssql.NVarChar, usuario.password)
      .input("telefono", mssql.NVarChar, usuario.telefono)
      .input("fecha_nacimiento", mssql.Date, usuario.fecha_nacimiento)
      .input("direccion", mssql.NVarChar, usuario.direccion) // Nueva entrada
      .execute("InsertarUsuarios");

    console.log("Resultado de InsertarUsuarios:", result);

    // Obtener el ID del usuario insertado
    if (result.recordset && result.recordset.length > 0) {
      const idUsuario = result.recordset[0].idUsuarios;
      return { idUsuario }; // Devolver solo el ID del usuario
    } else {
      throw new Error("No se obtuvo el ID del usuario.");
    }
  } catch (err) {
    console.error("Error al insertar el usuario:", err);
    throw err;
  }
};


const actualizarUsuario = async (usuario) => {
  try {
    const pool = await connectDB();

    const result = await pool
      .request()
      .input("idUsuarios", mssql.Int, usuario.idUsuarios)
      .input("rol_idRol", mssql.Int, usuario.rol_idRol)
      .input("estados_idEstados", mssql.Int, usuario.estados_idEstados)
      .input("correo_electronico", mssql.NVarChar, usuario.correo_electronico)
      .input("nombre_completo", mssql.NVarChar, usuario.nombre_completo)
      .input("password", mssql.NVarChar, usuario.password)
      .input("telefono", mssql.NVarChar, usuario.telefono)
      .input("fecha_nacimiento", mssql.Date, usuario.fecha_nacimiento)
      .input("clientes_idClientes", mssql.Int, usuario.clientes_idClientes)
      .execute("ActualizarUsuarios");

    console.log("Resultado de ActualizarUsuarios:", result);

    return result.recordset;
  } catch (err) {
    console.error("Error al actualizar el usuario:", err);
    throw err;
  }
};



const getUsuarios = async () => {
  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .query("SELECT * FROM dbo.Vista_Usuarios");
     
    return result.recordset;
  } catch (err) {
    console.error("Error al obtener datos:", err);
    throw new Error("Error al obtener datos de la base de datos");
  }
};
export default { insertarUsuario, actualizarUsuario, getUsuarios };
