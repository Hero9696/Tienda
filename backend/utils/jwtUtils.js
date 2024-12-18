import jwt from "jsonwebtoken";

// Define la clave secreta directamente en este archivo
const SECRET_KEY = 'mi_secreto_super_seguro';

// Función para generar un token
const generarToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

// Función para verificar un token
const verificarToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error('Token inválido', err);
  }
};

export default { generarToken, verificarToken };
