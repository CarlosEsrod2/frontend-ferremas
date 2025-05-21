import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { motion } from 'framer-motion';


const categorias = {
    1: 'Herramientas Manuales',
    2: 'Materiales Básicos',
    3: 'Equipos de Seguridad',
    4: 'Tornillos y Anclajes',
    5: 'Fijaciones y Adhesivos',
    6: 'Equipos de Medición'
};

const Categoria = () => {
    const { agregarAlCarrito } = useContext(CarritoContext);
    const { typeId } = useParams();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('EJECUTANDO FETCH PARA PRODUCTOS');
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                const filtrados = data.filter(p => p.type === parseInt(typeId));
                setProductos(filtrados);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error al obtener productos:', err);
                setLoading(false);
            });
    }, [typeId]);

    return (
        <div>
            <h2 className="mb-4">{categorias[typeId] || 'Categoría'} - Productos</h2>
            {loading ? (
                <p>Cargando productos... esto puede tardar</p>
            ) : productos.length === 0 ? (
                <p>No hay productos en esta categoría.</p>
            ) : (
                <div className="row">
                    {productos.map(producto => (
                        <div className="col-md-4 mb-4" key={producto.id}>
                            <div className="card h-100">
                                <img
                                    src="https://placehold.co/300x200"
                                    className="card-img-top"
                                    alt={producto.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{producto.name}</h5>
                                    <p className="card-text">${producto.price} CLP</p>
                                    <p className="card-text">${producto.valor_dolar} USD</p>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        whileHover={{ scale: 1.1 }}
                                        className="btn btn-primary"
                                        onClick={() => agregarAlCarrito(producto)}
                                    >
                                        Agregar al carrito
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Categoria;
