import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import productosRoutes from "./routes/productosRoutes.js";
import categoriasRoutes from "./routes/categoriasRoutes.js";
import estadosRoutes from "./routes/estadosRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import ordenDetallesRoutes from "./routes/ordenDetallesRoutes.js"

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());


app.use(usuarioRoutes);
app.use(productosRoutes);
app.use(categoriasRoutes);
app.use(estadosRoutes);
app.use(clientesRoutes);
app.use(ordenDetallesRoutes);

app.use((req, res) => {
  res.redirect("/api/iniciarsesion"); 
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
