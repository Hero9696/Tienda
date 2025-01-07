import express from "express";
import login from "../controllers/authController.js";
import fuscontroller from "../controllers/usuariosController.js";


const router = express.Router();

router.get("/api/verusuarios", fuscontroller.usuarios);

router.post("/api/insertarusuarios", fuscontroller.createUsuario);

router.put("/api/actualizarusuarios",fuscontroller.actualizarUsuario);

router.post("/api/iniciarsesion", login);

export default router;
