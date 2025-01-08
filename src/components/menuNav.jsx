import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HistoryIcon from "@mui/icons-material/History";

const Navbar = ({ cart }) => {
  const navigate = useNavigate();

  const goToCart = () => {
    navigate("/carrito");
  };

  const goToHistory = () => {
    navigate("/historial");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#0071ce", // Azul Walmart
        padding: "10px 0", // Espaciado
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Título del navbar */}
        <Link
          to="/catalogo"
          style={{
            textDecoration: "none",
            color: "#ffffff", // Texto blanco
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Icono de tienda */}
          <StorefrontIcon sx={{ fontSize: "3rem", color: "#ffc220" }} />

          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              marginLeft: "10px",
              fontFamily: '"Roboto", sans-serif',
              textTransform: "uppercase",
            }}
          >
            Walmart
          </Typography>
        </Link>

        {/* Iconos del carrito y historial */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* Icono del historial */}
          <IconButton color="inherit" onClick={goToHistory}>
            <HistoryIcon sx={{ fontSize: "2.5rem", color: "#ffffff" }} />
            <Typography
              variant="body2"
              sx={{
                marginLeft: "5px",
                color: "#ffffff",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Historial
            </Typography>
          </IconButton>

          {/* Icono del carrito */}
          <IconButton color="inherit" onClick={goToCart}>
            <Badge
              badgeContent={cart.length}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "1rem",
                  minWidth: "20px",
                  height: "20px",
                  backgroundColor: "#ffc220", // Amarillo Walmart
                  color: "#0071ce", // Azul texto
                },
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: "2.5rem", color: "#ffffff" }} />
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
