// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { iniciarSesion } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email });

      if (response.data.id) {
        // Si la respuesta contiene un id de usuario, inicio exitoso
        iniciarSesion(response.data); // Guardamos los datos del usuario en el contexto
        navigate('/cart'); // Redirigir al carrito
      } else {
        setError('El correo electrónico no está registrado.');
      }
    } catch (err) {
      console.error('Error en login:', err);
      setError('Hubo un error al intentar iniciar sesión.');
    }
  };

  return (
    <div className="container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;