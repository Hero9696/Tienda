import Vista from './components/vistaProductos.jsx';
import ProductoForm from './components/Productos.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/menuNav.jsx';
import re from './RegistrarUsuario.jsx'
import fapp from '../App.jsx';
import './assets/styles/App.css';


const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Vista />} />
          <Route path="/Login" element={<fapp.Login />} />
          <Route path="/editar" element={<ProductoForm />} />
          <Route path="/registrar" element={<re.RegistroFormulario/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
