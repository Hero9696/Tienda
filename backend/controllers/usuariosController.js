import fusuarios from "../models/usuarios.js";
import generarToken from "../utils/jwtUtils.js";
import bcrypt from "bcrypt"

const createUsuario = async (req, res) => {
  try {
    const usuario = req.body;

   
    const passwordHashed = await bcrypt.hash(usuario.password, 10);  
    usuario.password = passwordHashed;  

    
    const result = await fusuarios.insertarUsuario(usuario); 

    
    const token = generarToken({
      idUsuarios: result.recordset[0].idUsuarios,  
      correo: usuario.correo_electronico
    });

   
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
