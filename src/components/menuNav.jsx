import { Link } from "react-router-dom";

const NavBar = () => {
    return (
      <div className="navbar-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link className="nav-link" to='/'>
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/Login'>
                    Iniciar Sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/editar'>
                    Editar Productos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  };

export default NavBar;
