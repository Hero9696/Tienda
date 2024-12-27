import express from "express";
import fod from "../controllers/ordenDetallesController.js";
import authMiddleware from "../midlewares/authMiddleware.js";
const router = express.Router();

router.use(authMiddleware);

router.post("/api/insertarordendetalles", fod.insertarordendetalles);

router.put("/api/actualizarordendetalles", fod.actualizarOrdenDetalles);

router.put("/api/actualizarorden", fod.actualizarOrden);

export default router;
