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
    console.log("Resultado de insertarUsuario:", result);

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


const updateUsuario = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        error: "No se recibió ningún dato en el cuerpo de la solicitud",
      });
    }

    const { idUsuarios, nombre_completo, telefono, password } = req.body;

    if (!idUsuarios) {
      return res
        .status(400)
        .json({ error: "El campo idUsuarios es obligatorio" });
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;
    const usuario = {
      idUsuarios,
      nombre_completo,
      telefono,
      password: hashedPassword,
    };

    const result = await fusuarios.actualizarUsuario(usuario);
    res
      .status(200)
      .json({ message: "Usuario actualizado exitosamente", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar el usuario" });
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

export default { createUsuario, updateUsuario,  usuarios };
