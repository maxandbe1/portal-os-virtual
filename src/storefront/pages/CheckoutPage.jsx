// src/storefront/pages/CheckoutPage.jsx
// Portal‑OS — Checkout Surface (v2)
// Fully wired with Commerce + Licensing

import React from "react";
import { useCommerce } from "../../commerce/CommerceProvider.jsx";
import { useLicensing } from "../../licensing/LicensingProvider.jsx";

export function CheckoutPage({ onBack }) {
  const { cart, total, checkout, lastOrder } = useCommerce();
  const { registerOrder } = useLicensing();

  function handleCheckout() {
    try {
      const order = checkout();      // create order in commerce engine
      registerOrder(order);          // register license grants
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

      {/* EMPTY CART */}
      {cart.length === 0 && !lastOrder && (
        <div style={{ opacity: 0.7 }}>Your cart is empty.</div>
      )}

      {/* CART ITEMS */}
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

          {/* ⭐ THIS IS THE CORRECT LOCATION FOR THE BUTTON */}
          <button onClick={handleCheckout} style={{ marginTop: 16 }}>
            Confirm Order
          </button>
        </>
      )}

      {/* ORDER CONFIRMATION */}
      {lastOrder && (
        <div style={{ marginTop: 24 }}>
          <h2>Order Created</h2>
          <div>Order ID: {lastOrder.orderId}</div>
          <div>
            Total: {lastOrder.total.amount} {lastOrder.total.currency}
          </div>
        </div>
      )}
    </div>
  );
}

