import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History"; // Icono para historial
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ cart }) => {
  const navigate = useNavigate();

  const goToCart = () => {
    navigate("/carrito");
  };

  const goToHistory = () => {
    navigate("/historial"); // Redirige al historial
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#1976d2", // Color principal
        padding: "10px 0", // Espaciado
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
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: "bold",
              fontSize: "1.8rem",
              marginLeft: "10px",
            }}
          >
            🛒 Mi Tiendita
          </Typography>
        </Link>

        {/* Iconos del carrito y historial */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* Icono del historial */}
          <IconButton color="inherit" onClick={goToHistory}>
            <HistoryIcon sx={{ fontSize: "2rem" }} />
          </IconButton>

          {/* Icono del carrito */}
          <IconButton color="inherit" onClick={goToCart}>
            <Badge
              badgeContent={cart.length}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.9rem", // Tamaño del número
                  minWidth: "20px",
                  height: "20px",
                },
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: "2rem" }} />
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
