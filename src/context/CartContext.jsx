import { createContext, useState, useContext, useEffect } from "react";
import {
  doc,
  getDoc,
  writeBatch,
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase"; // ajustá la ruta si tu firebase.js está en otro lado

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [openCartCallback, setOpenCartCallback] = useState(null);

  // Al montar: cargar localStorage y validar en Firebase
  useEffect(() => {
    const loadCart = async () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        const validatedCart = [];
        for (const item of parsedCart) {
          try {
            const ref = doc(db, "productos", item.id);
            const snap = await getDoc(ref);

            if (snap.exists()) {
              const data = snap.data();
              if (data.stock > 0) {
                validatedCart.push({
                  ...item,
                  price: data.price,
                  stock: data.stock,
                  quantity: Math.min(item.quantity, data.stock), // no superar stock
                });
              }
            }
          } catch (error) {
            console.error("Error validando producto:", error);
          }
        }

        setCart(validatedCart);
        localStorage.setItem("cart", JSON.stringify(validatedCart));
      }
    };

    loadCart();
  }, []);

  // Guardar carrito cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Agregar producto respetando stock
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        if (exists.quantity < product.stock) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          alert("No hay más stock disponible de este producto.");
          return prev;
        }
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    if (openCartCallback) openCartCallback();
  };

  // Aumentar cantidad respetando stock
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity < item.stock ? item.quantity + 1 : item.quantity,
            }
          : item
      )
    );
  };

  // Disminuir cantidad
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Eliminar producto
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Vaciar carrito
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Checkout: crear orden + descontar stock
  const checkout = async (userData) => {
    try {
      const batch = writeBatch(db);

      for (const item of cart) {
        const ref = doc(db, "productos", item.id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          throw new Error(`El producto ${item.id} no existe`);
        }

        const data = snap.data();
        if (data.stock < item.quantity) {
          throw new Error(`No hay stock suficiente de ${data.name}`);
        }

        batch.update(ref, { stock: data.stock - item.quantity });
      }

      const order = {
        user: userData,
        items: cart,
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
        status: "pending",
        createdAt: serverTimestamp(),
      };

      const ordersRef = collection(db, "orders");
      const orderDoc = await addDoc(ordersRef, order);

      await batch.commit();
      clearCart();
      return orderDoc.id;
    } catch (error) {
      console.error("Error en checkout:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQty,
        decreaseQty,
        checkout,
        setOpenCartCallback,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
