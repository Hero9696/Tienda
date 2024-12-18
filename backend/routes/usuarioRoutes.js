import express from "express";
import login from "../controllers/authController.js"
import fuscontroller from "../controllers/usuariosController.js";
import fusuarios from "../models/usuarios.js"

const router = express.Router();

// Ruta para insertar un usuario
router.post('/api/insertarusuarios', fuscontroller.createUsuario );


  // Ruta para actualizar un usuario
  router.put('/api/actualizarusuarios',  fusuarios.actualizarUsuario);

  router.post('/api/iniciarsesion', login );
  
  

  export default router;