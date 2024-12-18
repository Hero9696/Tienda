import mssql from "mssql";
import connectDB from "../db.js";

const insertarCliente = async (cliente) => {
    try {
      const pool = await connectDB(); // Conectar a la base de datos
      const result = await pool
        .request()
        .input("razon_social", mssql.NVarChar, cliente.razon_social)
        .input("nombre_comercial", mssql.NVarChar, cliente.nombre_comercial)
        .input("direccion_entrega", mssql.NVarChar, cliente.direccion_entrega)
        .input("telefono", mssql.NVarChar, cliente.telefono)
        .input("email", mssql.NVarChar, cliente.email)
        .execute("InsertarClientes");
      return result; 
    } catch (err) {
      console.error("Error al insertar el cliente:", err);
      throw new Error("Error al insertar el cliente");
    }
  };

  const actualizarCliente = async (idClientes, cliente) => {
    try {
      const pool = await connectDB(); // Conectar a la base de datos
      const result = await pool
        .request()
        .input("idClientes", mssql.Int, idClientes) // ID del cliente a actualizar
        .input("razon_social", mssql.NVarChar, cliente.razon_social)
        .input("nombre_comercial", mssql.NVarChar, cliente.nombre_comercial)
        .input("direccion_entrega", mssql.NVarChar, cliente.direccion_entrega)
        .input("telefono", mssql.NVarChar, cliente.telefono)
        .input("email", mssql.NVarChar, cliente.email)
        .execute("ActualizarClientes");
      return result; 
    } catch (err) {
      console.error("Error al actualizar el cliente:", err);
      throw new Error("Error al actualizar el cliente");
    }
  };
  
  

  export default {insertarCliente, actualizarCliente}