import fusuarios from "../models/usuarios.js";
import generarToken from "../utils/jwtUtils.js";
import bcrypt from "bcrypt";

const createUsuario = async (req, res) => {
  try {
    const usuario = req.body;

    // Hashea la contraseña
    const passwordHashed = await bcrypt.hash(usuario.password, 10);
    usuario.password = passwordHashed;

    // Llama a insertarUsuario y obtén el idUsuario
    const result = await fusuarios.insertarUsuario(usuario);
    console.log("Resultado de insertarUsuario:", result); // Depuración

    // Verifica que el idUsuario esté presente en el resultado
    const idUsuario = result.idUsuarios;
    if (!idUsuario) {
      throw new Error("No se pudo obtener el ID del usuario insertado.");
    }

    // Genera un token
    const token = generarToken.generarToken({
      idUsuarios: idUsuario,
      correo: usuario.correo_electronico,
    });

    // Responde con éxito
    res.status(201).json({ message: "Usuario registrado exitosamente", token, idUsuario });
  } catch (err) {
    console.error("Error en createUsuario:", err);
    res.status(500).json({ error: "Error al registrar el usuario", details: err.message });
  }
};



const updateUsuario = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({
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

export default { createUsuario, updateUsuario };
