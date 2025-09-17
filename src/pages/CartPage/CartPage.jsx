import { useCart } from "../../context/CartContext";
import "./CartPage.css";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  // Calcular el total
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart-page">
      <h1>Tu Carrito</h1>

      {/* Si no hay productos */}
      {cart.length === 0 ? (
        <p>No tienes productos en el carrito.</p>
      ) : (
        <>
          {/* Items del carrito */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>{item.subtitle}</p>
                    <p><strong>${item.price}</strong></p>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>

          {/* Total y acciones */}
          <div className="cart-total">
            <h2>Total: ${total}</h2>
            <button onClick={() => alert("Checkout en construcción 🚧")}>
              Finalizar Compra
            </button>
            <br />
            <button onClick={clearCart} style={{ background: "#999", marginTop: "10px" }}>
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}
