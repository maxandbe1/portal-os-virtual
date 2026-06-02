// src/recommendation/recommendationEngine.js
// Portal‑OS — Cross‑Domain Recommendation Engine (v1)

import { getAllProducts } from "../publishing/packaging/packagingEngine.js";
import { getCollections } from "../publishing/collections/collectionEngine.js";
import { getAllDrops } from "../publishing/drops/dropEngine.js";

function scoreMetadataSimilarity(a, b) {
  let score = 0;

  if (a.identity && b.identity) score += 1;
  if (a.meaning && b.meaning) score += 1;
  if (a.pattern && b.pattern) score += 1;
  if (a.semantic && b.semantic) score += 1;
  if (a.attractor && b.attractor) score += 1;
  if (a.genome && b.genome) score += 1;

  return score;
}

export function recommendForProduct(product) {
  const all = getAllProducts();

  const scored = all
    .filter(p => p.productId !== product.productId)
    .map(p => ({
      product: p,
      score: scoreMetadataSimilarity(product.metadata, p.metadata)
    }))
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 6).map(s => s.product);
}

export function recommendCollectionsForProduct(product) {
  const collections = getCollections();

  const scored = collections.map(c => {
    const matchCount = c.products.filter(p =>
      scoreMetadataSimilarity(product.metadata, p.metadata) >= 3
    ).length;

    return { collection: c, score: matchCount };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => s.collection);
}

export function recommendDropsForProduct(product) {
  const drops = getAllDrops();

  const scored = drops.map(d => {
    const matchCount = d.products.filter(p =>
      scoreMetadataSimilarity(product.metadata, p.metadata) >= 3
    ).length;

    return { drop: d, score: matchCount };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => s.drop);
}
