import connectDB from "../db.js";


const obtenerRoles = async () => {
  try {
    const pool = await connectDB(); 
    const result = await pool
      .request()
      .query("SELECT * FROM dbo.VistaRoles"); 
    console.log(result);
    
    if (result.recordset.length > 0) {
      return result.recordset; 
    } else {
      throw new Error("No se encontraron roles.");
    }
  } catch (err) {
    console.error("Error al obtener los roles:", err);
    return null;
  }
};

  
  export default { obtenerRoles };