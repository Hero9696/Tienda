import express from "express";
import clientesController from "../controllers/clientesController.js";
import authMiddleware from "../midlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/api/insertarclientes", clientesController.insertarCliente);

router.put("/api/actualizarclientes", clientesController.actualizarCliente);

export default router;
