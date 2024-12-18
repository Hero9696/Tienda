import mssql from "mssql";
import connectDB from "../db.js";

const insertarUsuario = async (usuario) => {
    try {
      const pool = await connectDB();
  
      // Verificar si el correo ya está registrado
      const resultBusqueda = await pool
        .request()
        .input("Correo", mssql.NVarChar, usuario.correo_electronico)
        .execute("BuscarUsuarioPorCorreo");
  
      if (resultBusqueda.recordset.length > 0) {
        throw new Error("El correo electrónico ya está registrado.");
      }
  
      // Si el correo no está registrado, proceder con la inserción
      const result = await pool
        .request()
        .input("rol_idRol", mssql.Int, usuario.rol_idRol)
        .input("estados_idEstados", mssql.Int, usuario.estados_idEstados)
        .input("correo_electronico", mssql.NVarChar, usuario.correo_electronico)
        .input("nombre_completo", mssql.NVarChar, usuario.nombre_completo)
        .input("password", mssql.NVarChar, usuario.password)
        .input("telefono", mssql.NVarChar, usuario.telefono)
        .input("fecha_nacimiento", mssql.Date, usuario.fecha_nacimiento)
        .input("clientes_idClientes", mssql.Int, usuario.clientes_idClientes)
        .execute("InsertarUsuarios");
  
      return result;
    } catch (err) {
      console.error("Error al insertar el usuario:", err);
      throw new Error("Error al insertar el usuario");
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
    return result;
  } catch (err) {
    console.error("Error al actualizar el usuario:", err);
    throw new Error("Error al actualizar el usuario");
  }
};


  

export default { insertarUsuario, actualizarUsuario, };
