// src/storefront/pages/StorefrontPage.jsx
// Portal‑OS Storefront — Main Storefront Page (v1)

import React, { useEffect, useState } from "react";
import { ProductGrid } from "../components/ProductGrid.jsx";
import { getProductsForChannel } from "../../publishing/distribution/distributionEngine.js";

export function StorefrontPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storefrontProducts = getProductsForChannel("storefront");
    setProducts(storefrontProducts);
  }, []);

  function handleSelect(product) {
    console.log("Selected product:", product);
    // In v2: navigate to ProductDetailPage
  }

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ marginBottom: 24 }}>Portal‑OS Storefront</h1>
      <ProductGrid products={products} onSelect={handleSelect} />
    </div>
  );
}
