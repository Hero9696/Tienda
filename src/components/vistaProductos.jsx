import { useEffect, useState } from "react";
import axios from "axios";

const Vista = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/datos")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError("Error al obtener los datos");
        console.error(err);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Obteniendo Datos</h1>

      <div className="registro">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="contenedor">
              <p>
                <img src={item.foto} alt="" />
              </p>
              <p>
                <strong>Nombre:</strong> {item.nombre}
              </p>
              <p>
                <strong>Marca:</strong> {item.marca}
              </p>
              <p>
                <strong>Cantidad:</strong> {item.stock}
              </p>
              <p>
                <strong>Precio:</strong> Q{item.precio}
              </p>
            </div>
          ))
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
};

export default Vista;
