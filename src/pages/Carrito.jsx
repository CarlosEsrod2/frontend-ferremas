// src/pages/Carrito.jsx
import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Carrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);
  const { usuario, descuento } = useContext(UserContext);

  const subtotal = carrito.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0);
  
  // Calculamos el descuento solo si el usuario está logueado
  const descuentoAplicado = usuario ? (subtotal * descuento / 100) : 0;
  const total = subtotal - descuentoAplicado;

  return (
    <div className="container">
      <h2>Tu carrito</h2>
      {carrito.length === 0 ? (
        <div>
          <p>No hay productos en el carrito.</p>
          <Link to="/" className="btn btn-primary">Ver productos</Link>
        </div>
      ) : (
        <div>
          <ul className="list-group mb-3">
            {carrito.map(producto => (
              <li key={producto.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0">{producto.name}</h5>
                  <small className="text-muted">Cantidad: {producto.cantidad}</small>
                </div>
                <div className="d-flex align-items-center">
                  <span className="me-3">${producto.price * producto.cantidad}</span>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarDelCarrito(producto.id)}>
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Resumen del pedido</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {usuario ? (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Descuento ({descuento}%):</span>
                  <span>-${descuentoAplicado.toFixed(2)}</span>
                </div>
              ) : (
                <div className="alert alert-info">
                  <Link to="/login" className="alert-link">Inicia sesión</Link> para obtener un {descuento}% de descuento
                </div>
              )}
              
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={vaciarCarrito}>Vaciar carrito</button>
            <button className="btn btn-success">Finalizar compra</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;