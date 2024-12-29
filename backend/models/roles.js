import connectDB from "../db.js";


const obtenerRoles = async () => {
    try {
      const pool = await connectDB(); // Asumiendo que connectDB() establece la conexión con la base de datos
      const result = await pool
        .request()
        .execute("ObtenerRoles"); // Llamamos al procedimiento creado para obtener los roles
  //console.log(result);
      // Verificar si se obtuvieron resultados
      if (result.recordset.length > 0) {
        return result.recordset; // Devuelve los roles encontrados
      } else {
        throw new Error("No se encontraron roles.");
      }
    } catch (err) {
      console.error("Error al obtener los roles:", err);
      return null;
    }
  };
  
  export default { obtenerRoles };