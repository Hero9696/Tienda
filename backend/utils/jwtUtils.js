import jwt from "jsonwebtoken";

export const SECRET_KEY = "Hello_World";

const generarToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
};

const verificarToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error("Token inválido", err);
  }
};

export default { generarToken, verificarToken };
