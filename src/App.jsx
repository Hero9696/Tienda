
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx"; // Asegúrate de que esta ruta sea la correcta
import Vista from "./components/VistaProductos.jsx"; // Asegúrate de que esta ruta sea la correcta

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/catalogo" element={<Vista />} />
      </Routes>
    </Router>
  );
}

export default App;
