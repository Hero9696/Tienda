import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Vista from "./components/VistaProductos";
import RegistrarUsuario from "./components/RegistrarUsuario";



function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/catalogo" element={<Vista />} /> 
        <Route path="/registrar" element={<RegistrarUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;
