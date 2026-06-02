// src/storefront/components/RecommendationStrip.jsx

import React from "react";
import { ProductGrid } from "./ProductGrid.jsx";
import { CollectionGrid } from "./CollectionGrid.jsx";
import { DropGrid } from "./DropGrid.jsx";

export function RecommendationStrip({ title, products, collections, drops, onSelectProduct, onSelectCollection, onSelectDrop }) {
  return (
    <div style={{ marginTop: 48 }}>
      <h2 style={{ marginBottom: 16 }}>{title}</h2>

      {products && products.length > 0 && (
        <ProductGrid products={products} onSelect={onSelectProduct} />
      )}

      {collections && collections.length > 0 && (
        <CollectionGrid collections={collections} onSelect={onSelectCollection} />
      )}

      {drops && drops.length > 0 && (
        <DropGrid drops={drops} onSelect={onSelectDrop} />
      )}
    </div>
  );
}
