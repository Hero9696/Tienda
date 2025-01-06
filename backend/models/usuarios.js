import mssql from "mssql";
import connectDB from "../db.js";
import bcrypt from "bcrypt";
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



const actualizarUsuario = async (req, res) => {
  try {
    const {
      idUsuarios,
      rol_idRol,
      estados_idEstados,
      correo_electronico,
      nombre_completo,
      password,
      telefono,
      fecha_nacimiento,
      clientes_idClientes,
    } = req.body;

    if (
      !idUsuarios ||
      !rol_idRol ||
      !estados_idEstados ||
      !correo_electronico ||
      !nombre_completo ||
      !password ||
      !telefono ||
      !fecha_nacimiento ||
      !clientes_idClientes
    ) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const pool = await connectDB();

    const passwordEncriptada = await bcrypt.hash(password, 10);

    const result = await pool
      .request()
      .input("idUsuarios", mssql.Int, idUsuarios)
      .input("rol_idRol", mssql.Int, rol_idRol)
      .input("estados_idEstados", mssql.Int, estados_idEstados)
      .input("correo_electronico", mssql.NVarChar, correo_electronico)
      .input("nombre_completo", mssql.NVarChar, nombre_completo)
      .input("password", mssql.NVarChar, passwordEncriptada)
      .input("telefono", mssql.NVarChar, telefono)
      .input("fecha_nacimiento", mssql.Date, fecha_nacimiento)
      .input("clientes_idClientes", mssql.Int, clientes_idClientes)
      .execute("ActualizarUsuarios");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar usuario" });
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
