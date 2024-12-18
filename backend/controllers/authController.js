import mssql from "mssql";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import jwt_secret from "../utils/jwtUtils.js";
import  connectDB  from "../db.js"; 


const login = async (req, res) => {
  try {
    const { correo_electronico, password } = req.body;

    
    if (!correo_electronico || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
    }

   
    const pool = await connectDB();

    
    const result = await pool
      .request()
      .input("Correo", mssql.NVarChar, correo_electronico)
      .execute("BuscarUsuarioPorCorreo");

    const usuario = result.recordset[0]; 

    if (!usuario) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    
    const contrasenaValida = await bcrypt.compare(password, usuario.password);
    if (!contrasenaValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    
    const payload = {
      idUsuarios: usuario.idUsuarios,
      correo_electronico: usuario.correo_electronico,
      nombre_completo: usuario.nombre_completo,
    };

    const token = jwt.sign(payload, jwt_secret, { expiresIn: '1h' });  

    
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

export default login;
