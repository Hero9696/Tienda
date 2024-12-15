import mssql from 'mssql';

// Configuración de la conexión a la base de datos
const dbConfig = {
  server: 'localhost',
  database: 'GDA00278-OTMiguelPadilla',
  options: {
    trustServerCertificate: true,
  },
  port: 1434,
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: 'root96',
    },
  },
};

// Creación de pool de conexiones
const poolPromise = new mssql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => pool)
  .catch(err => console.error('Error al conectar a la base de datos:', err));



// Función para obtener las categorías activas
const getCategoriasActivas = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.Vista_CategoriaProductosActivas');
    return result.recordset;  // Devuelve los resultados de la vista
  } catch (err) {
    console.error('Error al obtener las categorías activas:', err);
    throw new Error('Error al obtener las categorías activas de la base de datos');
  }
};


export {getCategoriasActivas };
