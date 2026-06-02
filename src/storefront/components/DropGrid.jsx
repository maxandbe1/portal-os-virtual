// src/storefront/components/DropGrid.jsx

import React from "react";
import { DropCard } from "./DropCard.jsx";

export function DropGrid({ drops, onSelect }) {
  if (!drops || drops.length === 0) {
    return <div style={{ opacity: 0.6 }}>No drops scheduled.</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 16
      }}
    >
      {drops.map(d => (
        <DropCard key={d.id} drop={d} onSelect={onSelect} />
      ))}
    </div>
  );
}
