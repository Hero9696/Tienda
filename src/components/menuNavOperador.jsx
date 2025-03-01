import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StoreIcon from "@mui/icons-material/Store"; // Ícono para Productos
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket"; // Ícono para Ventas
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

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
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#0040ff", // Azul corporativo de Walmart
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)", // Sombra ligera
      }}
    >
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        {/* Título de la tienda */}
        <Link to="/catalogo/operador" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#ffdd00", // Amarillo Walmart
              fontFamily: "Arial, sans-serif",
            }}
          >
            Mi Tiendita
          </Typography>
        </Link>

        <Box display="flex" alignItems="center">
          {/* Menú de Usuarios */}
          <Box sx={{ display: "flex", alignItems: "center", marginRight: 3 }}>
            <IconButton
              color="inherit"
              onClick={handleUserMenuClick}
              sx={{ marginRight: 1 }}
            >
              <AccountCircleIcon
                sx={{
                  color: "#ffdd00", // Amarillo Walmart
                  fontSize: "1.5rem",
                }}
              />
            </IconButton>
            <Typography
              sx={{
                color: "#ffdd00", // Amarillo Walmart
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Usuarios
            </Typography>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={() => navigate("/usuarios/crear")}>
              Crear Usuario
            </MenuItem>
            <MenuItem onClick={() => navigate("/usuarios/lista")}>
              Lista de Usuarios
            </MenuItem>
          </Menu>

          {/* Menú de Productos */}
          <Box sx={{ display: "flex", alignItems: "center", marginRight: 3 }}>
            <IconButton
              color="inherit"
              onClick={handleProductosMenuClick}
              sx={{ marginRight: 1 }}
            >
              <StoreIcon
                sx={{
                  color: "#ffdd00", // Amarillo Walmart
                  fontSize: "1.5rem",
                }}
              />
            </IconButton>
            <Typography
              sx={{
                color: "#ffdd00", // Amarillo Walmart
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Productos
            </Typography>
          </Box>
          <Menu
            anchorEl={anchorElProductos}
            open={Boolean(anchorElProductos)}
            onClose={handleCloseProductosMenu}
          >
            <MenuItem onClick={() => navigate("/productos/crear")}>
              Crear Producto
            </MenuItem>
            <MenuItem onClick={() => navigate("/productos/lista")}>
              Lista de Productos
            </MenuItem>
          </Menu>

          {/* Menú de Ventas */}
          <Box sx={{ display: "flex", alignItems: "center", marginRight: 3 }}>
            <IconButton
              color="inherit"
              onClick={handleVentasMenuClick}
              sx={{ marginRight: 1 }}
            >
              <ShoppingBasketIcon
                sx={{
                  color: "#ffdd00", // Amarillo Walmart
                  fontSize: "1.5rem",
                }}
              />
            </IconButton>
            <Typography
              sx={{
                color: "#ffdd00", // Amarillo Walmart
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Ventas
            </Typography>
          </Box>
          <Menu
            anchorEl={anchorElVentas}
            open={Boolean(anchorElVentas)}
            onClose={handleCloseVentasMenu}
          >
            <MenuItem onClick={() => navigate("/ventas/lista")}>
              Lista de Ventas
            </MenuItem>
          </Menu>

          {/* Icono de Carrito */}
          <IconButton color="inherit" onClick={goToCart}>
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon
                sx={{
                  color: "#ffdd00", // Amarillo Walmart
                  fontSize: "1.5rem",
                }}
              />
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
