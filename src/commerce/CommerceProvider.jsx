// src/commerce/CommerceProvider.jsx

import React, { createContext, useContext, useState } from "react";
import {
  addToCart as engineAdd,
  removeFromCart as engineRemove,
  getCart as engineGet,
  getCartTotal as engineTotal,
  createOrder as engineCreateOrder
} from "./commerceEngine.js";

const CommerceContext = createContext(null);

export function CommerceProvider({ children }) {
  const [cart, setCart] = useState(engineGet());
  const [lastOrder, setLastOrder] = useState(null);

  function addToCart(product) {
    engineAdd(product);
    setCart(engineGet());
  }

  function removeFromCart(id) {
    engineRemove(id);
    setCart(engineGet());
  }

  function checkout() {
    const order = engineCreateOrder();
    setLastOrder(order);
    setCart(engineGet());
    return order;
  }

  const value = {
    cart,
    total: engineTotal(),
    lastOrder,
    addToCart,
    removeFromCart,
    checkout
  };

  return (
    <CommerceContext.Provider value={value}>
      {children}
    </CommerceContext.Provider>
  );
}

export function useCommerce() {
  const ctx = useContext(CommerceContext);
  if (!ctx) throw new Error("useCommerce must be used within CommerceProvider");
  return ctx;
}
