
import connectDB from '../db.js';  // Asegúrate de importar correctamente la conexión

// Función para obtener las categorías activas
const getCategoriasActivas = async () => {
  try {
    const pool = await connectDB();  // Asegúrate de invocar connectDB() para obtener el pool de conexiones
    const result = await pool.request().query('SELECT * FROM dbo.Vista_CategoriaProductosActivas');
    console.log(result.recordset);  // Verifica que los datos están siendo obtenidos correctamente
    return result.recordset;  // Devuelve los resultados de la consulta
  } catch (err) {
    console.error('Error al obtener las categorías activas:', err);
    throw new Error('Error al obtener las categorías activas de la base de datos');
  }
};

export { getCategoriasActivas };
