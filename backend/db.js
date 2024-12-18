import mssql from "mssql";
import dotenv from "dotenv";

dotenv.config();
const user = "sa";
const pass = "root96";
const dbConfig = {
  server: "localhost",
  database: "GDA00278-OTMiguelPadilla",
  options: {
    trustServerCertificate: true,
  },
  port: 1434,
  authentication: {
    type: "default",
    options: {
      userName: user,
      password: pass,
    },
  },
};

async function connectDB() {
  try {
    const pool = await mssql.connect(dbConfig);
    console.log("Conexión exitosa a SQL Server");
    return pool;
  } catch (err) {
    console.error("Error al conectar a SQL Server:", err);
    throw err;
  }
}

export default connectDB;
