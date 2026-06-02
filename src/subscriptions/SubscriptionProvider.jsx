// src/subscriptions/SubscriptionProvider.jsx

import React, { createContext, useContext, useState } from "react";
import { SUBSCRIPTION_PLANS, getPlanById } from "./subscriptionPlans.js";

const SubscriptionContext = createContext(null);

export function SubscriptionProvider({ children }) {
  const [subscription, setSubscription] = useState(null);

  function subscribe(planId) {
    const plan = getPlanById(planId);
    if (!plan) throw new Error("Unknown plan: " + planId);

    const sub = {
      planId,
      startedAt: Date.now(),
      status: "active"
    };

    setSubscription(sub);
    return sub;
  }

  function cancel() {
    if (!subscription) return;
    setSubscription({
      ...subscription,
      status: "canceled",
      canceledAt: Date.now()
    });
  }

  const value = {
    subscription,
    plans: SUBSCRIPTION_PLANS,
    subscribe,
    cancel
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error("useSubscription must be used within SubscriptionProvider");
  return ctx;
}
