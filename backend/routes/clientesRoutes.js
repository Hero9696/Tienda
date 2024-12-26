import express from "express";
import clientesController from "../controllers/clientesController.js";

const router = express.Router();

router.post("/api/insertarclientes", clientesController.insertarCliente);

router.put("/api/actualizarclientes", clientesController.actualizarCliente);

export default router;
