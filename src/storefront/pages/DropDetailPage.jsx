// src/storefront/pages/DropDetailPage.jsx

import React from "react";
import { ProductGrid } from "../components/ProductGrid.jsx";

export function DropDetailPage({ drop, onBack, onSelectProduct }) {
  if (!drop) return null;

  return (
    <div style={{ padding: 32 }}>
      <button onClick={onBack} style={{ marginBottom: 16 }}>
        ← Back to Drops
      </button>

      <h1>{drop.title}</h1>
      <p style={{ maxWidth: 480, opacity: 0.8 }}>{drop.description}</p>

      <h3 style={{ marginTop: 24 }}>Included products</h3>
      <ProductGrid products={drop.products} onSelect={onSelectProduct} />
    </div>
  );
}
