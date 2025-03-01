import express from "express";
import fod from "../controllers/ordenDetallesController.js";

const router = express.Router();


router.post("/api/insertarordendetalles", fod.insertarordendetalles);

router.put("/api/actualizarordendetalles", fod.actualizarOrdenDetalles);

router.put("/api/actualizarorden", fod.actualizarOrden);

router.post('/api/obtenerordendetalles', fod.obtenerOrdenDetalles);

router.delete("/api/eliminarorden/:idOrden", fod.eliminarOrdenDetalles);

router.get("/api/ordenes", fod.verOrdenes);

export default router;
