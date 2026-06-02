// src/storefront/pages/CollectionPage.jsx

import React, { useEffect, useState } from "react";
import { CollectionGrid } from "../components/CollectionGrid.jsx";
import { buildCollections, getCollections } from "../../publishing/collections/collectionEngine.js";
import { getProductsForChannel } from "../../publishing/distribution/distributionEngine.js";

export function CollectionPage({ onSelect, onBack }) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const products = getProductsForChannel("storefront");
    buildCollections(products);
    setCollections(getCollections());
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <button onClick={onBack} style={{ marginBottom: 16 }}>
        ← Back
      </button>

      <h1 style={{ marginBottom: 24 }}>Collections</h1>
      <CollectionGrid collections={collections} onSelect={onSelect} />
    </div>
  );
}
