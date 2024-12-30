import froles from "../models/roles.js";
const obtenerRoles = async (req, res) => {
    try {
      const roles = await froles.obtenerRoles();
      if (roles) {
        res.status(200).json(roles); 
      } else {
        res.status(404).json({ message: "No se encontraron roles." });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los roles.", error });
    }
  };

  export default { obtenerRoles };