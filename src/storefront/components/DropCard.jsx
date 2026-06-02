// src/storefront/components/DropCard.jsx

import React from "react";

export function DropCard({ drop, onSelect }) {
  const now = Date.now();
  const isActive = drop.startsAt <= now && drop.endsAt >= now;
  const label = isActive ? "Live now" : "Upcoming";

  return (
    <div
      onClick={() => onSelect(drop)}
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        padding: 16,
        cursor: "pointer",
        background: "rgba(0,0,0,0.4)"
      }}
    >
      <div style={{ fontSize: 11, opacity: 0.7 }}>{label}</div>
      <h3 style={{ margin: "4px 0 8px" }}>{drop.title}</h3>
      <p style={{ fontSize: 13, opacity: 0.8 }}>{drop.description}</p>
      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.6 }}>
        {drop.products.length} products
      </div>
    </div>
  );
}
