import { useState, useEffect } from 'react';

export const useCart = () => {
  // 1. Inicializamos leyendo el localStorage de forma segura
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('mi_ecommerce_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error("Error leyendo localStorage", e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // 2. Guardamos en el localStorage cada vez que el carrito cambie
  useEffect(() => {
    try {
      localStorage.setItem('mi_ecommerce_cart', JSON.stringify(cart));
    } catch (e) {
      console.error("Error guardando en localStorage", e);
    }
  }, [cart]);

  // Agregar al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCart, { ...product, cantidad: 1 }];
    });
  };

  // Botón "Comprar Ahora": agrega e inmediatamente abre el carrito lateral
  const buyNow = (product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  // Sumar (+1) o restar (-1) cantidad
  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.cantidad + delta;
            return newQty > 0 ? { ...item, cantidad: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Eliminar un producto completo
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Totales
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.cantidad, 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return {
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    buyNow,
    updateQuantity,
    removeFromCart,
    totalAmount,
    totalItemsCount,
  };
};