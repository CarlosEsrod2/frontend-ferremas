# Ferremas - E-commerce de Ferretería

![Ferremas Logo](https://placehold.co/600x150/282c34/61dafb?text=Ferremas&font=montserrat)

## Descripción 📋 

En "FERREMAS", se puede encontrar una amplia gama de productos, desde herramientas
manuales y eléctricas, pinturas, materiales eléctricos, hasta accesorios y artículos de seguridad.
Trabajan con marcas reconocidas del sector como Bosch, Makita, Stanley y Sika, ofreciendo así
diversidad y calidad en sus productos.

## Características principales ✨

- **Catálogo por categorías**: Exploración de productos organizados en categorías intuitivas
- **Carrito de compra**: Gestión sencilla de productos seleccionados
- **Sistema de usuarios**: Registro e inicio de sesión con beneficios exclusivos
- **Descuentos para usuarios**: 10% de descuento para usuarios registrados
- **Múltiples métodos de pago**: Integración con Webpay y transferencia bancaria
- **Diseño responsive**: Experiencia optimizada en todos los dispositivos

## Tecnologías utilizadas 🚀

- **Frontend**: React, React Router, Bootstrap, Framer Motion
- **Gestión de estado**: Context API (CarritoContext, UserContext)
- **Comunicación con backend**: Axios
- **Estilos**: Bootstrap CSS

## Estructura del proyecto 📦 

```
src/
├── App.js             # Componente principal y rutas
├── index.js           # Punto de entrada de la aplicación
├── context/           # Gestión de estado global
│   ├── CarritoContext.js
│   └── UserContext.jsx
└── pages/             # Componentes de página
    ├── Carrito.jsx
    ├── Categoria.jsx
    ├── Login.jsx
    ├── MetodoPago.jsx
    ├── PaymentResult.jsx
    └── Registro.jsx
```

## Instalación 🛠️ 

1. Clona el repositorio:
   ```bash
   git clone https://github.com/CarlosEsrod2/frontend-ferremas.git
   cd frontend-ferremas
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

4. Inicia el servidor backend (en otro terminal):
   ```bash
   cd backend
   py app.py
   ```

## Sistema de usuarios 👤 

- **Registro**: Los usuarios pueden crear una cuenta proporcionando nombre, email y contraseña
- **Inicio de sesión**: Acceso a la cuenta con email y contraseña
- **Beneficios**: Descuento del 10% en todas las compras para usuarios registrados

## Flujo de compra 🛒 

1. Exploración de categorías y productos
2. Agregar productos al carrito
3. Revisar carrito (aplicación de descuentos si corresponde)
4. Seleccionar método de pago (Webpay o transferencia bancaria)
5. Confirmar y procesar pago
6. Ver confirmación de la transacción

## API Backend 🔄 

El proyecto requiere un servidor backend ejecutándose en `http://localhost:5000` con los siguientes endpoints:

- `GET /products`: Obtiene listado de productos
- `POST /register`: Registro de usuarios
- `POST /login`: Autenticación de usuarios
- `POST /create-transaction`: Creación de transacción de pago

## Lenguajes de Programación Utilizados 🧑‍💻 

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=fff)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=fff)

Este proyecto fue desarrollado utilizando los siguientes lenguajes:

- **JavaScript**: Lenguaje principal para el desarrollo del frontend, responsable de la lógica y dinámicas del sitio.
- **HTML**: Usado para estructurar el contenido de las páginas web.
- **CSS**: Aplicado para definir estilos, diseño visual y adaptabilidad del sitio.
