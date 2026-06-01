// src/storefront/pages/CheckoutPage.jsx

import React from "react";
import { useCommerce } from "../../commerce/CommerceProvider.jsx";

export function CheckoutPage({ onBack }) {
  const { cart, total, checkout, lastOrder } = useCommerce();

  function handleCheckout() {
    try {
      checkout();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div style={{ padding: 32 }}>
      <button onClick={onBack} style={{ marginBottom: 16 }}>
        ← Back to Storefront
      </button>
      <h1>Checkout</h1>

      {cart.length === 0 && !lastOrder && (
        <div style={{ opacity: 0.7 }}>Your cart is empty.</div>
      )}

      {cart.length > 0 && (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.product.title} — {item.price.amount} {item.price.currency}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 12 }}>
            <strong>Total: {total.amount} {total.currency}</strong>
          </div>
          <button onClick={handleCheckout} style={{ marginTop: 16 }}>
            Confirm Order
          </button>
        </>
      )}

      {lastOrder && (
        <div style={{ marginTop: 24 }}>
          <h2>Order created</h2>
          <div>Order ID: {lastOrder.orderId}</div>
          <div>
            Total: {lastOrder.total.amount} {lastOrder.total.currency}
          </div>
        </div>
      )}
    </div>
  );
}
