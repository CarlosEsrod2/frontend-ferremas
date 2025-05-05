// src/pages/Carrito.jsx
import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

const Carrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);

  const total = carrito.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0);

  return (
    <div>
      <h2>Tu carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          <ul className="list-group mb-3">
            {carrito.map(producto => (
              <li key={producto.id} className="list-group-item d-flex justify-content-between align-items-center">
                {producto.name} (x{producto.cantidad}) - ${producto.price * producto.cantidad}
                <button className="btn btn-danger btn-sm" onClick={() => eliminarDelCarrito(producto.id)}>
                  ❌
                </button>
              </li>
            ))}
          </ul>
          <h4>Total: ${total}</h4>
          <button className="btn btn-secondary" onClick={vaciarCarrito}>Vaciar carrito</button>
        </div>
      )}
    </div>
  );
};

export default Carrito;
