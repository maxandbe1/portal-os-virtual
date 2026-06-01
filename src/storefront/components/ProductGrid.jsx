// src/storefront/components/ProductGrid.jsx

import React from "react";
import { ProductCard } from "./ProductCard.jsx";

export function ProductGrid({ products, onSelect }) {
  if (!products || products.length === 0) {
    return <div style={{ opacity: 0.6 }}>No products available yet.</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16
      }}
    >
      {products.map(p => (
        <ProductCard key={p.productId} product={p} onSelect={onSelect} />
      ))}
    </div>
  );
}
