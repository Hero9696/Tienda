import express from "express";
import authMiddleware from "../midlewares/authMiddleware.js";  
const router = express.Router();


router.get('/perfil', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Acceso permitido', user: req.user });
});

export default router;
