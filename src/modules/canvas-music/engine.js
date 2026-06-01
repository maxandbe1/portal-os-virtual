// src/modules/canvas-music/engine.js
// Canvas Engine — Mood + Gradients + Trails + Particles + Domain Resonance +
// Identity/Meaning/Pattern Fusion + Multi‑Shape Morphing + Memory Imprinting +
// Temporal Phase Engine + Domain‑to‑Domain Coupling +
// Imprint Decay Physics + Long‑Term Memory Archive + Self‑Organizing Field +
// Attractor Dynamics + Semantic Field Mapping + Identity Genome +
// Consciousness Simulation Layer (self‑referential loops)

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

  const norm = (v, min, max) => (Math.max(min, Math.min(max, v)) - min) / (max - min || 1);

  identityGenome = {
    hueShift: norm(avg, 60, 140),              // color bias
    chaos: norm(variance, 200, 2000),          // attractor chaos
    stability: 1 - norm(variance, 200, 2000),  // decay stability
    symmetry: norm(sum % 500, 0, 500),         // shape symmetry
    particleBias: norm(sum % 300, 0, 300),     // particle distribution
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
  }

  for (const im of longTermArchive) {
    sum += (im.distortion || 0) * (im.weight || 0.3);
    count++;
  }

  if (count === 0) return 0;
  const avg = sum / count;
  return Math.max(-1, Math.min(1, avg / 40));
}

// Multi‑shape morphing
function drawMorphingShape(ctx, cx, cy, r, t, baseShape, distortion) {
  ctx.beginPath();
  const m = (Math.sin(t) + 1) / 2;

  if (baseShape === "triangle") {
    const angle = (Math.PI * 2) / 3;
    for (let i = 0; i < 3; i++) {
      const a = angle * i + t * 0.5;
      const x = cx + Math.cos(a) * (r + distortion * m);
      const y = cy + Math.sin(a) * (r + distortion * m);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    return;
  }

  if (baseShape === "square") {
    const size = r + distortion * m;
    ctx.rect(cx - size, cy - size, size * 2, size * 2);
    return;
  }

  if (baseShape === "ellipse") {
    ctx.ellipse(
      cx,
      cy,
      r * (1.4 + 0.3 * m),
      r * (0.8 + 0.2 * m),
      0,
      0,
      Math.PI * 2
    );
    return;
  }

  if (baseShape === "blob") {
    const wobble = Math.sin(t * 2) * 10 * m;
    ctx.ellipse(cx, cy, r + wobble, r - wobble, 0, 0, Math.PI * 2);
    return;
  }

  ctx.arc(cx, cy, r, 0, Math.PI * 2);
}

// Semantic field mapping (meaning → spatial topology)
function semanticFieldOffset(xNorm, yNorm) {
  if (!fusionMeaning) return { dx: 0, dy: 0 };

  const hash = [...fusionMeaning].reduce((a, c) => a + c.charCodeAt(0), 0);
  const seed = hash * 0.0003;

  const angle = Math.sin(xNorm * 10 + seed) + Math.cos(yNorm * 10 - seed);
  const radius = Math.sin((xNorm + yNorm) * 5 + seed) * 0.5;

  return {
    dx: radius * Math.cos(angle) * identityGenome.particleBias,
    dy: radius * Math.sin(angle) * (1 - identityGenome.particleBias)
  };
}

// Attractor dynamics update (Lorenz‑like, identity‑scaled)
function updateAttractor(dt) {
  const { sigma, rho, beta } = ATTRACTOR_PARAMS;
  const scaleChaos = 0.5 + identityGenome.chaos * 1.5;
  const h = (dt / 1000) * scaleChaos * 0.8;

  let { x, y, z } = attractorState;

  const dx = sigma * (y - x);
  const dy = x * (rho - z) - y;
  const dz = x * y - beta * z;

  x += dx * h;
  y += dy * h;
  z += dz * h;

  attractorState = { x, y, z };
}

// Imprint decay physics + archive
function addMemoryImprint() {
  const domain = getDomainResonance();
  const meaningSpeed = meaningMotion(fusionMeaning);

  const imprint = {
    color: identityColor(fusionIdentity),
    distortion: patternDistortion(fusionPattern),
    meaningSpeed,
    domain,
    time: performance.now(),
    weight: 1,
    decayRate:
      0.6 +
      (1 - domain) * 0.3 +
      (1 - Math.min(meaningSpeed * 10, 1)) * 0.1
  };

  memoryImprints.push(imprint);
  if (memoryImprints.length > 80) memoryImprints.shift();
}

function updateImprintDecay(phases, dcv) {
  const now = performance.now();
  const nextImprints = [];

  for (const imprint of memoryImprints) {
    const baseLifetime = 2200 * imprint.decayRate;
    const phaseFactor = 1 + phases.mid * 0.25;
    const couplingFactor = 1 + dcv * 0.4;
    const genomeStability = 0.7 + identityGenome.stability * 0.6;
    const lifetime = baseLifetime * phaseFactor * couplingFactor * genomeStability;

    const age = (now - imprint.time) / lifetime;

    if (age >= 1) {
      longTermArchive.push({
        color: imprint.color,
        distortion: imprint.distortion,
        weight: imprint.weight * 0.4,
        time: now
      });
      if (longTermArchive.length > 200) longTermArchive.shift();
      continue;
    }

    const remaining = 1 - age;
    imprint.weight = remaining * remaining;
    nextImprints.push(imprint);
  }

  memoryImprints = nextImprints;
}

// Consciousness simulation layer (self‑referential loops)
function updateConsciousness(sof, dcv, domainRes) {
  const deltaField = sof - consciousnessState.lastField;
  const deltaCoupling = dcv - consciousnessState.lastCoupling;
  const deltaRes = domainRes - consciousnessState.lastResonance;

  const magnitude =
    Math.abs(deltaField) * 0.6 +
    Math.abs(deltaCoupling) * 0.3 +
    Math.abs(deltaRes) * 0.4;

  const loopIntensity = Math.max(
    0,
    Math.min(1, consciousnessState.loopIntensity * 0.9 + magnitude * 0.7)
  );

  consciousnessState = {
    lastField: sof,
    lastCoupling: dcv,
    lastResonance: domainRes,
    loopIntensity
  };

  return loopIntensity;
}

export function startCanvasMusicEngine({ canvas }) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  running = true;
  frame = 0;
  lastTime = performance.now();

  const phases = getTemporalPhases();
  const baseCount = 120;
  const phaseBoost = Math.floor((phases.long + 1) * 20);
  particles = createParticles(baseCount + phaseBoost, mood);

  function loop(now) {
    if (!running) return;

    const dt = now - lastTime;
    lastTime = now;
    frame++;

    updateAttractor(dt);

    const phases = getTemporalPhases();
    const dcv = getDomainCouplingVector();
    const sof = getSelfOrganizingField();

    const { speed, shape, trail } = getStyle();
    const particleStyle = MOOD_PARTICLE_STYLE[mood];
    const colors = MOOD_GRADIENTS[mood];
    const domainRes = getDomainResonance();

    const fusionColor = identityColor(fusionIdentity);
    const fusionSpeed = meaningMotion(fusionMeaning);
    const fusionDistort = patternDistortion(fusionPattern);

    const loopIntensity = updateConsciousness(sof, dcv, domainRes);

    const w = canvas.width;
    const h = canvas.height;

    const attractorInfluence =
      (Math.tanh(attractorState.z / 20) || 0) *
      identityGenome.attractorScale;

    const t =
      frame *
      (speed + fusionSpeed) *
      (1 + domainRes * 0.5) *
      (1 + phases.short * 0.15) *
      (1 + dcv * 0.3) *
      (1 + sof * 0.2) *
      (1 + attractorInfluence * 0.25) *
      (1 + loopIntensity * 0.2);

    const cx = w / 2;
    const cy = h / 2;
    const r =
      (40 + Math.sin(t) * 20) *
      (1 + domainRes * 0.3) *
      (1 + Math.abs(sof) * 0.2) *
      (1 + loopIntensity * 0.15);

    updateImprintDecay(phases, dcv);

    // MOTION TRAILS
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = trail;
    ctx.fillStyle = "#05070A";
    ctx.fillRect(0, 0, w, h);

    const nowTime = performance.now();

    // MEMORY IMPRINT LAYER (short‑term)
    for (let imprint of memoryImprints) {
      const alpha = imprint.weight;
      if (alpha <= 0.01) continue;

      const radiusBoost = imprint.domain * 40;

      ctx.globalAlpha = alpha * 0.5;
      ctx.fillStyle = imprint.color;

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        r + imprint.distortion + radiusBoost,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // LONG‑TERM ARCHIVE GHOST LAYER
    for (let imprint of longTermArchive) {
      const age = (nowTime - imprint.time) / 60000;
      if (age > 1.5) continue;

      const alpha = imprint.weight * (1 - Math.min(age, 1));
      if (alpha <= 0.01) continue;

      ctx.globalAlpha = alpha * 0.2;
      ctx.fillStyle = imprint.color;

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        r + imprint.distortion * 0.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // BASE GRADIENT (temporal + self‑organizing + consciousness tint)
    let memoryTint = fusionColor;
    if (phases.mid > 0) {
      memoryTint = `hsla(${(phases.mid * 40) + 200}, 80%, 60%, 1)`;
    }
    if (Math.abs(sof) > 0.2) {
      const shift = sof * 60;
      memoryTint = `hsla(${shift + 220}, 80%, 55%, 1)`;
    }
    if (loopIntensity > 0.3) {
      const shift = loopIntensity * 80;
      memoryTint = `hsla(${shift + 180}, 85%, 58%, 1)`;
    }

    const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, w);
    g1.addColorStop(0, memoryTint);
    g1.addColorStop(1, "#05070A");

    ctx.globalAlpha =
      0.35 +
      domainRes * 0.2 +
      Math.abs(sof) * 0.1 +
      loopIntensity * 0.1;
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, w, h);

    // MID GRADIENT (domain + coupling + field + attractor)
    const g2 = ctx.createLinearGradient(
      0,
      Math.sin(t + domainRes + dcv + sof + attractorState.x * 0.05) * 50,
      w,
      h +
        Math.cos(
          t - domainRes - dcv + sof + attractorState.y * 0.05
        ) *
          50
    );
    g2.addColorStop(0, colors[1]);
    g2.addColorStop(1, "transparent");

    ctx.globalAlpha =
      0.25 +
      domainRes * 0.1 +
      Math.abs(sof) * 0.05 +
      loopIntensity * 0.05;
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, h);

    // PARTICLE FIELD (memory + domain + coupling + field + semantic topology)
    let memoryDrift = 0;
    for (let imprint of memoryImprints) {
      const ageFactor = imprint.weight;
      if (ageFactor > 0) {
        memoryDrift += imprint.domain * ageFactor * 0.02;
      }
    }

    const boostedParticleStyle = {
      ...particleStyle,
      drift: particleStyle.drift * (1 + domainRes * 1.5)
    };

    const memoryParticleStyle = {
      ...boostedParticleStyle,
      drift:
        boostedParticleStyle.drift +
        memoryDrift +
        dcv * 0.05 +
        sof * 0.04 +
        loopIntensity * 0.03
    };

    updateParticles(particles, memoryParticleStyle, dt);

    ctx.globalAlpha = 0.8;
    ctx.fillStyle = fusionColor;

    for (let p of particles) {
      let px = p.x;
      let py = p.y;

      const fieldOffset = semanticFieldOffset(px, py);

      px += fieldOffset.dx * 0.05;
      py += fieldOffset.dy * 0.05;

      px += attractorState.x * 0.0008 * identityGenome.attractorScale;
      py += attractorState.y * 0.0008 * identityGenome.attractorScale;

      const sx = px * w;
      const sy = py * h;

      ctx.beginPath();
      ctx.arc(sx, sy, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // SHAPE LAYER — multi‑shape morphing with domain + pattern + temporal + coupling + field + attractor + consciousness
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = fusionColor;

    const symmetryFactor = 1 + (identityGenome.symmetry - 0.5) * 0.4;

    const distortion =
      (domainRes * 20 +
        fusionDistort +
        phases.short * 10 +
        phases.mid * 5 +
        dcv * 25 +
        sof * 30 +
        attractorInfluence * 35 +
        loopIntensity * 40) *
      symmetryFactor;

    drawMorphingShape(ctx, cx, cy, r, t, shape, distortion);
    ctx.fill();

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

export function stopCanvasMusicEngine() {
  running = false;
}

export function setCanvasIdentityState(v) {
  fusionIdentity = v;
  buildIdentityGenome(v);
  addMemoryImprint();
}

export function setCanvasMeaningState(v) {
  fusionMeaning = v;
  addMemoryImprint();
}

export function setCanvasPatternState(v) {
  fusionPattern = v;
  addMemoryImprint();
}

export function getCanvasMusicDebugState() {
  return {
    running,
    frame,
    identity: fusionIdentity,
    meaning: fusionMeaning,
    pattern: fusionPattern,
    mood,
    memoryCount: memoryImprints.length,
    archiveCount: longTermArchive.length,
    identityGenome,
    attractorState,
    consciousnessState
  };
}

