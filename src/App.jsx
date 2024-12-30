import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import PropTypes from 'prop-types'; // Importar PropTypes
import Login from "./components/Login";
import Vista from "./components/VistaProductos";
import RegistrarUsuario from "./components/RegistrarUsuario";
import Navbar from "./components/menuNav";
import CarritoCompras from "./components/CarritoCompras"; // Importar el nuevo componente CarritoCompras

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (product.stock > 0) {
      setCart((prevCart) => [...prevCart, product]);
      alert(`${product.nombre} ha sido agregado al carrito.`);
    } else {
      alert("El producto no tiene stock disponible");
    }
  };

  const goToCart = () => {
    // Aquí se redirige al carrito
    window.location.href = "/carrito";
  };

  return (
    <Router>
      <Navbar cart={cart} goToCart={goToCart} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/catalogo" element={<Vista addToCart={addToCart} />} />
        <Route path="/registrar" element={<RegistrarUsuario />} />
        <Route path="/carrito" element={<CarritoCompras cart={cart} />} /> {/* Ruta para CarritoCompras */}
      </Routes>
    </Router>
  );
}

// Definir los tipos de las propiedades
App.propTypes = {
  cart: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
  goToCart: PropTypes.func.isRequired,
};

export default App;
