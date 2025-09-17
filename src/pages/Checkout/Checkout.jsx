// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

// Modal de éxito
function SuccessModal({ orderId, onClose }) {
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Compra exitosa ✅</h2>
                <p>Tu orden ha sido generada con ID: {orderId}</p>
                <p>En breve recibirás un correo con la información de tu compra.</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}

export default function Checkout() {
    const { cart, checkout, clearCart } = useCart();
    const navigate = useNavigate();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [showModal, setShowModal] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPayment, setSelectedPayment] = useState(""); // trackear método de pago

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const initialValues = {
        email: "",
        firstName: "",
        lastName: "",
        company: "",
        phone: "",
        cuit: "",
        address1: "",
        address2: "",
        postalCode: "",
        country: "Argentina",
        paymentMethod: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Email inválido").required("Campo obligatorio"),
        firstName: Yup.string().required("Campo obligatorio"),
        lastName: Yup.string().required("Campo obligatorio"),
        phone: Yup.string().required("Campo obligatorio"),
        cuit: Yup.string().required("Campo obligatorio"),
        address1: Yup.string().required("Campo obligatorio"),
        postalCode: Yup.string().required("Campo obligatorio"),
        paymentMethod: Yup.string().required("Selecciona un método de pago"),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const id = await checkout(values);
            setOrderId(id);
            setShowModal(true);
            resetForm();
        } catch (error) {
            alert("❌ Error al procesar la compra, intenta de nuevo.");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        clearCart(); // limpia carrito al cerrar modal
        setShowModal(false);
        navigate("/"); 
    };

    if (loading) {
        return (
            <div className="checkout-loading">
                <p>Cargando Checkout...</p>
            </div>
        );
    }

    // Descuento 15% si se selecciona Transferencia
    const discount = selectedPayment === "Transferencia" ? total * 0.15 : 0;
    const totalWithDiscount = total - discount;

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">Checkout</h1>

            <div className="checkout-grid">
                <div className="checkout-form">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                {/* SECCIÓN 1: CORREO */}
                                <div className="checkout-section card">
                                    <h2>Correo de contacto</h2>
                                    <label>
                                        <Field type="email" name="email" placeholder="Correo Electrónico" />
                                        <ErrorMessage name="email" component="div" className="error" />
                                    </label>
                                </div>

                                {/* SECCIÓN 2: DIRECCIÓN DE ENVÍO */}
                                <div className="checkout-section card">
                                    <h2>Dirección de envío</h2>
                                    <div className="grid-2">
                                        <label>
                                            <Field type="text" name="firstName" placeholder="Primer Nombre" />
                                            <ErrorMessage name="firstName" component="div" className="error" />
                                        </label>
                                        <label>
                                            <Field type="text" name="lastName" placeholder="Apellido" />
                                            <ErrorMessage name="lastName" component="div" className="error" />
                                        </label>
                                    </div>

                                    <div className="grid-2">
                                        <Field type="text" name="company" placeholder="Empresa (opcional)" />
                                        <Field type="text" name="phone" placeholder="Teléfono" />
                                    </div>
                                    <ErrorMessage name="phone" component="div" className="error" />

                                    <label>
                                        <Field type="text" name="cuit" placeholder="CUIT o DNI" />
                                        <ErrorMessage name="cuit" component="div" className="error" />
                                    </label>

                                    <div className="grid-2">
                                        <Field type="text" name="address1" placeholder="Dirección 1" />
                                        <Field type="text" name="address2" placeholder="Dirección 2 (opcional)" />
                                    </div>
                                    <ErrorMessage name="address1" component="div" className="error" />

                                    <div className="grid-2">
                                        <Field type="text" name="postalCode" placeholder="Código Postal" />
                                        <Field type="text" name="country" disabled />
                                    </div>
                                    <ErrorMessage name="postalCode" component="div" className="error" />
                                </div>

                                {/* SECCIÓN 3: MÉTODO DE PAGO */}
                                <div className="checkout-section card">
                                    <h2>Método de Pago</h2>
                                    <label className="payment-option">
                                        <Field
                                            type="radio"
                                            name="paymentMethod"
                                            value="Transferencia"
                                            onClick={() => setSelectedPayment("Transferencia")}
                                        />
                                        Transferencia bancaria (15% de Descuento)
                                    </label>
                                    <label className="payment-option">
                                        <Field
                                            type="radio"
                                            name="paymentMethod"
                                            value="Mercado Pago"
                                            onClick={() => setSelectedPayment("Mercado Pago")}
                                        />
                                        Mercado Pago
                                    </label>
                                    <label className="payment-option">
                                        <Field
                                            type="radio"
                                            name="paymentMethod"
                                            value="PayPal"
                                            onClick={() => setSelectedPayment("PayPal")}
                                        />
                                        PayPal
                                    </label>
                                    <ErrorMessage name="paymentMethod" component="div" className="error" />
                                </div>

                                <button type="submit" className="confirm-btn" disabled={isSubmitting || cart.length === 0}>
                                    {isSubmitting ? "Procesando..." : "Confirmar compra"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>

                <div className="checkout-summary card">
                    <h2>Resumen de tu pedido</h2>

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => {
                            clearCart();
                            navigate("/");
                        }}
                    >
                        Cancelar y Continuar comprando
                    </button>

                    {cart.length === 0 ? (
                        <p>Tu carrito está vacío</p>
                    ) : (
                        <>
                            <ul className="summary-items">
                                {cart.map((item) => (
                                    <li key={item.id} className="summary-item">
                                        <img src={item.image} alt={item.name} className="summary-img" />
                                        <div className="summary-details">
                                            <p className="item-name">{item.name}</p>
                                            <p className="item-qty">Cantidad: {item.quantity}</p>
                                            <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="order-summary">
                                <h3>Resumen del pedido</h3>
                                <p>Subtotal: $ {total.toFixed(2)}</p>
                                {discount > 0 && <p>Descuento: -$ {discount.toFixed(2)}</p>}
                                <p>Costo de envío: Gratis por Correo Argentino</p>
                                <p className="order-total">Total de la Orden: $ {totalWithDiscount.toFixed(2)}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {showModal && <SuccessModal orderId={orderId} onClose={handleCloseModal} />}
        </div>
    );
}
