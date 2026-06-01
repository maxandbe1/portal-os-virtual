// src/storefront/pages/ProductDetailPage.jsx

import React from "react";
import { useCommerce } from "../../commerce/CommerceProvider.jsx";
import { getProductPrice } from "../../commerce/pricingConfig.js";

export function ProductDetailPage({ product, onBack }) {
  const { addToCart } = useCommerce();
  if (!product) return null;

  const price = getProductPrice(product);

  function handleAdd() {
    addToCart(product);
  }

  return (
    <div style={{ padding: 32 }}>
      <button onClick={onBack} style={{ marginBottom: 16 }}>
        ← Back
      </button>
      <h1>{product.title}</h1>
      <p style={{ maxWidth: 480, opacity: 0.8 }}>{product.description}</p>
      <div style={{ margin: "16px 0" }}>
        <strong>{price.amount} {price.currency}</strong>
      </div>
      <button onClick={handleAdd}>Add to cart</button>
    </div>
  );
}

