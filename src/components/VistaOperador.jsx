import Vista from './VistaProductos.jsx';
import ProductoForm from './Productos.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './menuNavOperador.jsx';
import RegistroFormulario from './RegistrarUsuario.jsx'; // Corregido
import './assets/styles/App.css';

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/catalogo/operador" element={<Vista />} />
          <Route path="/editar" element={<ProductoForm />} />
          <Route path="/registrar" element={<RegistroFormulario />} /> {/* Corregido */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
