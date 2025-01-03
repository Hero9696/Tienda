import express from "express";
import fod from "../controllers/ordenDetallesController.js";

const router = express.Router();


router.post("/api/insertarordendetalles", fod.insertarordendetalles);

router.put("/api/actualizarordendetalles", fod.actualizarOrdenDetalles);

router.put("/api/actualizarorden", fod.actualizarOrden);

router.post('/obtenerordendetalles', fod.obtenerOrdenDetalles);

export default router;
