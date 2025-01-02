import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Importar ícono de cuenta
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate

const Navbar = ({ cart }) => {
  const navigate = useNavigate(); // Hook para redirección

  const goToCart = () => {
    navigate("/carrito/operador"); // Redirige al carrito
  };

  const goToRegister = () => {
    navigate("/registrar"); // Redirige a la página de registro
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
          <IconButton color="inherit" onClick={goToRegister}>
            <AccountCircleIcon />
          </IconButton>

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
