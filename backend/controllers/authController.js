import mssql from "mssql";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {SECRET_KEY} from "../utils/jwtUtils.js";
import connectDB from "../db.js";

const login = async (req, res) => {
  try {
    const { correo_electronico, password } = req.body;

    if (!correo_electronico || !password) {
      return res
        .status(400)
        .json({ error: "Correo y contraseña son requeridos" });
    }

    const pool = await connectDB();

    const result = await pool
      .request()
      .input("Correo", mssql.NVarChar, correo_electronico)
      .execute("BuscarUsuarioPorCorreo");
      console.log(result);

    const usuario = result.recordset[0];

    if (!usuario) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const contrasenaValida = await bcrypt.compare(password, usuario.password);
    if (!contrasenaValida) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const rol = usuario.rol_idRol;
    console.log(rol)

    if (!rol) {
      return res.status(500).json({ error: "Rol no encontrado" });
    }

    const payload = {
      idUsuarios: usuario.idUsuarios,
      correo_electronico: usuario.correo_electronico,
      nombre_completo: usuario.nombre_completo,
      rol,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

export default login;
