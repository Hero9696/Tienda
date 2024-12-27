import express from "express";
import estadosController from "../controllers/estadosController.js";
import authMiddleware from "../midlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/api/insertarestados", estadosController.insertarEstado);

router.put("/api/actualizarestados", estadosController.actualizarEstado);

export default router;
