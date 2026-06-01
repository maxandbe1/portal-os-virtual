// src/modules/canvas-music/engine.js
// Canvas Engine — Mood + Gradients + Trails + Particles + Domain Resonance + Identity/Meaning/Pattern Fusion

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

let identity = null;
let mood = "neutral";
let particles = [];

// Fusion channels
let fusionIdentity = "";
let fusionMeaning = "";
let fusionPattern = "";

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
  return 0.02 + (hash % 100) / 2000; // 0.02 → 0.52
}

// Pattern → Distortion
function patternDistortion(p) {
  if (!p) return 0;
  const hash = [...p].reduce((a, c) => a + c.charCodeAt(0), 0);
  return (hash % 40) - 20; // -20 → +20 px
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

    // Fusion values
    const fusionColor = identityColor(fusionIdentity);
    const fusionSpeed = meaningMotion(fusionMeaning);
    const fusionDistort = patternDistortion(fusionPattern);

    const w = canvas.width;
    const h = canvas.height;

    const t = frame * (speed + fusionSpeed) * (1 + domainRes * 0.5);
    const cx = w / 2;
    const cy = h / 2;
    const r =
      (40 + Math.sin(t) * 20) * (1 + domainRes * 0.3);

    // MOTION TRAILS
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = trail;
    ctx.fillStyle = "#05070A";
    ctx.fillRect(0, 0, w, h);

    // LAYER 1 — Base Gradient (tinted by identity, amplified by domain)
    const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, w);
    g1.addColorStop(0, fusionColor);
    g1.addColorStop(1, "#05070A");

    ctx.globalAlpha = 0.35 + domainRes * 0.2;
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, w, h);

    // LAYER 2 — Mid Gradient (direction modulated by domain)
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

    // LAYER 3 — PARTICLE FIELD (domain boosts drift)
    const boostedParticleStyle = {
      ...particleStyle,
      drift: particleStyle.drift * (1 + domainRes * 1.5)
    };

    updateParticles(particles, boostedParticleStyle, dt);

    ctx.globalAlpha = 0.8;
    ctx.fillStyle = fusionColor;

    for (let p of particles) {
      const px = p.x * w;
      const py = p.y * h;

      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // LAYER 4 — Shape Layer (distorted by domain + pattern)
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = fusionColor;

    ctx.beginPath();

    const distortion = domainRes * 20 + fusionDistort;

    if (shape === "circle") {
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
    }

    if (shape === "square") {
      ctx.rect(
        cx - r - distortion,
        cy - r,
        r * 2 + distortion,
        r * 2
      );
    }

    if (shape === "triangle") {
      ctx.moveTo(cx, cy - r - distortion);
      ctx.lineTo(cx - r, cy + r);
      ctx.lineTo(cx + r + distortion, cy + r);
      ctx.closePath();
    }

    if (shape === "ellipse") {
      ctx.ellipse(
        cx,
        cy,
        r * 1.4 + distortion,
        r * 0.8,
        0,
        0,
        Math.PI * 2
      );
    }

    if (shape === "blob") {
      const wobble = Math.sin(t * 2) * 10;
      ctx.ellipse(
        cx,
        cy,
        r + wobble + distortion,
        r - wobble,
        0,
        0,
        Math.PI * 2
      );
    }

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
}

export function setCanvasMeaningState(v) {
  fusionMeaning = v;
}

export function setCanvasPatternState(v) {
  fusionPattern = v;
}

export function getCanvasMusicDebugState() {
  return {
    running,
    frame,
    identity: fusionIdentity,
    meaning: fusionMeaning,
    pattern: fusionPattern,
    mood
  };
}

