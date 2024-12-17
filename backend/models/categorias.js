import mssql from 'mssql';
import connectDB from "../db.js";


const getCategoriasActivas = async () => {
  try {
    const pool = await connectDB(); 
    const result = await pool
      .request()
      .query("SELECT * FROM dbo.Vista_CategoriaProductosActivas");
    return result.recordset; 
  } catch (err) {
    console.error("Error al obtener las categorías activas:", err);
    throw new Error(
      "Error al obtener las categorías activas de la base de datos"
    );
  }
};


const insertarCategoria = async (categoria) => {
  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("usuarios_idUsuarios", mssql.Int, categoria.usuarios_idUsuarios) 
      .input("estados_idEstados", mssql.Int, categoria.estados_idEstados)     
      .input("nombre", mssql.NVarChar, categoria.nombre)                      
      .execute("InsertarCategoriaProductos");                               
    return result; 
  } catch (err) {
    console.error("Error al insertar la categoría:", err);
    throw new Error("Error al insertar la categoría");
  }
};



const actualizarCategoria = async (categoria) => {
  try {
    const pool = await connectDB(); // Conexión a la base de datos
    const result = await pool
      .request()
      .input("idCategoriaProductos", mssql.Int, categoria.idCategoriaProductos)
      .input("usuarios_idUsuarios", mssql.Int, categoria.usuarios_idUsuarios)   
      .input("estados_idEstados", mssql.Int, categoria.estados_idEstados)      
      .input("nombre", mssql.NVarChar, categoria.nombre)                        
      .execute("ActualizarCategoriaProductos");                                 
    return result;
  } catch (err) {
    console.error("Error al actualizar la categoría:", err);
    throw new Error("Error al actualizar la categoría");
  }
};




export default { getCategoriasActivas, insertarCategoria, actualizarCategoria  };
