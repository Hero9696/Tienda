import { AppBar, Toolbar, Typography, IconButton, Badge, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Ícono para el submenú
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
    <AppBar position="sticky" sx={{ backgroundColor: 'black' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/catalogo/operador" style={{ textDecoration: 'none', color: 'white' }}>
          <Typography variant="h6">
            Mi Tienda
          </Typography>
        </Link>

        <div>
          {/* Menú de Usuarios */}
          <IconButton color="inherit" onClick={handleUserMenuClick}>
            <AccountCircleIcon />  Usuarios
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
          <IconButton color="inherit" onClick={handleProductosMenuClick}>
            <MoreVertIcon /> Productos
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
          <IconButton color="inherit" onClick={handleVentasMenuClick}>
            <MoreVertIcon /> Ventas
          </IconButton>
          <Menu
            anchorEl={anchorElVentas}
            open={Boolean(anchorElVentas)}
            onClose={handleCloseVentasMenu}
          >
            <MenuItem onClick={() => navigate("/ventas/nueva")}>Nueva Venta</MenuItem>
            <MenuItem onClick={() => navigate("/ventas/lista")}>Lista de Ventas</MenuItem>
          </Menu>

          <IconButton color="inherit" onClick={goToCart}>
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  cart: PropTypes.array.isRequired,
};

export default Navbar;
