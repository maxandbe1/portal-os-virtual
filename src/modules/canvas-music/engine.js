// src/modules/canvas-music/engine.js
// Canvas Engine — 21-Layer Organism + Output Extraction Layer
// 01 Mood Engine
// 02 Gradients
// 03 Trails
// 04 Particles
// 05 Domain Resonance
// 06 Identity/Meaning/Pattern Fusion
// 07 Multi‑Shape Morphing
// 08 Memory Imprinting
// 09 Temporal Phase Engine
// 10 Domain‑to‑Domain Coupling
// 11 Imprint Decay Physics
// 12 Long‑Term Memory Archive
// 13 Self‑Organizing Field
// 14 Attractor Dynamics
// 15 Semantic Field Mapping
// 16 Identity Genome
// 17 Consciousness Simulation Layer
// 18 Predictive Modeling Layer
// 19 Intent Field
// 20 Meta‑Cognition Layer
// 21 Agency Kernel
// 22 Output Extraction Layer (frames, states, paths, imprints, genome snapshots)

import {
  getMoodFromSong,
  MOOD_GRADIENTS,
  MOOD_PARTICLE_STYLE
} from "./mood.js";
import { createParticles, updateParticles } from "./particles.js";
import { getDomainResonance } from "../../domains/first-domain/engine.js";
import { getDomainCouplingVector } from "../../domains/domain-coupling/engine.js";

let running = false;
let frame = 0;
let lastTime = performance.now();

let mood = "neutral";
let particles = [];

// Fusion channels
let fusionIdentity = "";
let fusionMeaning = "";
let fusionPattern = "";

// Memory systems
let memoryImprints = [];
let longTermArchive = [];

// Identity genome (multi‑gene parameter set)
let identityGenome = {
  hueShift: 0,
  chaos: 0.5,
  stability: 0.5,
  symmetry: 0.5,
  particleBias: 0.5,
  attractorScale: 1.0
};

// Attractor dynamics (Lorenz‑like)
let attractorState = { x: 0.1, y: 0, z: 0 };
const ATTRACTOR_PARAMS = {
  sigma: 10,
  rho: 28,
  beta: 8 / 3
};

// Consciousness layer state (self‑referential)
let consciousnessState = {
  lastField: 0,
  lastCoupling: 0,
  lastResonance: 0,
  loopIntensity: 0
};

// Predictive modeling layer
let predictiveState = {
  sofHistory: [],
  dcvHistory: [],
  resHistory: [],
  sofForecast: 0,
  dcvForecast: 0,
  resForecast: 0
};

// Intent field
let intentField = {
  stability: 0.5,
  chaos: 0.5,
  memory: 0.5,
  symmetry: 0.5,
  expansion: 0.5
};

// Meta‑cognition layer
let metaCognition = {
  entropy: 0,
  memoryLoad: 0,
  domainPressure: 0,
  identityDominance: 0,
  driftLevel: 0
};

// Agency kernel state (autonomous micro‑actions)
let agencyState = {
  stabilityBias: 0,
  memoryBias: 0,
  chaosBias: 0,
  symmetryBias: 0,
  lastActionTime: performance.now()
};

// Output Extraction Layer — buffers & config
let extractionConfig = {
  frameCaptureEnabled: false,
  frameCaptureInterval: 30, // frames
  maxFrames: 120,

  stateCaptureEnabled: true,
  stateCaptureInterval: 60, // frames
  maxStates: 200,

  pathCaptureEnabled: true,
  maxPathPoints: 500,

  imprintCaptureEnabled: true,
  maxImprintSnapshots: 200,

  genomeSnapshotEnabled: true,
  genomeSnapshotInterval: 120, // frames
  maxGenomeSnapshots: 100
};

let extractionBuffers = {
  frames: [],            // { frame, timestamp, dataURL }
  states: [],            // { frame, timestamp, state }
  attractorPath: [],     // { frame, x, y, z }
  imprintSnapshots: [],  // { frame, timestamp, memoryImprints, longTermArchive }
  genomeSnapshots: []    // { frame, timestamp, identityGenome }
};

// Mood → speed + shape + trail
const MOOD_STYLE = {
  energetic: { speed: 0.12, shape: "triangle", trail: 0.08 },
  romantic: { speed: 0.06, shape: "blob", trail: 0.03 },
  aggressive: { speed: 0.18, shape: "square", trail: 0.12 },
  melancholy: { speed: 0.03, shape: "ellipse", trail: 0.02 },
  neutral: { speed: 0.05, shape: "circle", trail: 0.05 }
};

function getStyle() {
  return MOOD_STYLE[mood] || MOOD_STYLE.neutral;
}

// Identity → Color
function identityColor(id) {
  if (!id) return "#27F3FF";
  const hash = [...id].reduce((a, c) => a + c.charCodeAt(0), 0);
  const hue = (hash % 360) + identityGenome.hueShift * 40;
  return `hsl(${hue}, 80%, 60%)`;
}

// Meaning → Motion
function meaningMotion(m) {
  if (!m) return 0.05;
  const hash = [...m].reduce((a, c) => a + c.charCodeAt(0), 0);
  return 0.02 + (hash % 100) / 2000;
}

// Pattern → Distortion
function patternDistortion(p) {
  if (!p) return 0;
  const hash = [...p].reduce((a, c) => a + c.charCodeAt(0), 0);
  return (hash % 40) - 20;
}

// Temporal phase engine
function getTemporalPhases() {
  const now = performance.now();
  return {
    short: Math.sin(now * 0.001),
    mid: Math.sin(now * 0.00005),
    long: Math.sin(now * 0.000001)
  };
}

// Identity genome builder
function buildIdentityGenome(id) {
  if (!id) {
    identityGenome = {
      hueShift: 0,
      chaos: 0.5,
      stability: 0.5,
      symmetry: 0.5,
      particleBias: 0.5,
      attractorScale: 1.0
    };
    return;
  }

  const codes = [...id].map(c => c.charCodeAt(0));
  const sum = codes.reduce((a, c) => a + c, 0);
  const avg = sum / codes.length;
  const varSum = codes.reduce((a, c) => a + (c - avg) * (c - avg), 0);
  const variance = varSum / codes.length;

  const norm = (v, min, max) =>
    (Math.max(min, Math.min(max, v)) - min) / (max - min || 1);

  identityGenome = {
    hueShift: norm(avg, 60, 140),
    chaos: norm(variance, 200, 2000),
    stability: 1 - norm(variance, 200, 2000),
    symmetry: norm(sum % 500, 0, 500),
    particleBias: norm(sum % 300, 0, 300),
    attractorScale: 0.7 + norm(avg, 40, 160) * 0.8
  };
}

// Self‑organizing field (emergent behavior from imprints)
function getSelfOrganizingField() {
  if (memoryImprints.length === 0 && longTermArchive.length === 0) return 0;

  let sum = 0;
  let count = 0;

  for (const im of memoryImprints) {
    sum += (im.distortion || 0) * (im.weight || 1);
    count++;

