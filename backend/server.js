import express from "express";
import cors from "cors";
import productosRoutes from "./routes/productosRoutes.js";
import categoriasRoutes from "./routes/categoriasRoutes.js";
import estadosRoutes from "./routes/estadosRoutes.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Usar las rutas importadas
app.use(productosRoutes);
app.use(categoriasRoutes);
app.use(estadosRoutes);

// INICIANDO SERVIDOR
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
