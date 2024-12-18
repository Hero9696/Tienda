import express from "express";
import fclientes from "../models/clientes.js";

const router = express.Router();

router.post("/api/insertarclientes", async (req, res) => {
    try {
      const cliente = req.body; 
      const result = await fclientes.insertarCliente(cliente);
      res.status(201).json({
        message: "Cliente insertado correctamente",
        data: result.recordset,
      });
    } catch (err) {
      res.status(500).json({ message: "Error al insertar cliente", error: err.message });
    }
  });


  router.put("/api/actualizarclientes", async (req, res) => {
    try {
      const { idClientes, razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body;
  
      
      if (!idClientes) {
        return res.status(400).json({ message: "El campo 'idClientes' es obligatorio." });
      }
  
      const cliente = { razon_social, nombre_comercial, direccion_entrega, telefono, email };
  
      const result = await fclientes.actualizarCliente(idClientes, cliente);
      res.status(200).json({
        message: "Cliente actualizado correctamente",
        data: result.recordset,
      });
    } catch (err) {
      res.status(500).json({ message: "Error al actualizar cliente", error: err.message });
    }
  });

  export default router;