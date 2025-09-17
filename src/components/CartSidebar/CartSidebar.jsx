import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./CartSidebar.css";



export default function CartSidebar({ isOpen, onClose }) {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Sin productos en tu carrito</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Tu carrito esta vacio</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <p className="item-name">{item.name}</p>
                {item.color && <p className="item-color">{item.color}</p>}
                <div className="item-qty-price">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑</button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-footer">
          <p className="cart-total">Total: ${total.toFixed(2)}</p>
          <Link to="/checkout" className="checkout-btn">Proceder al pago</Link>
        </div>
      )}
    </div>
  );
}
