import mssql from "mssql";
import connectDB from "../db.js";
import bcrypt from "bcrypt";

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
    }
  };

  const actualizarUsuario = async (req, res) => {
    try {
      // Obtener los parámetros desde el cuerpo de la solicitud
      const {
        idUsuarios,
        rol_idRol,
        estados_idEstados,
        correo_electronico,
        nombre_completo,
        password,
        telefono,
        fecha_nacimiento,
        clientes_idClientes
      } = req.body;
  
      // Validar que se hayan recibido todos los campos necesarios
      if (!idUsuarios || !rol_idRol || !estados_idEstados || !correo_electronico || !nombre_completo || 
          !password || !telefono || !fecha_nacimiento || !clientes_idClientes) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }
  
      // Conectar a la base de datos
      const pool = await connectDB();
  
      // Encriptar la nueva contraseña antes de actualizarla
      const passwordEncriptada = await bcrypt.hash(password, 10);
  
      // Actualizar usuario en la base de datos
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
  
      // Verificar si la actualización fue exitosa
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Responder con un mensaje de éxito
      res.status(200).json({ message: 'Usuario actualizado correctamente' });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar usuario' });
    }
  };
  
  

  

export default { insertarUsuario, actualizarUsuario, };
