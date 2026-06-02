// src/subscriptions/subscriptionPlans.js

export const SUBSCRIPTION_PLANS = [
  {
    id: "supporter",
    name: "Supporter",
    description: "Access to selected drops and collections.",
    price: { amount: 9, currency: "USD", interval: "month" },
    perks: ["Access to supporter‑only drops", "Early access to new products"]
  },
  {
    id: "collector",
    name: "Collector",
    description: "Full access to all drops and collections.",
    price: { amount: 29, currency: "USD", interval: "month" },
    perks: [
      "All supporter perks",
      "Access to all drops",
      "Exclusive organism sequences"
    ]
  }
];

export function getPlanById(id) {
  return SUBSCRIPTION_PLANS.find(p => p.id === id) || null;
}
