import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext(null);

const STORAGE_KEY = 'ferreteria_cart';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error al cargar carrito:', e);
      return [];
    }
  });

  // Guardar carrito en localStorage en cada cambio
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error al guardar carrito:', e);
    }
  }, [cart]);

  /**
   * Agregar producto al carrito o incrementar su cantidad
   */
  const addToCart = (product, quantity = 1) => {
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].cantidad + qty;
        updated[existingIndex] = {
          ...updated[existingIndex],
          cantidad: product.stock ? Math.min(newQty, product.stock) : newQty,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: product.id,
          nombre: product.nombre,
          precio: Number(product.precio),
          imagen: product.imagen,
          categoria: product.categoria,
          unidadMedida: product.unidadMedida || 'Unidad',
          stock: product.stock,
          cantidad: qty,
        },
      ];
    });
  };

  /**
   * Modificar cantidad de un ítem existente
   */
  const updateQuantity = (productId, quantity) => {
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const clampedQty = item.stock ? Math.min(qty, item.stock) : qty;
          return { ...item, cantidad: clampedQty };
        }
        return item;
      })
    );
  };

  /**
   * Eliminar producto del carrito
   */
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  /**
   * Vaciar carrito completamente
   */
  const clearCart = () => {
    setCart([]);
  };

  // Cálculos derivados
  const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const totalAmount = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  // Cálculo de IVA (19% desglosado estándar en Chile)
  const neto = Math.round(totalAmount / 1.19);
  const iva = totalAmount - neto;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        totalAmount,
        neto,
        iva,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
