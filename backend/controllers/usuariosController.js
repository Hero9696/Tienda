import fusuarios from "../models/usuarios.js";
import generarToken from "../utils/jwtUtils.js";
import bcrypt from "bcrypt"

const createUsuario = async (req, res) => {
  try {
    const usuario = req.body;

    // Hashear la contraseña usando bcrypt
    const passwordHashed = await bcrypt.hash(usuario.password, 10);  // Usamos bcrypt.hash para generar el hash de la contraseña
    usuario.password = passwordHashed;  // Asignamos la contraseña hasheada al usuario

    // Insertar usuario en la base de datos
    const result = await fusuarios.insertarUsuario(usuario);  // Inserta el usuario

    // Generar el token JWT después de insertar el usuario
    const token = generarToken({
      idUsuarios: result.recordset[0].idUsuarios,  // Asegúrate de que el idUsuarios esté disponible en el resultado
      correo: usuario.correo_electronico
    });

    // Responder con el token y el resultado de la inserción
    res.status(201).json({ message: 'Usuario registrado exitosamente', token, result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar el usuario', err });
  }
};

const updateUsuario = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'No se recibió ningún dato en el cuerpo de la solicitud' });
    }

    const { idUsuarios, nombre_completo, telefono, password } = req.body;

    if (!idUsuarios) {
      return res.status(400).json({ error: 'El campo idUsuarios es obligatorio' });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const usuario = { idUsuarios, nombre_completo, telefono, password: hashedPassword };

    const result = await fusuarios.actualizarUsuario(usuario);
    res.status(200).json({ message: 'Usuario actualizado exitosamente', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};


export default { createUsuario, updateUsuario };
