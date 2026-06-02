// src/storefront/components/CollectionCard.jsx

import React from "react";

export function CollectionCard({ collection, onSelect }) {
  return (
    <div
      onClick={() => onSelect(collection)}
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        padding: 16,
        cursor: "pointer",
        background: "rgba(0,0,0,0.4)"
      }}
    >
      <h3 style={{ marginBottom: 8 }}>{collection.title}</h3>
      <p style={{ opacity: 0.7, fontSize: 13 }}>
        {collection.description}
      </p>
      <div style={{ marginTop: 8, opacity: 0.6, fontSize: 12 }}>
        {collection.products.length} products
      </div>
    </div>
  );
}

