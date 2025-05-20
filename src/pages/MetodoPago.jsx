// src/pages/MetodoPago.jsx
import React, { useState, useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MetodoPago = () => {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const { usuario, descuento } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [metodoPago, setMetodoPago] = useState(null);
  const [mostrarDatosTransferencia, setMostrarDatosTransferencia] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState('');
  
  const subtotal = carrito.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0);
  const descuentoAplicado = usuario ? (subtotal * descuento / 100) : 0;
  const total = subtotal - descuentoAplicado;
  
  const handleSeleccionMetodo = (metodo) => {
    setMetodoPago(metodo);
    setMostrarDatosTransferencia(metodo === 'transferencia');
    setError('');
  };
  
  const procesarPagoWebpay = async () => {
    setProcesando(true);
    setError('');
    
    try { //SE OBTIENE ERROR Error al iniciar transacción: ReferenceError: Cannot access 'response' before initialization at procesarPagoWebpay (MetodoPago.jsx:34:1) at handleFinalizarCompra (MetodoPago.jsx:57:1)
      // Llamamos al endpoint para crear la transacción
      const response = await axios.post('http://localhost:5000/create-transaction', {
        amount: Math.round(total), // Transbank requiere montos enteros
        sessionId: usuario ? usuario.id.toString() : 'guest-session',
      });

      if (response.data.success) {
        // Redirigimos al usuario a la página de pago de Webpay
        window.location.href = response.data.url;
      } else {
        setError('No se pudo iniciar la transacción con Webpay');
        setProcesando(false);
      }
    } catch (err) {
      console.error('Error al iniciar transacción:', err);
      setError('Error al conectar con el servicio de pago');
      setProcesando(false);
    }
  };
  
  const handleFinalizarCompra = () => {
    if (metodoPago === 'tarjeta') {
      procesarPagoWebpay();
    } else if (metodoPago === 'transferencia') {
      // Simulamos finalización para transferencia
      alert('¡Gracias por tu compra! Por favor realiza la transferencia según las instrucciones.');
      vaciarCarrito();
      navigate('/');
    }
  };
  
  const handleVolver = () => {
    navigate('/cart');
  };
  
  if (carrito.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="container">
      <h2 className="mb-4">Método de Pago</h2>
      
      <div className="row mb-4">
        <div className="col-md-6">
          <div 
            className={`card mb-3 ${metodoPago === 'tarjeta' ? 'border-primary' : ''}`}
            onClick={() => handleSeleccionMetodo('tarjeta')}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between">
                <span>Pagar con tarjeta (Webpay)</span>
                {metodoPago === 'tarjeta' && <span className="text-primary">✓</span>}
              </h5>
              <p className="card-text">Paga con tarjeta de crédito o débito a través de Webpay</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div 
            className={`card mb-3 ${metodoPago === 'transferencia' ? 'border-primary' : ''}`}
            onClick={() => handleSeleccionMetodo('transferencia')}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between">
                <span>Pagar con transferencia</span>
                {metodoPago === 'transferencia' && <span className="text-primary">✓</span>}
              </h5>
              <p className="card-text">Realiza una transferencia bancaria</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mostrar datos de transferencia si se selecciona ese método */}
      {mostrarDatosTransferencia && (
        <div className="alert alert-info mb-4">
          <h4 className="alert-heading">Datos para transferencia</h4>
          <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>
            FERREMAS 
            BANCO DE CHILE 
            73.345.678-9 
            CUENTA CORRIENTE NRO 
            1234-5678-9123-4567
          </p>
        </div>
      )}
      
      {error && (
        <div className="alert alert-danger mb-4">
          {error}
        </div>
      )}
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Resumen del pedido</h5>
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          {usuario && (
            <div className="d-flex justify-content-between mb-2 text-success">
              <span>Descuento ({descuento}%):</span>
              <span>-${descuentoAplicado.toFixed(2)}</span>
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
        <button 
          className="btn btn-secondary" 
          onClick={handleVolver}
          disabled={procesando}
        >
          Volver al carrito
        </button>
        <button 
          className="btn btn-success" 
          disabled={!metodoPago || procesando} 
          onClick={handleFinalizarCompra}
        >
          {procesando ? 'Procesando...' : 'Finalizar compra'}
        </button>
      </div>
    </div>
  );
};

export default MetodoPago;