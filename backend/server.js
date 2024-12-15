// server.js

import express from 'express';
import cors from 'cors';  // Si quieres permitir solicitudes desde tu frontend React
import { getProductosActivosConStock } from './models/productoModel.js';

const app = express();
const port = 5000;

// Habilitar CORS para permitir solicitudes desde React
app.use(cors());

// Ruta para obtener los datos de la base de datos usando el modelo
app.get('/api/datos', async (req, res) => {
  try {
    const productos = await getProductosActivosConStock();  // Llamamos al modelo para obtener los productos
    if (productos.length === 0) {
      return res.status(404).send('No se encontraron datos.');
    }
    res.json(productos);
  } catch (err) {
    console.error('Error al obtener datos:', err);
    res.status(500).send('Error al conectar a la base de datos');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
