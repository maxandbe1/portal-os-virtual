// src/publishing/metadata/metadataEngine.js
// Portal‑OS Publishing System — Metadata Engine (v1)
// Enriches ingested assets with structured metadata for packaging, indexing, and storefront use.

import { v4 as uuid } from "uuid";

// Utility: normalize numeric values into 0–1 range
function normalize(value, min, max) {
  if (max === min) return 0;
  return (value - min) / (max - min);
}

// Utility: hash a string into a stable numeric signature
function hashString(str) {
  if (!str) return 0;
  return [...str].reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

// Generate attractor signature from attractor state or path
function generateAttractorSignature(data) {
  if (!data) return null;

  if (Array.isArray(data)) {
    // Path: compute centroid + variance
    const xs = data.map(p => p.x);
    const ys = data.map(p => p.y);
    const zs = data.map(p => p.z);

    const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    const variance = arr => {
      const m = avg(arr);
      return avg(arr.map(v => (v - m) ** 2));
    };

    return {
      centroid: {
        x: avg(xs),
        y: avg(ys),
        z: avg(zs)
      },
      variance: {
        x: variance(xs),
        y: variance(ys),
        z: variance(zs)
      }
    };
  }

  // Single state
  return {
    centroid: { ...data },
    variance: { x: 0, y: 0, z: 0 }
  };
}

// Generate semantic topology descriptor
function generateSemanticTopology(meaning) {
  if (!meaning) return null;

  const h = hashString(meaning);
  return {
    seed: h,
    curvature: (h % 100) / 100,
    density: ((h >> 2) % 100) / 100,
    symmetry: ((h >> 4) % 100) / 100
  };
}

// Generate memory imprint descriptor
function generateMemoryDescriptor(imprint) {
  if (!imprint) return null;

  return {
    distortion: imprint.distortion,
    weight: imprint.weight,
    domain: imprint.domain,
    decayRate: imprint.decayRate
  };
}

// Generate identity genome descriptor
function generateGenomeDescriptor(genome) {
  if (!genome) return null;

  return {
    hueShift: genome.hueShift,
    chaos: genome.chaos,
    stability: genome.stability,
    symmetry: genome.symmetry,
    particleBias: genome.particleBias,
    attractorScale: genome.attractorScale
  };
}

// Main metadata enrichment function
export function enrichMetadata(asset) {
  if (!asset) throw new Error("Cannot enrich metadata: missing asset.");

  const { type, data, metadata } = asset;

  const enriched = {
    id: uuid(),
    assetId: asset.id,
    type,
    timestamp: Date.now(),
    base: metadata || {},
    identity: null,
    meaning: null,
    pattern: null,
    attractor: null,
    semantic: null,
    memory: null,
    genome: null
  };

  // Identity metadata
  if (metadata.identity) {
    enriched.identity = {
      raw: metadata.identity,
      hash: hashString(metadata.identity)
    };
  }

  // Meaning metadata
  if (metadata.meaning) {
    enriched.meaning = {
      raw: metadata.meaning,
      hash: hashString(metadata.meaning)
    };
  }

  // Pattern metadata
  if (metadata.pattern) {
    enriched.pattern = {
      raw: metadata.pattern,
      hash: hashString(metadata.pattern)
    };
  }

  // Attractor signature
  if (metadata.attractorState || metadata.attractorPath) {
    enriched.attractor = generateAttractorSignature(
      metadata.attractorPath || metadata.attractorState
    );
  }

  // Semantic topology
  if (metadata.meaning) {
    enriched.semantic = generateSemanticTopology(metadata.meaning);
  }

  // Memory imprint descriptor
  if (metadata.imprint) {
    enriched.memory = generateMemoryDescriptor(metadata.imprint);
  }

  // Genome descriptor
  if (metadata.identityGenome) {
    enriched.genome = generateGenomeDescriptor(metadata.identityGenome);
  }

  return enriched;
}
