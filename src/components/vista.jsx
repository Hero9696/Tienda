import Vista from './components/vistaProductos.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/menuNav.jsx';

import './assets/styles/App.css';


const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Vista />} />
        
        </Routes>
      </Router>
    </>
  );
};

export default App;
