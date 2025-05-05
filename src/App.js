import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Categoria from './pages/Categoria';
import Carrito from './pages/Carrito';
import Registro from './pages/Registro';
import Login from './pages/Login';
import { CarritoProvider } from './context/CarritoContext';


function App() {
  return (
    <Router>
      <div className="container">
        <header className="bg-primary text-white p-3 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h1>Ferremas</h1>
            <Link to="/cart" className="btn btn-light">🛒 Carrito</Link>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          {/* Categorías */}
          <Route path="/products/:typeId" element={<Categoria />} />
          <Route path="/cart" element={<Carrito />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h2>¡Bienvenidos a Ferremas!</h2>
    <div className="list-group mt-4">
      {[
        { id: 1, name: "Herramientas Manuales" },
        { id: 2, name: "Materiales Básicos" },
        { id: 3, name: "Equipos de Seguridad" },
        { id: 4, name: "Tornillos y Anclajes" },
        { id: 5, name: "Fijaciones y Adhesivos" },
        { id: 6, name: "Equipos de Medición" }
      ].map(cat => (
        <Link key={cat.id} to={`/products/${cat.id}`} className="list-group-item list-group-item-action">
          {cat.name}
        </Link>
      ))}
    </div>
  </div>
);

//const Carrito = () => <div>Tu carrito está vacío.</div>;

export default App;
