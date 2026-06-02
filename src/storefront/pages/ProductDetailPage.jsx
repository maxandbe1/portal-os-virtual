// src/storefront/pages/ProductDetailPage.jsx
// Portal‑OS — Product Detail Surface (v3)
// Fully wired with Commerce, SubscriptionGate, Recommendations

import React from "react";
import { useCommerce } from "../../commerce/CommerceProvider.jsx";
import { getProductPrice } from "../../commerce/pricingConfig.js";

// Subscription
import { SubscriptionGate } from "../components/SubscriptionGate.jsx";

// Recommendations
import {
  recommendForProduct,
  recommendCollectionsForProduct,
  recommendDropsForProduct
} from "../../recommendation/recommendationEngine.js";

import { RecommendationStrip } from "../components/RecommendationStrip.jsx";

export function ProductDetailPage({
  product,
  onBack,
  onGoSubscription,
  onSelectProduct,
  onSelectCollection,
  onSelectDrop
}) {
  const { addToCart } = useCommerce();
  if (!product) return null;

  const price = getProductPrice(product);

  // Recommendations
  const recProducts = recommendForProduct(product);
  const recCollections = recommendCollectionsForProduct(product);
  const recDrops = recommendDropsForProduct(product);

  return (
    <div style={{ padding: 32 }}>
      {/* Back button */}
      <button onClick={onBack} style={{ marginBottom: 16 }}>
        ← Back
      </button>

      {/* Title + description */}
      <h1>{product.title}</h1>
      <p style={{ maxWidth: 480, opacity: 0.8 }}>{product.description}</p>

      {/* ⭐ SUBSCRIPTION GATE WRAPS ALL PROTECTED CONTENT */}
      <SubscriptionGate
        product={product}
        onRequireSubscription={onGoSubscription}
      >
        {/* Visible only if user has access */}
        <div style={{ marginTop: 16 }}>
          <strong>{price.amount} {price.currency}</strong>
        </div>

        <button
          onClick={() => addToCart(product)}
          style={{ marginTop: 16 }}
        >
          Add to Cart
        </button>

        {/* Metadata */}
        <div style={{ marginTop: 32 }}>
          <h3>Metadata</h3>
          <pre style={{ opacity: 0.7, fontSize: 12 }}>
            {JSON.stringify(product.metadata, null, 2)}
          </pre>
        </div>
      </SubscriptionGate>

      {/* ⭐ RECOMMENDATIONS */}
      <RecommendationStrip
        title="You may also like"
        products={recProducts}
        collections={recCollections}
        drops={recDrops}
        onSelectProduct={onSelectProduct}
        onSelectCollection={onSelectCollection}
        onSelectDrop={onSelectDrop}
      />
    </div>
  );
}

