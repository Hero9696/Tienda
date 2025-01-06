import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';

const VerOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ordenes');
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

  const handleChange = (e, idOrden) => {
    const { name, value } = e.target;
    setOrdenes(prevOrdenes =>
      prevOrdenes.map(orden =>
        orden.idOrden === idOrden ? { ...orden, [name]: value } : orden
      )
    );
  };

  const handleSave = async (idOrden) => {
    const ordenToUpdate = ordenes.find(orden => orden.idOrden === idOrden);
    try {
      await axios.put(`http://localhost:5000/api/ordenes/${idOrden}`, ordenToUpdate);
      alert('Orden actualizada');
    } catch (err) {
      alert('Error al actualizar la orden',err);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Ordenes</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Orden</TableCell>
              <TableCell>Estado De La Compra</TableCell>
              <TableCell>Nombre Del Cliente</TableCell>
              <TableCell>Dirección De Entrega</TableCell>
              <TableCell>Total De La Compra</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordenes.map((orden) => (
              <TableRow key={orden.idOrden}>
                <TableCell>{orden.idOrden}</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="estado_nombre"
                    value={orden.estado_nombre}
                    onChange={(e) => handleChange(e, orden.idOrden)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="usuario_nombre_completo"
                    value={orden.usuario_nombre_completo}
                    onChange={(e) => handleChange(e, orden.idOrden)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="direccion"
                    value={orden.direccion}
                    onChange={(e) => handleChange(e, orden.idOrden)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="total_orden"
                    type="number"
                    value={orden.total_orden}
                    onChange={(e) => handleChange(e, orden.idOrden)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSave(orden.idOrden)}
                  >
                    Guardar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VerOrdenes;
