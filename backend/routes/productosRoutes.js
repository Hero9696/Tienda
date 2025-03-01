import express from "express";
import fproductos from "../controllers/productosController.js";


const router = express.Router();

router.get("/api/productos", fproductos.verProductos);

router.get("/api/verproductos", fproductos.productos);

router.post("/api/insertarProducto", fproductos.insertarProducto);

router.put("/api/actualizarProducto", fproductos.actualizarProducto);

export default router;
