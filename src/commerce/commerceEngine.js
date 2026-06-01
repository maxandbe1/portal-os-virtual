// src/commerce/commerceEngine.js
// Cart + order management (in‑memory v1)

import { v4 as uuid } from "uuid";
import { getProductPrice } from "./pricingConfig.js";

let cartItems = []; // { id, product, price }
let orders = [];    // { orderId, items, total, createdAt }

export function addToCart(product) {
  const price = getProductPrice(product);
  const item = {
    id: uuid(),
    product,
    price
  };
  cartItems.push(item);
  return item;
}

export function removeFromCart(itemId) {
  cartItems = cartItems.filter(i => i.id !== itemId);
}

export function getCart() {
  return [...cartItems];
}

export function clearCart() {
  cartItems = [];
}

export function getCartTotal() {
  const amount = cartItems.reduce((sum, item) => sum + item.price.amount, 0);
  return {
    amount,
    currency: cartItems[0]?.price.currency ?? "USD"
  };
}

export function createOrder() {
  if (cartItems.length === 0) {
    throw new Error("Cannot create order from empty cart.");
  }

  const total = getCartTotal();
  const order = {
    orderId: uuid(),
    items: [...cartItems],
    total,
    createdAt: Date.now(),
    status: "created"
  };

  orders.push(order);
  clearCart();
  return order;
}

export function getOrders() {
  return [...orders];
}
