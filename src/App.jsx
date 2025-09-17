// App.jsx
import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Pedals from "./pages/Pedals/Pedals";
import PedalDetail from "./pages/PedalDetail/PedalDetail";
import CartSidebar from "./components/CartSidebar/CartSidebar";
import Checkout from "./pages/CheckOut/CheckOut";
import { useCart } from "./context/CartContext";
import Faq from "./pages/Faq/Faq";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { setOpenCartCallback } = useCart();

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const openCart = () => setIsCartOpen(true);

  // Registrar la callback al montar el componente
  useEffect(() => {
    setOpenCartCallback(() => openCart);
  }, [setOpenCartCallback]);

  // Ocultar sidebar en checkout
  const hideSidebar = location.pathname === "/checkout";

  return (
    <div className="app">
      <Navbar openCart={toggleCart} />

      {!hideSidebar && (
        <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pedals" element={<Pedals />} />
        <Route path="/pedals/:id" element={<PedalDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/faq" element={<Faq />} />

      </Routes>
    </div>
  );
}

export default App;
