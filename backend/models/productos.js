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

// Función para obtener los datos de productos activos con stock
const getProductosActivosConStock = async () => {
  try {
    await mssql.connect(dbConfig);
    const result = await mssql.query('SELECT * FROM dbo.Vista_ProductosActivosConStock');
    return result.recordset;
  } catch (err) {
    console.error('Error al obtener datos:', err);
    throw new Error('Error al obtener datos de la base de datos');
  }
};

export { getProductosActivosConStock };
