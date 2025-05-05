// src/context/UserContext.jsx
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [descuento, setDescuento] = useState(10); // Porcentaje de descuento (modificable)

  const iniciarSesion = (userData) => {
    setUsuario(userData);
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  return (
    <UserContext.Provider value={{ usuario, iniciarSesion, cerrarSesion, descuento }}>
      {children}
    </UserContext.Provider>
  );
};
