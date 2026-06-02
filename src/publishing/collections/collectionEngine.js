// src/publishing/collections/collectionEngine.js
// Portal‑OS Publishing System — Collection Engine (v1)
// Groups products into collections based on metadata similarity.

import { v4 as uuid } from "uuid";

let collections = [];

function similarityScore(metaA, metaB) {
  let score = 0;

  if (metaA.identity && metaB.identity) score += 1;
  if (metaA.meaning && metaB.meaning) score += 1;
  if (metaA.pattern && metaB.pattern) score += 1;
  if (metaA.attractor && metaB.attractor) score += 1;
  if (metaA.semantic && metaB.semantic) score += 1;
  if (metaA.genome && metaB.genome) score += 1;

  return score;
}

export function buildCollections(products) {
  const used = new Set();
  const newCollections = [];

  for (let i = 0; i < products.length; i++) {
    if (used.has(products[i].productId)) continue;

    const group = [products[i]];
    used.add(products[i].productId);

    for (let j = i + 1; j < products.length; j++) {
      if (used.has(products[j].productId)) continue;

      const score = similarityScore(
        products[i].metadata,
        products[j].metadata
      );

      if (score >= 3) {
        group.push(products[j]);
        used.add(products[j].productId);
      }
    }

    newCollections.push({
      id: uuid(),
      title: `Collection ${newCollections.length + 1}`,
      description: `A curated collection of ${group.length} related Portal‑OS artifacts.`,
      products: group,
      createdAt: Date.now()
    });
  }

  collections = newCollections;
  return collections;
}

export function getCollections() {
  return [...collections];
}

export function getCollection(id) {
  return collections.find(c => c.id === id) || null;
}
