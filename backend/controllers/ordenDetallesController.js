import mssql from "mssql"
import connectDB from "../db.js";

 
const crearOrdenDetalles = async (idUsuarios, detalles) => {
  try {
    const productosValidos = [];

    // Validar los productos
    for (const detalle of detalles) {
      // Verificar si el producto existe
      const producto = await verProductoPorId(detalle.idProductos); 
      if (producto.length > 0) {
        productosValidos.push({
          idProductos: detalle.idProductos,  
          cantidad: detalle.cantidad
        });
      } else {
        console.error(`Producto con ID ${detalle.idProductos} no encontrado`);
        return;  // Detener el proceso si algún producto no es válido
      }
    }

    // Conectar a la base de datos
    const pool = await connectDB();

    // Ejecutar el procedimiento almacenado en SQL Server
    const result = await pool
      .request()
      .input("idUsuarios", mssql.Int, idUsuarios)  // Pasar el id del usuario
      .input("detalles", mssql.NVarChar, JSON.stringify(productosValidos))  // Pasar detalles como JSON
      .execute("CrearOrdenDetalles");  // Nombre del procedimiento almacenado

    return result;  // Devolver el resultado de la ejecución

  } catch (err) {
    console.error("Error al crear la orden y sus detalles:", err);
    throw new Error("Error al crear la orden y sus detalles");
  }
};

const verProductoPorId = async (idProductos) => {
  try {
    // Conectar a la base de datos
    const pool = await connectDB();
    
    // Ejecutar el procedimiento almacenado 'VerProductoPorId' con el parámetro 'idProductos'
    const result = await pool
      .request()
      .input("idProductos", mssql.Int, idProductos)  // Parámetro de entrada
      .execute("VerProductoPorId");  // Nombre del procedimiento almacenado
    
    // Retornar los resultados de la consulta
    return result.recordset; // Devolver los resultados del producto encontrado

  } catch (err) {
    console.error("Error al obtener el producto:", err);
    throw new Error("Error al obtener el producto");
  }
};

  
  

 

const actualizarOrdenDetalles = async (idOrden, detalles) => {
  try {
    // Validar parámetros
    if (!idOrden || !Array.isArray(detalles) || detalles.length === 0) {
      throw new Error("Faltan parámetros: idOrden y detalles son necesarios.");
    }

    const pool = await connectDB();

    // Ejecutar el procedimiento de actualización
    const result = await pool
      .request()
      .input("idOrden", mssql.Int, idOrden) // Pasamos el id de la orden
      .input("detalles", mssql.NVarChar, JSON.stringify(detalles)) // Convertimos detalles a string JSON
      .execute("ActualizarOrdenDetalles"); // Nombre del procedimiento SQL

    // Comprobar resultados
    if (!result.recordset || result.recordset.length === 0) {
      throw new Error("No se encontraron resultados para la orden actualizada.");
    }

    return result.recordset; // Devolver los resultados de la orden actualizada
  } catch (err) {
    console.error("Error al actualizar los detalles de la orden:", err.message);
    throw new Error("Error al actualizar los detalles de la orden");
  }
};


const actualizarOrden = async (idOrden, direccion, idEstado) => {
  try {
    const pool = await connectDB();
  
    // Ejecutar el procedimiento de actualización
    const result = await pool
      .request()
      .input("idOrden", mssql.Int, idOrden)  // Pasar el id de la orden
      .input("direccion", mssql.NVarChar, direccion)  // Nueva dirección
      .input("idEstado", mssql.Int, idEstado)  // ID del estado (ahora es INT)
      .execute("ActualizarOrden");  // Nombre del procedimiento SQL
  
    return result.recordset;  // Devolver los resultados de la orden actualizada
  } catch (err) {
    console.error("Error al actualizar la orden:", err);
    throw new Error("Error al actualizar la orden");
  }
};



  export default {crearOrdenDetalles,actualizarOrdenDetalles,actualizarOrden};