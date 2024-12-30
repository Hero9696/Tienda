import express from "express";
import froles from "../controllers/roleController.js";

const router = express.Router();

router.get("/api/obtenerroles", froles.obtenerRoles);

export default router;