
// src/modules/canvas-music/engine.js
// Canvas Engine — Mood + Gradients + Trails + Particles + Domain Resonance +
// Identity/Meaning/Pattern Fusion + Multi‑Shape Morphing + Memory Imprinting

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
function getTemporalPhases() {
  const now = performance.now();

  return {
    short: Math.sin(now * 0.001),      // fast (seconds)
    mid: Math.sin(now * 0.00005),      // medium (minutes)
    long: Math.sin(now * 0.000001)     // slow (hours)
  };
}


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
  return 0.02 + (hash % 100) / 2000; // 0.02 → 0.52
}

// Pattern → Distortion
function patternDistortion(p) {
  if (!p) return 0;
  const hash = [...p].reduce((a, c) => a + c.charCodeAt(0), 0);
  return (hash % 40) - 20; // -20 → +20 px
}

// Multi‑shape morphing
function drawMorphingShape(ctx, cx, cy, r, t, baseShape, distortion) {
  ctx.beginPath();

  const m = (Math.sin(t) + 1) / 2; // 0 → 1

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

  // default: circle
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

  particles = createParticles(120, mood);

  function loop(now) {
    if (!running) return;

    const dt = now - lastTime;
    lastTime = now;
    frame++;

    const { speed, shape, trail } = getStyle();
    const particleStyle = MOOD_PARTICLE_STYLE[mood];
    const colors = MOOD_GRADIENTS[mood];
    const domainRes = getDomainResonance();

    const fusionColor = identityColor(fusionIdentity);
    const fusionSpeed = meaningMotion(fusionMeaning);
    const fusionDistort = patternDistortion(fusionPattern);

    const w = canvas.width;
    const h = canvas.height;

    const t = frame * (speed + fusionSpeed) * (1 + domainRes * 0.5);
    const cx = w / 2;
    const cy = h / 2;
    const r = (40 + Math.sin(t) * 20) * (1 + domainRes * 0.3);

    // MOTION TRAILS
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = trail;
    ctx.fillStyle = "#05070A";
    ctx.fillRect(0, 0, w, h);

    // MEMORY IMPRINT LAYER
    for (let imprint of memoryImprints) {
      const age = (performance.now() - imprint.time) / 2000;
      if (age > 1) continue;

      const alpha = imprint.weight * (1 - age);
      const radiusBoost = imprint.domain * 40;

      ctx.globalAlpha = alpha * 0.4;
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

    // BASE GRADIENT (tinted by last memory or fusion)
    let memoryTint = fusionColor;
    if (memoryImprints.length > 0) {
      memoryTint = memoryImprints[memoryImprints.length - 1].color;
    }

    const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, w);
    g1.addColorStop(0, memoryTint);
    g1.addColorStop(1, "#05070A");

    ctx.globalAlpha = 0.35 + domainRes * 0.2;
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, w, h);

    // MID GRADIENT
    const g2 = ctx.createLinearGradient(
      0,
      Math.sin(t + domainRes) * 50,
      w,
      h + Math.cos(t - domainRes) * 50
    );
    g2.addColorStop(0, colors[1]);
    g2.addColorStop(1, "transparent");

    ctx.globalAlpha = 0.25 + domainRes * 0.1;
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, h);

    // PARTICLE FIELD (memory‑boosted drift)
    let memoryDrift = 0;
    for (let imprint of memoryImprints) {
      const age = (performance.now() - imprint.time) / 3000;
      if (age < 1) memoryDrift += imprint.domain * (1 - age) * 0.02;
    }

    const boostedParticleStyle = {
      ...particleStyle,
      drift: particleStyle.drift * (1 + domainRes * 1.5)
    };

    const memoryParticleStyle = {
      ...boostedParticleStyle,
      drift: boostedParticleStyle.drift + memoryDrift
    };

    updateParticles(particles, memoryParticleStyle, dt);

    ctx.globalAlpha = 0.8;
    ctx.fillStyle = fusionColor;

    for (let p of particles) {
      const px = p.x * w;
      const py = p.y * h;

      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // SHAPE LAYER — multi‑shape morphing with domain + pattern distortion
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = fusionColor;

    const distortion = domainRes * 20 + fusionDistort;
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
    memoryCount: memoryImprints.length
  };
}
