// src/subscriptions/entitlementEngine.js

import { getPlanById } from "./subscriptionPlans.js";

export function hasAccessToProduct(subscription, product) {
  if (!subscription) return false;
  const plan = getPlanById(subscription.planId);
  if (!plan) return false;

  // Simple v1 rules:
  if (plan.id === "collector") return true;

  if (plan.id === "supporter") {
    // Allow non‑premium formats and non‑exclusive drops
    const isPremium =
      product.format === "sequence" ||
      product.metadata?.premium === true;
    return !isPremium;
  }

  return false;
}

export function hasAccessToDrop(subscription, drop) {
  if (!subscription) return false;
  const plan = getPlanById(subscription.planId);
  if (!plan) return false;

  if (plan.id === "collector") return true;

  if (plan.id === "supporter") {
    return drop.featured !== true; // supporter can’t see “featured‑only” drops
  }

  return false;
}
