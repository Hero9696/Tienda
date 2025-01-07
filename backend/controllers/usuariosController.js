import fusuarios from "../models/usuarios.js";
import generarToken from "../utils/jwtUtils.js";
import bcrypt from "bcrypt";
const createUsuario = async (req, res) => {
  try {
    const usuario = req.body;

    // Encriptar la contraseña antes de insertarla
    const passwordHashed = await bcrypt.hash(usuario.password, 10);
    usuario.password = passwordHashed;

    // Insertar el usuario y el cliente en la base de datos
    const result = await fusuarios.insertarUsuario(usuario);
   

    // Obtener el ID del cliente (y no del usuario, ya que se genera en el procedimiento almacenado)
    const idCliente = result.idCliente;
    if (!idCliente) {
      throw new Error("No se pudo obtener el ID del cliente insertado.");
    }

    // Generar un token JWT para el usuario
    const token = generarToken.generarToken({
      idClientes: idCliente,  // Cambiar a idClientes en lugar de idUsuarios
      correo: usuario.correo_electronico,
    });

    // Responder al cliente con el mensaje de éxito y el token
    res.status(201).json({ message: "Usuario registrado exitosamente", token, idCliente });
  } catch (err) {
    console.error("Error en createUsuario:", err);
    res.status(500).json({ error: "Error al registrar el usuario", details: err.message });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        error: "No se recibió ningún dato en el cuerpo de la solicitud",
      });
    }

    const {
      idUsuarios,
      razon_social,
      nombre_comercial,
      direccion_entrega,
      telefono,
      correo_electronico,
      rol_idRol,
      estados_idEstados,
      nombre_completo,
      password,
      telefono_usuario,
      fecha_nacimiento,
    } = req.body;

    if (!idUsuarios) {
      return res.status(400).json({ error: "El campo idUsuarios es obligatorio" });
    }

    // Verificar que los campos obligatorios estén presentes
    if (
      !razon_social ||
      !nombre_comercial ||
      !direccion_entrega ||
      !telefono ||
      !correo_electronico ||
      !rol_idRol ||
      !estados_idEstados ||
      !nombre_completo ||
      !telefono_usuario ||
      !fecha_nacimiento
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    // Crear objeto para actualizar el usuario
    const usuario = {
      idUsuarios,
      razon_social,
      nombre_comercial,
      direccion_entrega,
      telefono,
      correo_electronico,
      rol_idRol,
      estados_idEstados,
      nombre_completo,
      password: hashedPassword,
      telefono_usuario,
      fecha_nacimiento,
    };

    // Llamar a la función que actualiza el usuario y el cliente
    const result = await fusuarios.actualizarUsuario(usuario);

    // Verificar si el resultado tiene éxito
    if (result && result.recordset) {
      res.status(200).json({ message: "Usuario y cliente actualizados exitosamente", result });
    } else {
      res.status(500).json({ error: "No se pudo actualizar el usuario o el cliente" });
    }
  } catch (err) {
    console.error("Error al actualizar el usuario:", err);
    res.status(500).json({ error: "Error al actualizar el usuario", details: err.message });
  }
};


const usuarios = async (req, res) => {
  try {
    const productos = await fusuarios.getUsuarios();
    if (productos.length === 0) {
      return res.status(404).send("No se encontraron datos.");
    }
    res.json(productos);
  } catch (err) {
    console.error("Error al obtener datos:", err);
    res.status(500).send("Error al conectar a la base de datos");
  }
}

export default { createUsuario, actualizarUsuario,  usuarios };
