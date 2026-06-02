// src/storefront/components/SubscriptionGate.jsx

import React from "react";
import { useSubscription } from "../../subscriptions/SubscriptionProvider.jsx";
import { hasAccessToProduct } from "../../subscriptions/entitlementEngine.js";

export function SubscriptionGate({ product, children, onRequireSubscription }) {
  const { subscription } = useSubscription();

  const allowed = hasAccessToProduct(subscription, product);

  if (allowed) return children;

  return (
    <div style={{ padding: 16, border: "1px dashed rgba(255,255,255,0.3)", borderRadius: 8 }}>
      <div style={{ marginBottom: 8 }}>
        This content is available to subscribers.
      </div>
      <button onClick={onRequireSubscription}>
        View subscription options
      </button>
    </div>
  );
}
