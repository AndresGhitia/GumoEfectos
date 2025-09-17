import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useCart } from "../../context/CartContext";
import "./PedalDetail.css";

export default function PedalDetail() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const { cart, addToCart } = useCart(); // obtenemos también el carrito

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, "productos", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProducto({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No existe ese producto");
                }
            } catch (error) {
                console.error("Error al obtener producto:", error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!producto) return <p>Cargando...</p>;

    const cartItem = cart.find(item => item.id === producto.id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;
    const canAddToCart = producto.stock > quantityInCart;

    return (
        <div className="pedal-detail">
            {/* Hero */}
            <div className="hero-section">
                <img src={producto.hero_detail} alt={producto.name} className="hero-image" />
            </div>

            {/* Contenido detalle */}
            <div className="detail-content">
                <div className="detail-left">
                    <img src={producto.image} alt={producto.name} className="pedal-image" />
                </div>
                <div className="detail-right">
                    <div className="pedal-title">
                        <h1 className="pedal-name">{producto.name}</h1>
                        <h3 className="pedal-subtitle">{producto.subtitle}</h3>
                    </div>

                    {/* Precio + botón */}
                    <div className="pedal-cart">
                        <div className="pedal-price">
                            <strong>${producto.price}</strong>
                            <span>Pesos Argentinos</span>
                        </div>

                        <button
                            className={canAddToCart ? "add-to-cart" : "out-of-stock"}
                            disabled={!canAddToCart}
                            onClick={() => addToCart(producto)}
                        >
                            {producto.stock === 0
                                ? "Sin stock"
                                : quantityInCart >= producto.stock
                                    ? "Stock máximo alcanzado"
                                    : "Añadir al Carrito"}
                        </button>
                    </div>

                    <p className="pedal-description">{producto.description}</p>

                    {/* Especificaciones */}
                    <div className="pedal-specs">
                        <h2>ESPECIFICACIONES</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td><strong>Circuito</strong></td>
                                    <td>{producto.circuit}</td>
                                </tr>
                                <tr>
                                    <td><strong>Bypass</strong></td>
                                    <td>{producto.bypass}</td>
                                </tr>
                                <tr>
                                    <td><strong>Alimentacion</strong></td>
                                    <td>{producto.power}</td>
                                </tr>
                                <tr>
                                    <td><strong>Dimensiones</strong></td>
                                    <td>{producto.dimensions}</td>
                                </tr>
                                <tr>
                                    <td><strong>Corriente</strong></td>
                                    <td>{producto.current}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>*Fuente de alimentación no incluida.</p>
                    </div>
                </div>
            </div>
            {producto.controls && (
                <div className="pedal-controls">
                    <h2>CONTROLES</h2>
                    <ul className="controls-list">
                        {producto.controls.map((control, i) => (
                            <li key={i}>
                                <strong>{i + 1}. {control.name}:</strong> {control.desc}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {producto.video && (
                <div className="pedal-video">
                    <iframe
                        width="100%"
                        height="500"
                        src={`https://www.youtube.com/embed/${producto.video}`}
                        title="Demo YouTube"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    );
}
