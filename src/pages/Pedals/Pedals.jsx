import React, { useEffect, useState } from 'react';
import './Pedals.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets'; // 👈 para usar tu imagen hero

function Pedals() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const productosCol = collection(db, 'productos');
                const productosSnapshot = await getDocs(productosCol);
                const productosList = productosSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProductos(productosList);
            } catch (error) {
                console.error('Error al cargar productos:', error);
            }
        };

        fetchProductos();
    }, []);

    return (
        <section className='pedals-section'>
            <div className="hero-container-pedals">
                <img
                    className="hero-image-pedals"
                    src={assets.productos_hero} // 👈 tu imagen hero
                    alt="Hero Gumo Efectos"
                />
                <div className="hero-overlay">
                    <h1>Nuestros Pedales</h1>
                    <p>Descubrí nuestra colección de efectos hechos a mano</p>
                </div>
            </div>

            {/* Grid de productos */}
            <div className='pedals-grid'>
                {productos.length > 0 ? (
                    productos.map(prod => (
                        <Link key={prod.id} to={`/pedals/${prod.id}`} className='pedals-card'>
                            <img
                                className="pedals-image"
                                src={prod.image || '/placeholder.png'}
                                alt={prod.name || "Producto"}
                            />
                            <div className='pedals-overlay'>
                                <h3>{prod.name}</h3>
                                {prod.subtitle && <p>{prod.subtitle}</p>}
                            </div>
                            <div className='pedals-info'>
                                {/* {prod.price && <p className='pedals-price'>${prod.price}</p>} */}
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className='pedals-loading'>Cargando productos...</p>
                )}
            </div>
        </section>
    );
}

export default Pedals;
