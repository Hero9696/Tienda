import express from "express";
import categoriasController  from "../controllers/categoriasController.js";
import authMiddleware from "../midlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/api/categorias/activas", categoriasController.catergoriasActivas);

router.post("/api/insertarcategorias", categoriasController.insertarCategorias);

router.put("/api/actualizarcategorias", categoriasController.actualizarCategorias);

export default router;
