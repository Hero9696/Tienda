import { AppBar, Toolbar, Typography, IconButton, Badge, Menu, MenuItem, Box } from "@mui/material";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StoreIcon from '@mui/icons-material/Store'; // Ícono para Productos
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'; // Ícono para Ventas
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ cart }) => {
  const navigate = useNavigate(); 
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElProductos, setAnchorElProductos] = useState(null);
  const [anchorElVentas, setAnchorElVentas] = useState(null);

  const goToCart = () => {
    navigate("/carrito/operador");
  };

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleProductosMenuClick = (event) => {
    setAnchorElProductos(event.currentTarget);
  };

  const handleCloseProductosMenu = () => {
    setAnchorElProductos(null);
  };

  const handleVentasMenuClick = (event) => {
    setAnchorElVentas(event.currentTarget);
  };

  const handleCloseVentasMenu = () => {
    setAnchorElVentas(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#ff6f00', boxShadow: 3 }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
        <Link to="/catalogo/operador" style={{ textDecoration: 'none', color: 'white' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0040ff' }}>
            Mi Tienda
          </Typography>
        </Link>

        <Box display="flex" alignItems="center">
          {/* Menú de Usuarios */}
          <IconButton color="inherit" onClick={handleUserMenuClick} sx={{ marginRight: 2 }}>
            <AccountCircleIcon sx={{ color: '#ffdd00' }} /> Usuarios
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={() => navigate("/usuarios/crear")}>Crear Usuario</MenuItem>
            <MenuItem onClick={() => navigate("/usuarios/editar")}>Editar Usuario</MenuItem>
            <MenuItem onClick={() => navigate("/usuarios/lista")}>Lista de Usuarios</MenuItem>
          </Menu>

          {/* Menú de Productos */}
          <IconButton color="inherit" onClick={handleProductosMenuClick} sx={{ marginRight: 2 }}>
            <StoreIcon sx={{ color: '#ffdd00' }} /> Productos
          </IconButton>
          <Menu
            anchorEl={anchorElProductos}
            open={Boolean(anchorElProductos)}
            onClose={handleCloseProductosMenu}
          >
            <MenuItem onClick={() => navigate("/productos/crear")}>Crear Producto</MenuItem>
            <MenuItem onClick={() => navigate("/productos/lista")}>Lista de Productos</MenuItem>
            <MenuItem onClick={() => navigate("/productos/editar")}>Editar Producto</MenuItem>
          </Menu>

          {/* Menú de Ventas */}
          <IconButton color="inherit" onClick={handleVentasMenuClick} sx={{ marginRight: 2 }}>
            <ShoppingBasketIcon sx={{ color: '#ffdd00' }} /> Ventas
          </IconButton>
          <Menu
            anchorEl={anchorElVentas}
            open={Boolean(anchorElVentas)}
            onClose={handleCloseVentasMenu}
          >
            <MenuItem onClick={() => navigate("/ventas/nueva")}>Nueva Venta</MenuItem>
            <MenuItem onClick={() => navigate("/ventas/lista")}>Lista de Ventas</MenuItem>
          </Menu>

          {/* Icono de Carrito */}
          <IconButton color="inherit" onClick={goToCart} sx={{ marginRight: 2 }}>
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon sx={{ color: '#ffdd00' }} /> Carrito
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  cart: PropTypes.array.isRequired,
};

export default Navbar;
