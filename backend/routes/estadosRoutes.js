import express from "express";
import estadosController from "../controllers/estadosController.js";


const router = express.Router();



router.post("/api/insertarestados", estadosController.insertarEstado);

router.put("/api/actualizarestados", estadosController.actualizarEstado);

router.get("/api/estados", estadosController.estados);

export default router;
