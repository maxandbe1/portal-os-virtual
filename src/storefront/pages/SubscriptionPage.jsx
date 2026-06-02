// src/storefront/pages/SubscriptionPage.jsx

import React from "react";
import { useSubscription } from "../../subscriptions/SubscriptionProvider.jsx";

export function SubscriptionPage({ onBack }) {
  const { plans, subscription, subscribe, cancel } = useSubscription();

  return (
    <div style={{ padding: 32 }}>
      <button onClick={onBack} style={{ marginBottom: 16 }}>
        ← Back
      </button>

      <h1>Subscriptions</h1>

      {subscription && subscription.status === "active" && (
        <div style={{ margin: "16px 0", padding: 12, border: "1px solid rgba(255,255,255,0.2)" }}>
          <div>Current plan: <strong>{subscription.planId}</strong></div>
          <button onClick={cancel} style={{ marginTop: 8 }}>
            Cancel subscription
          </button>
        </div>
      )}

      <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
        {plans.map(plan => (
          <div
            key={plan.id}
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: 16
            }}
          >
            <h3>{plan.name}</h3>
            <p style={{ opacity: 0.8 }}>{plan.description}</p>
            <div style={{ marginTop: 8 }}>
              <strong>
                {plan.price.amount} {plan.price.currency} / {plan.price.interval}
              </strong>
            </div>
            <ul style={{ marginTop: 8, opacity: 0.8, fontSize: 13 }}>
              {plan.perks.map(p => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <button
              onClick={() => subscribe(plan.id)}
              style={{ marginTop: 12 }}
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
