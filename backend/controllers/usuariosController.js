import fusuarios from "../models/usuarios.js";
import generarToken from "../utils/jwtUtils.js";
import bcrypt from "bcrypt";
const createUsuario = async (req, res) => {
  try {
    const usuario = req.body;

    // Encriptar la contraseña antes de insertarla
    const passwordHashed = await bcrypt.hash(usuario.password, 10);
    usuario.password = passwordHashed;

    // Insertar el usuario en la base de datos (usando la función insertarUsuario)
    const result = await fusuarios.insertarUsuario(usuario);

    // Obtener el ID del usuario insertado
    const idUsuario = result.idUsuario;
    if (!idUsuario) {
      throw new Error("No se pudo obtener el ID del usuario insertado.");
    }

    // Generar un token JWT para el usuario
    const token = generarToken.generarToken({
      idUsuarios: idUsuario,  // Cambiar a idUsuarios en lugar de idClientes
      correo: usuario.correo_electronico,
    });

    // Responder al cliente con el mensaje de éxito y el token
    res.status(201).json({ message: "Usuario registrado exitosamente", token, idUsuario });
  } catch (err) {
    console.error("Error en createUsuario:", err);
    res.status(500).json({ error: "Error al registrar el usuario", details: err.message });
  }
};

const actualizarUsuario = async (req, res) => {
  const usuario = req.body;

  try {
    const result = await fusuarios.actualizarUsuario({ ...usuario });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
