import Vista from './components/vistaProductos.jsx';
import ProductoForm from './components/Productos.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/menuNav.jsx';
import Login from './components/login.jsx';
import fapp from '../App.jsx';
import './assets/styles/App.css';
import './assets/styles/nav.css';
import './assets/styles/editar.css';
import './assets/styles/vista.css'

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Vista />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/editar" element={<ProductoForm />} />
          <Route path="/registrar" element={<fapp.Login/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
