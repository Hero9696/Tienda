import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <AppBar position="static">
        <Toolbar>
          <Container>
            <Button color="inherit" component={Link} to="/">
              Inicio
            </Button>
            <Button color="inherit" component={Link} to="/Login">
              Iniciar Sesión
            </Button>
            <Button color="inherit" component={Link} to="/editar">
              Editar Productos
            </Button>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
