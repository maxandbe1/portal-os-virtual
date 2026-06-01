// src/storefront/components/ProductCard.jsx
// Portal‑OS Storefront — Product Surface (v1)
// Minimal product card for the storefront layer.

import React from "react";

export function ProductCard({ product, onSelect }) {
  if (!product) return null;

  const { title, description, format, metadata } = product;

  const identityHash =
    metadata?.identity?.[0]?.hash ??
    metadata?.identity?.hash ??
    null;

  return (
    <div
      className="product-card"
      onClick={() => onSelect && onSelect(product)}
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        padding: 16,
        cursor: "pointer",
        background: "rgba(0,0,0,0.4)"
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.7 }}>{format?.toUpperCase()}</div>
      <h3 style={{ margin: "4px 0 8px", fontSize: 18 }}>{title}</h3>
      <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 8 }}>
        {description}
      </p>
      {identityHash && (
        <div style={{ fontSize: 11, opacity: 0.6 }}>
          Identity Signature: {identityHash}
        </div>
      )}
    </div>
  );
}
