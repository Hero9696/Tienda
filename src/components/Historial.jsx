import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const BuscarOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Obtener el idUsuarios desde localStorage
    const idUsuario = localStorage.getItem('idUsuarios');

    if (idUsuario) {
      // Si el ID de usuario existe en localStorage, realizar la búsqueda
      handleBuscar(idUsuario);
    } else {
      setError('No se encontró el ID de usuario en el localStorage.');
    }
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  const handleBuscar = async (idUsuario) => {
    setLoading(true); // Iniciar carga
    try {
      const response = await axios.post('http://localhost:5000/obtenerordendetalles', { idUsuarios: idUsuario });
      setOrdenes(response.data.orden);
      setError('');
    } catch (err) {
      setError('Aun no tienes Ordenes.', err);
      setOrdenes([]);
    } finally {
      setLoading(false); // Finaliza carga
    }
  };

  // Agrupar las órdenes por idOrden y calcular el subtotal total por grupo
  const groupedOrders = ordenes.reduce((acc, orden) => {
    if (!acc[orden.idOrden]) {
      acc[orden.idOrden] = { orders: [], total: 0, direccionEntrega: orden.direccion };
    }
    acc[orden.idOrden].orders.push(orden);
    acc[orden.idOrden].total += parseFloat(orden.subtotal); // Sumar el subtotal
    return acc;
  }, {});

  return (
    <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom align="center" style={{ fontWeight: 'bold' }}>
        Buscar Detalles de la Orden
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
        onClick={() => handleBuscar(localStorage.getItem('idUsuarios'))}
        style={{ marginBottom: '20px' }}
      >
        Buscar
      </Button>

      {loading && <CircularProgress />}

      {error && <Alert severity="error" style={{ width: '100%', marginBottom: '20px' }}>{error}</Alert>}

      {Object.keys(groupedOrders).length > 0 ? (
        <List style={{ width: '100%', marginTop: '20px' }}>
          {Object.keys(groupedOrders).map((idOrden) => (
            <ListItem key={idOrden} style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', padding: '10px' }}>
              <ListItemText
                primary={`ID Orden: ${idOrden}`}
                secondary={
                  <>
                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                      Dirección de Entrega: {groupedOrders[idOrden].direccionEntrega}
                    </Typography>
                    {groupedOrders[idOrden].orders.map((orden, index) => (
                      <div key={index}>
                        <Typography variant="body2">Nombre del Producto: {orden.nombre_producto}</Typography>
                        <Typography variant="body2">Cantidad: {orden.cantidad}</Typography>
                        <Typography variant="body2">Subtotal: Q{orden.subtotal}</Typography>
                      </div>
                    ))}
                    <Typography variant="body1" style={{ fontWeight: 'bold', marginTop: '10px' }}>
                      Total: Q{groupedOrders[idOrden].total.toFixed(2)}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        !loading && <Typography variant="body1">{setError}.</Typography>
      )}
    </Container>
  );
};

export default BuscarOrdenes;
