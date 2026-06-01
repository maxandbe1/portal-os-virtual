// src/publishing/ingestion/assetIngestion.js
// Portal‑OS Publishing System — Asset Ingestion Module (v1)
// Receives raw outputs from the Canvas Organism + Extraction Layer
// Normalizes them into Publishing Asset Objects
// Stores them in a local JSON archive (v0 implementation)

import { v4 as uuid } from "uuid";

// Local in‑memory archive (v0)
// In production, this becomes KV / D1 / S3 / Supabase / etc.
let assetArchive = [];

// Normalize raw organism output into a Publishing Asset Object
export function ingestAsset({ type, data, metadata = {} }) {
  if (!type || !data) {
    throw new Error("Asset ingestion failed: missing type or data.");
  }

  const asset = {
    id: uuid(),
    type,              // "frame" | "sequence" | "imprint" | "path" | "genome"
    data,              // raw payload (image, JSON, vector, etc.)
    metadata: {
      ...metadata,
      createdAt: Date.now()
    },
    timestamp: Date.now()
  };

  assetArchive.push(asset);

  // Keep archive bounded (v0)
  if (assetArchive.length > 5000) {
    assetArchive.shift();
  }

  return asset;
}

// Retrieve all assets
export function getAllAssets() {
  return [...assetArchive];
}

// Retrieve assets by type
export function getAssetsByType(type) {
  return assetArchive.filter(a => a.type === type);
}

// Retrieve a single asset
export function getAsset(id) {
  return assetArchive.find(a => a.id === id) || null;
}

// Clear archive (dev only)
export function clearAssetArchive() {
  assetArchive = [];
}
