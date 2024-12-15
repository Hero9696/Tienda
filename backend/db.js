import mssql from "mssql";
import dotenv from "dotenv";

dotenv.config();
const user = "sa";
const pass = "root96";
const dbConfig = {
  server: "localhost", // Cambia por el nombre o IP de tu servidor
  database: "GDA00278-OTMiguelPadilla", // Nombre de la base de datos
  options: {
    trustServerCertificate: true, // Esto evita problemas de certificados en entornos locales
  },
  port: 1434, // Puerto de SQL Server
  authentication: {
    type: "default",
    options: {
      userName: user, // O el usuario del sistema
      password: pass, // O la contraseña del sistema (si aplica)
    },
  },
};

// Función para conectar a la base de datos
async function connectDB() {
  try {
    const pool = await mssql.connect(dbConfig); // Conectar a SQL Server
    console.log("Conexión exitosa a SQL Server");
    return pool; // Retorna la conexión para que otros archivos la usen
  } catch (err) {
    console.error("Error al conectar a SQL Server:", err);
    throw err;
  }
}

export default connectDB;
