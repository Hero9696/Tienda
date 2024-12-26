import fcategorias from "../models/categorias.js";

const catergoriasActivas= async (req, res) => {
    try {
        const getCategorias = await fcategorias.getCategoriasActivas();
        if (getCategorias.length === 0) {
          return res.status(404).send("No se encontraron categorías activas.");
        }
        res.json(getCategorias);
      } catch (err) {
        console.error("Error al obtener las categorías activas:", err);
        res.status(500).send("Error al obtener las categorías activas");
      }
    }

    const insertarCategorias = async (req, res) => {
      const { usuarios_idUsuarios, estados_idEstados, nombre } = req.body;
    
      if (!usuarios_idUsuarios || !estados_idEstados || !nombre) {
        return res.status(400).json({
          error: "Todos los campos son obligatorios.",
        });
      }
    
      try {
        const resultado = await fcategorias.insertarCategoria({
          usuarios_idUsuarios,
          estados_idEstados,
          nombre,
        });
        res
          .status(201)
          .json({
            mensaje: "Categoría insertada correctamente",
            datos: resultado.recordset,
          });
      } catch (error) {
        res
          .status(500)
          .json({
            error: "Error interno del servidor al insertar la categoría.",
            detalles: error.message,
          });
      }
    };

    const actualizarCategorias =async (req, res) => {
        const {
          idCategoriaProductos,
          usuarios_idUsuarios,
          estados_idEstados,
          nombre,
        } = req.body;
      
        if (
          !idCategoriaProductos ||
          !usuarios_idUsuarios ||
          !estados_idEstados ||
          !nombre
        ) {
          return res.status(400).json({
            error: "Todos los campos son obligatorios.",
          });
        }
      
        try {
          const resultado = await fcategorias.actualizarCategoria({
            idCategoriaProductos,
            usuarios_idUsuarios,
            estados_idEstados,
            nombre,
          });
          res
            .status(200)
            .json({
              mensaje: "Categoría actualizada correctamente",
              datos: resultado.recordset,
            });
        } catch (error) {
          res
            .status(500)
            .json({
              error: "Error interno del servidor al actualizar la categoría.",
              detalles: error.message,
            });
        }
      }


export default { catergoriasActivas, insertarCategorias, actualizarCategorias };