import verificarToken from "../utils/jwtUtils.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  

  
  if (!token) {
    return res.status(403).json({ error: 'Token requerido' });
  }

  try {
   
    const decoded = verificarToken(token);
    req.user = decoded; 
    next();  
  } catch (err) {
    
    res.status(403).json({ error: 'Token inválido', err });
  }
};

export default authMiddleware;  
