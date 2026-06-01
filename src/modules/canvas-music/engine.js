// src/modules/canvas-music/engine.js
// Canvas Engine — Mood + Gradients + Trails + Particles + Domain Resonance +
// Identity/Meaning/Pattern Fusion + Multi‑Shape Morphing + Memory Imprinting +
// Temporal Phase Engine (short/mid/long cycles)

import {
  getMoodFromSong,
  MOOD_GRADIENTS,
  MOOD_PARTICLE_STYLE
} from "./mood.js";
import { createParticles, updateParticles } from "./particles.js";
import { getDomainResonance } from "../../domains/first-domain/engine.js";

let running = false;
let frame = 0;
let lastTime = performance.now();

let mood = "neutral";
let particles = [];

// Fusion channels
let fusionIdentity = "";
let fusionMeaning = "";
let fusionPattern = "";

// Memory imprints
let memoryImprints = [];

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
  const hue = hash % 360;
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
    short: Math.sin(now * 0.001),      // seconds
    mid: Math.sin(now * 0.00005),      // minutes
    long: Math.sin(now * 0.000001)     // hours
  };
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

// Memory imprint creation
function addMemoryImprint() {
  const imprint = {
    color: identityColor(fusionIdentity),
    distortion: patternDistortion(fusionPattern),
    meaningSpeed: meaningMotion(fusionMeaning),
    domain: getDomainResonance(),
    time: performance.now(),
    weight: 1
  };

  memoryImprints.push(imprint);
  if (memoryImprints.length > 50) memoryImprints.shift();
}

export function startCanvasMusicEngine({ canvas }) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  running = true;
  frame = 0;
  lastTime = performance.now();

  // Particle count modulated by long‑wave phase
  const phases = getTemporalPhases();
  const baseCount = 120;
  const phaseBoost = Math.floor((phases.long + 1) * 20);
  particles = createParticles(baseCount + phaseBoost, mood);

  function loop(now) {
    if (!running) return;

    const dt = now - lastTime;
    lastTime = now;
    frame++;

    const phases = getTemporalPhases();
    const { speed, shape, trail } = getStyle();
    const particleStyle = MOOD_PARTICLE_STYLE[mood];
    const colors = MOOD_GRADIENTS[mood];
    const domainRes = getDomainResonance();

    const fusionColor = identityColor(fusionIdentity);
    const fusionSpeed = meaningMotion(fusionMeaning);
    const fusionDistort = patternDistortion(fusionPattern);

    const w = canvas.width;
    const h = canvas.height;

    const t =
      frame *
      (speed + fusionSpeed) *
      (1 + domainRes * 0.5) *
      (1 + phases.short * 0.15);

    const cx = w / 2;
    const cy = h / 2;
    const r =
      (40 + Math.sin(t) * 20) *
      (1 + domainRes * 0.3);

    // MOTION TRAILS
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = trail;
    ctx.fillStyle = "#05070A";
    ctx.fillRect(0, 0, w, h);

    // MEMORY IMPRINT LAYER
    for (let imprint of memoryImprints) {
      const age =
        (performance.now() - imprint.time) /
        (2000 + phases.mid * 500);

      if (age > 1) continue
