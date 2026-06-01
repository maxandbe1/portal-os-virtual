// src/publishing/distribution/distributionEngine.js
// Portal‑OS Publishing System — Distribution Engine (v1)
// Decides which products are exposed to which channels.

const CHANNELS = ["storefront", "featured", "drop", "archive"];

let distributionTable = new Map(); // productId -> { channels: [...], priority }

export function registerProductForDistribution(product, options = {}) {
  const {
    channels = ["storefront"],
    priority = 1
  } = options;

  distributionTable.set(product.productId, {
    product,
    channels,
    priority
  });
}

export function getProductsForChannel(channel) {
  const results = [];
  for (const entry of distributionTable.values()) {
    if (entry.channels.includes(channel)) {
      results.push(entry.product);
    }
  }
  return results.sort((a, b) => {
    const pa = distributionTable.get(a.productId).priority;
    const pb = distributionTable.get(b.productId).priority;
    return pb - pa;
  });
}

export function getDistributionInfo(productId) {
  return distributionTable.get(productId) || null;
}

export function clearDistribution() {
  distributionTable = new Map();
}
