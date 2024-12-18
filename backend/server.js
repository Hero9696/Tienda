import express from "express";
import cors from "cors";
import productosRoutes from "./routes/productosRoutes.js";
import categoriasRoutes from "./routes/categoriasRoutes.js";
import estadosRoutes from "./routes/estadosRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js"
import clientesRoutes from "./routes/clientesRoutes.js"

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use(productosRoutes);
app.use(categoriasRoutes);
app.use(estadosRoutes);
app.use(usuarioRoutes);
app.use(clientesRoutes);


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
