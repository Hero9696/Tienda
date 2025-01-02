import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import Login from "./components/Login";
import Vista from "./components/VistaProductos";
import VistaOperador from "./components/VistaProductos";
import RegistrarUsuario from "./components/RegistrarUsuario";
import Navbar from "./components/menuNav";
import NavbarOperador from "./components/menuNavOperador";
import CarritoCompras from "./components/CarritoCompras";
import Historial from "./components/Historial";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (product.stock > 0) {
      setCart((prevCart) => {
        const existingProduct = prevCart.find(
          (item) => item.idProductos === product.id
        );
        if (existingProduct) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          );
        }
        return [...prevCart, { ...product, cantidad: 1 }];
      });

      const updatedProduct = { ...product, stock: product.stock - 1 };
      alert(
        `${updatedProduct.nombre} ha sido agregado al carrito. Stock restante: ${updatedProduct.stock}`
      );
    } else {
      alert("El producto no tiene stock disponible");
    }
  };

  const vaciarCarrito = () => {
    setCart([]);
    alert("Compra cancelada. El carrito ha sido limpiado.");
  };

  const goToCart = () => {
    window.location.href = "/carrito";
  };
  const goToCartO = () => {
    window.location.href = "/carrito/operador";
  };

  const Layout = ({ children }) => {
    const location = useLocation();

    return (
      <>
        {(location.pathname === "/catalogo" ||
          location.pathname === "/carrito" || location.pathname === "/historial") && (
          <Navbar cart={cart} goToCart={goToCart} />
        )}
        {(location.pathname === "/catalogo/operador" ||
          location.pathname === "/carrito/operador") && (
          <NavbarOperador cart={cart} goToCart={goToCartO} />
        )}
        {children}
      </>
    );
  };

  Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <Router basename="/Tienda">
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/catalogo" element={<Vista addToCart={addToCart} />} />
          <Route
            path="/catalogo/operador"
            element={<VistaOperador addToCart={addToCart} />}
          />
          <Route path="/registrar" element={<RegistrarUsuario />} />
          <Route
            path="/carrito"
            element={
              <CarritoCompras cart={cart} cancelarCompra={vaciarCarrito} />
            }
          />
          <Route
            path="/carrito/operador"
            element={
              <CarritoCompras cart={cart} cancelarCompra={vaciarCarrito} />
            }
          />
          <Route path="/historial" element={<Historial />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
