import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

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
        backgroundColor: "#FFB400", // Color dorado, inspirado en la estética de One Piece
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
            color: "#1d3557", // Color oscuro para contraste
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: "bold",
              fontSize: "2rem", // Tamaño de fuente más grande
              marginLeft: "10px",
              fontFamily: '"Rock Salt", cursive', // Tipografía inspirada en el estilo de One Piece
            }}
          >
            🏴‍☠️ Mi Tiendita
          </Typography>
        </Link>

        {/* Iconos del carrito y historial */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* Icono del historial */}
          <IconButton color="inherit" onClick={goToHistory}>
            <HistoryIcon sx={{ fontSize: "2.5rem", color: "#1d3557" }} /> Historial De Compras
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
                  backgroundColor: "#ff6f61", // Color de advertencia similar al estilo de "One Piece"
                },
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: "2.5rem", color: "#1d3557" }} /> Carrito De Compras
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
