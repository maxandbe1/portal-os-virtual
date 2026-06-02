// src/storefront/components/CollectionGrid.jsx

import React from "react";
import { CollectionCard } from "./CollectionCard.jsx";

export function CollectionGrid({ collections, onSelect }) {
  if (!collections || collections.length === 0) {
    return <div style={{ opacity: 0.6 }}>No collections available yet.</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 16
      }}
    >
      {collections.map(c => (
        <CollectionCard key={c.id} collection={c} onSelect={onSelect} />
      ))}
    </div>
  );
}
