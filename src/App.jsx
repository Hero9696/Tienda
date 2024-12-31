import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types"; // Importar PropTypes
import Login from "./components/Login";
import Vista from "./components/VistaProductos";
import RegistrarUsuario from "./components/RegistrarUsuario";
import Navbar from "./components/menuNav";
import CarritoCompras from "./components/CarritoCompras"; // Importar el componente CarritoCompras

function App() {
  const [cart, setCart] = useState([]);

  // Función para agregar productos al carrito

  const addToCart = (product) => {
    if (product.stock > 0) {
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.idProductos === product.id);
        if (existingProduct) {
          // Si el producto ya está en el carrito, aumentar la cantidad
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          );
        }
        // Si el producto no está en el carrito, agregarlo con cantidad inicial de 1
        return [...prevCart, { ...product, cantidad: 1 }];
      });
  
      // Crear una copia del producto para reducir el stock
      const updatedProduct = { ...product, stock: product.stock - 1 };
      alert(`${updatedProduct.nombre} ha sido agregado al carrito. Stock restante: ${updatedProduct.stock}`);
    } else {
      alert("El producto no tiene stock disponible");
    }
  };
  



  // Función para limpiar el carrito
  const vaciarCarrito = () => {
    setCart([]); // Vaciar el carrito
    alert("Compra cancelada. El carrito ha sido limpiado.");
  };

  const goToCart = () => {
    window.location.href = "Tienda/carrito";
  };

  // Componente para controlar el renderizado del Navbar
  const Layout = ({ children }) => {
    const location = useLocation(); // Mover useLocation dentro de Router

    return (
      <>
        {/* Renderizar Navbar solo si no estamos en la ruta de Login */}
        {location.pathname !== "/Tienda/home" && <Navbar cart={cart} goToCart={goToCart} />}
        {children}
      </>
    );
  };

  // Validar las props de Layout
  Layout.propTypes = {
    children: PropTypes.node.isRequired, // Declarar children como requerido
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="Tienda/home" element={<Login />} />
          <Route path="Tienda/catalogo" element={<Vista addToCart={addToCart} />} />
          <Route path="Tienda/registrar" element={<RegistrarUsuario />} />
          <Route
            path="Tienda/carrito"
            element={<CarritoCompras cart={cart} cancelarCompra={vaciarCarrito} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

App.propTypes = {
  cart: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
  goToCart: PropTypes.func.isRequired,
  vaciarCarrito: PropTypes.func.isRequired,
};

export default App;
