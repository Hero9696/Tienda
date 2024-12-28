import express from "express";
import login from "../controllers/authController.js";
import fuscontroller from "../controllers/usuariosController.js";
import fusuarios from "../models/usuarios.js";
import cors from "cors";

const router = express.Router();

router.use(cors());

router.post("/api/insertarusuarios", fuscontroller.createUsuario);

router.put("/api/actualizarusuarios",fusuarios.actualizarUsuario);

router.post("/api/iniciarsesion", login);

export default router;
