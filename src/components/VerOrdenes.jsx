import  { useEffect, useState } from 'react';
import axios from 'axios';

const VerOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ordenes'); // Cambia la URL según tu configuración de backend
        setOrdenes(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Error al obtener los datos.",err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenes();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Ordenes</h1>
      <table>
        <thead>
          <tr>
            <th>ID Orden</th>
            <th>Estado De La Compra</th>
            <th>Nombre Del Cliente</th>
            <th>Precio</th>
            <th>Total</th>
            {/* Agrega más columnas según los datos de la vista */}
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden.idOrden}>
              <td>{orden.idOrden}</td>
              <td>{orden.estado_nombre}</td>
              <td>{orden.usuario_nombre_completo}</td>
              <td>{orden.total_orden}</td>
              <td>{orden.cantidad}</td>
              {/* Agrega más celdas según los datos de la vista */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerOrdenes;
