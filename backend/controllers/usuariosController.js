import fusuarios from "../models/usuarios.js";
import fbcrypt from "../utils/bcryptutils.js";
import generarToken from "../utils/jwtUtils.js";

const createUsuario = async (req, res) => {
  try {
    const usuario = req.body;
    usuario.password = await fbcrypt.hashPassword(usuario.password);  // Hashear la contraseña
    const result = await fusuarios.insertarUsuario(usuario);
    
    // Generar el token JWT después de insertar el usuario
    const token = generarToken({ idUsuarios: result.recordset[0].idUsuarios, correo: usuario.correo_electronico });
    
    res.status(201).json({ message: 'Usuario registrado exitosamente', token, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const { idUsuarios, password, ...usuarioData } = req.body;
    if (!idUsuarios) {
      return res.status(400).json({ error: 'El campo idUsuarios es obligatorio' });
    }
    const hashedPassword = password ? await fbcrypt.hashPassword(password) : undefined;
    const usuario = { ...usuarioData, idUsuarios, password: hashedPassword };
    const result = await fusuarios.actualizarUsuario(usuario);
    res.status(200).json({ message: 'Usuario actualizado exitosamente', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

export default { createUsuario, updateUsuario };
