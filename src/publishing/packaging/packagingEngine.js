// src/publishing/packaging/packagingEngine.js
// Portal‑OS Publishing System — Packaging Engine (v1)
// Converts enriched assets into publishable Product Objects.

import { v4 as uuid } from "uuid";

// Local product archive (v0)
let productArchive = [];

// Create a base product object
function createBaseProduct({ title, description, assets, metadata, format }) {
  return {
    productId: uuid(),
    title,
    description,
    assets,          // array of asset IDs or asset objects
    metadata,        // merged metadata from all assets
    format,          // "poster" | "pack" | "sequence" | "card" | etc.
    edition: {
      size: null,    // unlimited by default
      number: null
    },
    createdAt: Date.now()
  };
}

// Merge metadata from multiple assets
function mergeMetadata(assetMetadataList) {
  const merged = {
    identity: [],
    meaning: [],
    pattern: [],
    attractor: [],
    semantic: [],
    memory: [],
    genome: []
  };

  for (const meta of assetMetadataList) {
    if (meta.identity) merged.identity.push(meta.identity);
    if (meta.meaning) merged.meaning.push(meta.meaning);
    if (meta.pattern) merged.pattern.push(meta.pattern);
    if (meta.attractor) merged.attractor.push(meta.attractor);
    if (meta.semantic) merged.semantic.push(meta.semantic);
    if (meta.memory) merged.memory.push(meta.memory);
    if (meta.genome) merged.genome.push(meta.genome);
  }

  return merged;
}

// Create a single‑asset product (e.g., poster, card)
export function packageSingleAsset({ asset, enrichedMetadata, format }) {
  const product = createBaseProduct({
    title: `${format.toUpperCase()} — ${asset.id}`,
    description: `A ${format} generated from the Portal‑OS Canvas Organism.`,
    assets: [asset],
    metadata: mergeMetadata([enrichedMetadata]),
    format
  });

  productArchive.push(product);
  return product;
}

// Create a multi‑asset product (e.g., pack, collection)
export function packageMultiAsset({ assets, enrichedMetadataList, format }) {
  const product = createBaseProduct({
    title: `${format.toUpperCase()} — ${assets.length} Assets`,
    description: `A curated ${format} generated from the Portal‑OS Canvas Organism.`,
    assets,
    metadata: mergeMetadata(enrichedMetadataList),
    format
  });

  productArchive.push(product);
  return product;
}

// Create a sequence edition (frames over time)
export function packageSequence({ frames, enrichedMetadataList }) {
  const product = createBaseProduct({
    title: `Organism Sequence Edition`,
    description: `A temporal evolution of the Portal‑OS Canvas Organism.`,
    assets: frames,
    metadata: mergeMetadata(enrichedMetadataList),
    format: "sequence"
  });

  productArchive.push(product);
  return product;
}

// Retrieve all products
export function getAllProducts() {
  return [...productArchive];
}

// Retrieve product by ID
export function getProduct(productId) {
  return productArchive.find(p => p.productId === productId) || null;
}

// Clear archive (dev only)
export function clearProductArchive() {
  productArchive = [];
}
