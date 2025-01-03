import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);


  const addToCart = (product) => {
    if (product.stock > 0) {
      setCart((prevCart) => {
        const updatedCart = prevCart.map((item) =>
          item.idProductos === product.idProductos
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
  
        // Si el producto no existe en el carrito, agregarlo
        if (!updatedCart.some(item => item.idProductos === product.idProductos)) {
          updatedCart.push({ ...product, cantidad: 1 });
        }
  
        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      });
    } else {
      alert("El producto no tiene stock disponible");
    }
  };
  
  const actualizarCarrito = (idProducto, cantidad) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.idProductos === idProducto
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
  
      // Guardar el carrito actualizado en localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  
  const eliminarProducto = (idProducto) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.idProductos !== idProducto);
  
      // Guardar el carrito actualizado en localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
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
          location.pathname === "/carrito" ||
          location.pathname === "/historial") && (
          <Navbar cart={cart} goToCart={goToCart} actualizarCarrito={actualizarCarrito} />
        )}
        {(location.pathname === "/catalogo/operador" ||
          location.pathname === "/carrito/operador" ||
          location.pathname === "/registrar") && (
          <NavbarOperador cart={cart} goToCart={goToCartO} actualizarCarrito={actualizarCarrito}/>
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
          <Route path="/catalogo" element={<Vista addToCart={addToCart} actualizarCarrito={actualizarCarrito} />} />
          <Route
            path="/catalogo/operador"
            element={<VistaOperador addToCart={addToCart}  actualizarCarrito={actualizarCarrito} />}
          />
          <Route path="/registrar" element={<RegistrarUsuario />} />
          <Route
            path="/carrito"
            element={
              <CarritoCompras
                cart={cart}
                cancelarCompra={vaciarCarrito}
                actualizarCarrito={actualizarCarrito}
                eliminarProducto={eliminarProducto}
              />
            }
          />
          <Route
            path="/carrito/operador"
            element={
              <CarritoCompras
                cart={cart}
                cancelarCompra={vaciarCarrito}
                actualizarCarrito={actualizarCarrito}
                eliminarProducto={eliminarProducto}
              />
            }
          />
          <Route path="/historial" element={<Historial />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
