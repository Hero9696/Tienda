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

    // Insertar el cliente y usuario con todos los campos
    const result = await pool
      .request()
      .input("razon_social", mssql.NVarChar, usuario.razon_social)
      .input("nombre_comercial", mssql.NVarChar, usuario.nombre_comercial)
      .input("direccion_entrega", mssql.NVarChar, usuario.direccion_entrega)
      .input("telefono", mssql.NVarChar, usuario.telefono)
      .input("email", mssql.NVarChar, usuario.email)
      .input("rol_idRol", mssql.Int, usuario.rol_idRol)
      .input("estados_idEstados", mssql.Int, usuario.estados_idEstados)
      .input("correo_electronico", mssql.NVarChar, usuario.correo_electronico)
      .input("nombre_completo", mssql.NVarChar, usuario.nombre_completo)
      .input("password", mssql.NVarChar, usuario.password)
      .input("telefono_usuario", mssql.NVarChar, usuario.telefono_usuario)
      .input("fecha_nacimiento", mssql.Date, usuario.fecha_nacimiento)
      .input("direccion", mssql.NVarChar, usuario.direccion) // Nueva entrada
      .execute("RegistrarClienteYUsuario");

    console.log("Resultado de RegistrarClienteYUsuario:", result);

    // Obtener el ID del cliente insertado
    if (result.recordset && result.recordset.length > 0) {
      const idCliente = result.recordset[0].idCliente;
      return { idCliente }; // Devolver solo el ID del cliente
    } else {
      throw new Error("No se obtuvo el ID del cliente.");
    }
  } catch (err) {
    console.error("Error al insertar el usuario:", err);
    throw err;
  }
};


const actualizarUsuario = async (usuario, idUsuario) => {
  try {
    const pool = await connectDB();

    const result = await pool
      .request()
      .input("idUsuario", mssql.Int, idUsuario)
      .input("razon_social", mssql.NVarChar, usuario.razon_social)
      .input("nombre_comercial", mssql.NVarChar, usuario.nombre_comercial)
      .input("direccion_entrega", mssql.NVarChar, usuario.direccion_entrega)
      .input("telefono", mssql.NVarChar, usuario.telefono)
      .input("correo_electronico", mssql.NVarChar, usuario.correo_electronico)
      .input("rol_idRol", mssql.Int, usuario.rol_idRol)
      .input("estados_idEstados", mssql.Int, usuario.estados_idEstados)
      .input("nombre_completo", mssql.NVarChar, usuario.nombre_completo)
      .input("password", mssql.NVarChar, usuario.password)
      .input("telefono_usuario", mssql.NVarChar, usuario.telefono_usuario)
      .input("fecha_nacimiento", mssql.Date, usuario.fecha_nacimiento)
      .execute("ActualizarUsuarioYCliente");

    console.log("Resultado de ActualizarUsuarioYCliente:", result);

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
