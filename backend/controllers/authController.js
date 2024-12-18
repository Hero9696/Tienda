import mssql from "mssql";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import jwt_secret from "../utils/jwtUtils.js";
import  connectDB  from "../db.js"; // Asumí que tienes un archivo de conexión DB

// Controlador para iniciar sesión
const login = async (req, res) => {
  try {
    const { correo_electronico, password } = req.body;

    // Verificar que se haya enviado el correo y la contraseña
    if (!correo_electronico || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
    }

    // Conectar a la base de datos
    const pool = await connectDB();

    // Consultar al usuario en la base de datos por correo electrónico
    const result = await pool
      .request()
      .input("Correo", mssql.NVarChar, correo_electronico)
      .execute("BuscarUsuarioPorCorreo");

    const usuario = result.recordset[0]; // Obtener el primer usuario si existe

    if (!usuario) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña con bcrypt
    const contrasenaValida = await bcrypt.compare(password, usuario.password);
    if (!contrasenaValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Si la autenticación es exitosa, generamos un token JWT
    const payload = {
      idUsuarios: usuario.idUsuarios,
      correo_electronico: usuario.correo_electronico,
      nombre_completo: usuario.nombre_completo,
    };

    const token = jwt.sign(payload, jwt_secret, { expiresIn: '1h' });  // Genera el token con 1 hora de validez

    // Responde con el token
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

export default login;
