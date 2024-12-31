import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate

const Navbar = ({ cart }) => {
  const navigate = useNavigate(); // Hook para redirección

  const goToCart = () => {
    navigate("Tienda/carrito"); // Redirige al carrito
  };

  return (
    <AppBar position="sticky">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to="Tienda/catalogo" style={{ textDecoration: 'none', color: 'white' }}>
          <Typography variant="h6">
            Mi Tienda
          </Typography>
        </Link>

        <IconButton color="inherit" onClick={goToCart}>
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  cart: PropTypes.array.isRequired,
};

export default Navbar;
