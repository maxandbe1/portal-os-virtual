import React from "react";
import { useCommerce } from "../../commerce/CommerceProvider.jsx";
import { getProductPrice } from "../../commerce/pricingConfig.js";

export function ProductDetailPage({ product, onBack }) {
  const { addToCart } = useCommerce();
  if (!product) return null;

  const price = getProductPrice(product);

  return (
    <div style={{ padding: 32 }}>
      <button onClick={onBack} style={{ marginBottom: 16 }}>
        ← Back
      </button>

      <h1>{product.title}</h1>
      <p style={{ maxWidth: 480, opacity: 0.8 }}>{product.description}</p>

      <div style={{ marginTop: 16 }}>
        <strong>{price.amount} {price.currency}</strong>
      </div>

      <button onClick={() => addToCart(product)} style={{ marginTop: 16 }}>
        Add to Cart
      </button>

      <div style={{ marginTop: 32 }}>
        <h3>Metadata</h3>
        <pre style={{ opacity: 0.7, fontSize: 12 }}>
          {JSON.stringify(product.metadata, null, 2)}
        </pre>
      </div>
    </div>
  );
}


