import { useEffect, useState } from "react";
import './Navbar.css';
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import CartSidebar from "../CartSidebar/CartSidebar";
import { useCart } from "../../context/CartContext"; // Importa el hook

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);  // menú hamburguesa
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart(); // <-- dentro del componente
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setCartOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="navigation w-nav">
      <div className="navigation-items">
        <button
          className={`hamburger ${cartOpen ? "is-active" : ""}`}
          onClick={() => setCartOpen(!cartOpen)}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>

        <Link to="/" className="logo-link w-nav-brand w--current">
          <img
            src={assets.gumoefectos_logo_black}
            width="200"
            alt="Logo Gumo Efectos"
            className="logo-image"
          />
        </Link>

        <nav className={`navigation-items w-nav-menu ${cartOpen ? "open" : ""}`}>
          <Link to="/pedals" className="navigation-item w-nav-link" onClick={() => setCartOpen(false)}>PEDALES</Link>
          <a href="#nosotros" className="navigation-item w-nav-link" onClick={() => setCartOpen(false)}>NOSOTROS</a>
          <Link to="/faq" className="navigation-item w-nav-link" onClick={() => setCartOpen(false)}>FAQ</Link>
          <a href="#contacto" className="navigation-item w-nav-link" onClick={() => setCartOpen(false)}>CONTACTO</a>
          <button className="navigation-item w-nav-link" onClick={() => setCartOpen(true)}>
            CART {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </button>
        </nav>

        <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </div>
  );
}
