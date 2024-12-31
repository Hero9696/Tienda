import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import PropTypes from 'prop-types'; // Importar PropTypes
import Login from "./components/Login";
import Vista from "./components/VistaProductos";
import RegistrarUsuario from "./components/RegistrarUsuario";
import Navbar from "./components/menuNav";
import CarritoCompras from "./components/CarritoCompras"; // Importar el componente CarritoCompras

function App() {
  const [cart, setCart] = useState([]);

  // Función para agregar productos al carrito
 // Función para agregar productos al carrito
const addToCart = (product) => {
  if (product.stock > 0) {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, cantidad: 1 }];
    });
    product.stock -= 1; // Reducir el stock del producto
    alert(`${product.nombre} ha sido agregado al carrito.`);
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

  return (
    <Router>
      <Navbar cart={cart} goToCart={goToCart} />
      <Routes>
        <Route path="Tienda/home" element={<Login />} />
        <Route path="Tienda/catalogo" element={<Vista addToCart={addToCart} />} />
        <Route path="Tienda/registrar" element={<RegistrarUsuario />} />
        <Route path="Tienda/carrito" element={<CarritoCompras cart={cart} cancelarCompra={vaciarCarrito} />} /> {/* Pasamos la función para cancelar la compra */}
      </Routes>
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
