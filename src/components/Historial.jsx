import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, List, ListItem, ListItemText, CircularProgress, Alert,  } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const BuscarOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const idUsuario = localStorage.getItem('idUsuarios');
    if (idUsuario) {
      handleBuscar(idUsuario);
    } else {
      setError('No se encontró el ID de usuario en el localStorage.');
    }
  }, []);

  const handleBuscar = async (idUsuario) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/obtenerordendetalles', { idUsuarios: idUsuario });
      setOrdenes(response.data.orden);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Aún no tienes órdenes.');
      setOrdenes([]);
    } finally {
      setLoading(false);
    }
  };

  const eliminarOrden = async (idOrden) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/eliminarorden/${idOrden}`);
      alert(response.data.message);
      handleBuscar(localStorage.getItem('idUsuarios')); // Volver a buscar las órdenes después de eliminar
    } catch (err) {
      alert('Error al eliminar la orden: ' + err.response?.data?.message || err.message);
    }
  };

  const groupedOrders = ordenes.reduce((acc, orden) => {
    if (!acc[orden.idOrden]) {
      acc[orden.idOrden] = { orders: [], total: 0, direccionEntrega: orden.direccion, idEstado: orden.estado_orden};
    }
    acc[orden.idOrden].orders.push(orden);
    acc[orden.idOrden].total += parseFloat(orden.subtotal) || 0;
    return acc;
  }, {});

  return (
    <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom align="center" style={{ fontWeight: 'bold', color: '#004d40' }}>
        Buscar Detalles de la Orden
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
        onClick={() => !loading && handleBuscar(localStorage.getItem('idUsuarios'))}
        style={{
          marginBottom: '20px',
          backgroundColor: '#FF5722',
          ":hover": { backgroundColor: '#E64A19' },
        }}
      >
        Buscar
      </Button>

      {loading && <CircularProgress sx={{ color: '#FF5722' }} />}

      {error && <Alert severity="error" style={{ width: '100%', marginBottom: '20px' }}>{error}</Alert>}

      {Object.keys(groupedOrders).length > 0 ? (
        <List style={{ width: '100%', marginTop: '20px' }}>
          {Object.keys(groupedOrders).map((idOrden) => (
            <ListItem key={idOrden} style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', padding: '10px' }}>
              <ListItemText
                primary={`ID Orden: ${idOrden}`}
                secondary={
                  <div>
                    <Typography variant="body2" style={{ fontWeight: 'bold', color: '#00796b' }}>
                      Dirección de Entrega: {groupedOrders[idOrden].direccionEntrega}
                    </Typography>
                    <Typography variant="body2" style={{ fontWeight: 'bold', color: '#00796b' }}>
                      Estado De La Compra: {groupedOrders[idOrden].idEstado}
                    </Typography>
                    {groupedOrders[idOrden].orders.map((orden, index) => (
                      <div key={index}>
                        <Typography variant="body2" style={{ color: '#004d40' }}>Nombre del Producto: {orden.nombre_producto}</Typography>
                        <Typography variant="body2" style={{ color: '#004d40' }}>Cantidad: {orden.cantidad}</Typography>
                        <Typography variant="body2" style={{ color: '#004d40' }}>Subtotal: Q{orden.subtotal}</Typography>
                      </div>
                    ))}
                    <Typography variant="body1" style={{ fontWeight: 'bold', marginTop: '10px', color: '#004d40' }}>
                      Total: Q{groupedOrders[idOrden].total.toFixed(2)}
                    </Typography>
                  </div>
                }
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => eliminarOrden(idOrden)}
                style={{
                  marginTop: '10px',
                  backgroundColor: '#004d40',
                  ":hover": { backgroundColor: '#00251a' },
                }}
              >
                Cancelar Compra
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        !loading && (
          <Typography variant="body1" style={{ color: '#00796b', fontWeight: 'bold' }}>
            No hay órdenes para mostrar.
          </Typography>
        )
      )}
    </Container>
  );
};

export default BuscarOrdenes;
