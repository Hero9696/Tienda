import express from "express";
import froles from "../models/roles.js";

const router = express.Router();

router.get("/api/obtenerroles", froles.obtenerRoles);

export default router;