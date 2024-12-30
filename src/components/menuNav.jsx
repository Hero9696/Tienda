import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ cart, goToCart }) => {
  return (
    <AppBar position="sticky">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
     
        <Link to="/catalogo" style={{ textDecoration: 'none', color: 'white' }}>
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
  goToCart: PropTypes.func.isRequired,
};

export default Navbar;
