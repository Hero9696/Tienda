import mssql from 'mssql';
import connectDB from '../db.js';

// Función para obtener los datos de productos activos con stock
const getProductosActivosConStock = async () => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query('SELECT * FROM dbo.Vista_ProductosActivosConStock');
    return result.recordset;
  } catch (err) {
    console.error('Error al obtener datos:', err);
    throw new Error('Error al obtener datos de la base de datos');
  }
};


// Función para insertar un producto
const insertarProducto = async (producto) => {
  try {
    const pool = await connectDB(); // Asegúrate de invocar connectDB para obtener el pool
    const result = await pool.request()
      .input('categoriaProductos_idCategoriaProductos', mssql.Int, producto.categoriaProductos_idCategoriaProductos)
      .input('usuarios_idUsuarios', mssql.Int, producto.usuarios_idUsuarios)
      .input('nombre', mssql.NVarChar, producto.nombre)
      .input('marca', mssql.NVarChar, producto.marca)
      .input('codigo', mssql.NVarChar, producto.codigo)
      .input('stock', mssql.Int, producto.stock)
      .input('estados_idEstados', mssql.Int, producto.estados_idEstados)
      .input('precio', mssql.Float, producto.precio)
      .input('foto', mssql.NVarChar, producto.foto)
      .execute('InsertarProductos');
    return result; // El resultado de la ejecución del procedimiento almacenado
  } catch (err) {
    console.error('Error al insertar el producto:', err);
    throw new Error('Error al insertar el producto');
  }
};

export { getProductosActivosConStock, insertarProducto };
