// src/pages/PaymentResult.jsx
import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const orderNumber = searchParams.get('order');
  const navigate = useNavigate();
  const { vaciarCarrito } = useContext(CarritoContext);

  useEffect(() => {
    // Si el pago fue exitoso, vaciar el carrito
    if (status === 'success') {
      vaciarCarrito();
    }
  }, [status, vaciarCarrito]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="container mt-5">
      {status === 'success' ? (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">¡Pago exitoso!</h4>
          <p>Tu pago ha sido procesado correctamente.</p>
          {orderNumber && <p>Número de orden: <strong>{orderNumber}</strong></p>}
          <hr />
          <p className="mb-0">Gracias por tu compra en Ferremas.</p>
          <button className="btn btn-success mt-3" onClick={handleGoHome}>
            Volver a la tienda
          </button>
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error en el pago</h4>
          <p>Lo sentimos, hubo un problema al procesar tu pago.</p>
          <hr />
          <p className="mb-0">Por favor, intenta nuevamente o elige otro método de pago.</p>
          <div className="mt-3">
            <button className="btn btn-primary me-2" onClick={handleGoToCart}>
              Volver al carrito
            </button>
            <button className="btn btn-secondary" onClick={handleGoHome}>
              Ir a la tienda
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentResult;