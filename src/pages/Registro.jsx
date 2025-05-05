import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('pass');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { iniciarSesion } = useContext(UserContext);

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      // Llama al endpoint de la API
      const res = await axios.post('http://localhost:5000/register', {
        name: nombre,
        email: email,
        password: password
      });

      if (res.data.message) {
        setMensaje(res.data.message);
        // Después de un registro exitoso, se inicia sesión automáticamente
        try {
          const loginRes = await axios.post('http://localhost:5000/login', {
            email,
            password 
          });
          if (loginRes.data.id) {
            iniciarSesion(loginRes.data);
            setTimeout(() => navigate('/'), 2000); // Redirige al home luego de 2 segundos
          }
        } catch (loginErr) {
          console.error('Error al iniciar sesión automática:', loginErr);
          setTimeout(() => navigate('/login'), 2000); // Si falla el login automático, se redirige a login
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar usuario');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registrarse</h2>
      <form onSubmit={handleRegistro}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <small className="form-text text-muted">Por defecto es "pass" si no introduces nada.</small>
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default Registro;