// Canvas Engine — Mood + Motion Trails + Particle Field + Domain Resonance

import { getMoodFromSong, MOOD_GRADIENTS, MOOD_PARTICLE_STYLE } from "./mood.js";
import { createParticles, updateParticles } from "./particles.js";
import { getDomainResonance } from "../../domains/first-domain/engine.js";

let running = false;
let frame = 0;
let lastTime = performance.now();

let identity = null;
let mood = "neutral";
let particles = [];

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

export function startCanvasMusicEngine({ canvas }) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  running = true;
  frame = 0;
  lastTime = performance.now();

  particles = createParticles(120, mood);
  function drawMorphingShape(ctx, cx, cy, r, t, baseShape, distortion) {
  ctx.beginPath();

  // Morph factor (0 → 1)
  const m = (Math.sin(t) + 1) / 2;

  // Circle → Triangle
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

  // Circle → Square
  if (baseShape === "square") {
    const size = r + distortion * m;
    ctx.rect(cx - size, cy - size, size * 2, size * 2);
    return;
  }

  // Circle → Ellipse
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

  // Circle → Blob
  if (baseShape === "blob") {
    const wobble = Math.sin(t * 2) * 10 * m;
    ctx.ellipse(cx, cy, r + wobble, r - wobble, 0, 0, Math.PI * 2);
    return;
  }

  // Default: Circle
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
}


  function loop(now) {
    if (!running) return;

    const dt = now - lastTime;
    lastTime = now;
    frame++;

    const { speed, shape, trail } = getStyle();
    const particleStyle = MOOD_PARTICLE_STYLE[mood];
    const colors = MOOD_GRADIENTS[mood];

    const domainRes = getDomainResonance(); // 🔥 Domain resonance

    const w = canvas.width;
    const h = canvas.height;

    const t = frame * speed * (1 + domainRes * 0.5); // domain amplifies pulse
    const cx = w / 2;
    const cy = h / 2;
    const r = (40 + Math.sin(t) * 20) * (1 + domainRes * 0.3); // domain expands shape

    // 🔥 MOTION TRAILS
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = trail;
    ctx.fillStyle = "#05070A";
    ctx.fillRect(0, 0, w, h);

    // 🔵 LAYER 1 — Base Gradient (domain amplifies intensity)
    const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, w);
    g1.addColorStop(0, colors[0]);
    g1.addColorStop(1, "#05070A");

    ctx.globalAlpha = 0.35 + domainRes * 0.2;
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, w, h);

    // 🟣 LAYER 2 — Mid Gradient (domain shifts direction)
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

    // ✨ LAYER 3 — PARTICLE FIELD (domain increases drift)
    const boostedParticleStyle = {
      ...particleStyle,
      drift: particleStyle.drift * (1 + domainRes * 1.5)
    };

    updateParticles(particles, boostedParticleStyle, dt);

    ctx.globalAlpha = 0.8;
    ctx.fillStyle = colors[2];

    for (let p of particles) {
      const px = p.x * w;
      const py = p.y * h;

      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // 🔥 LAYER 4 — Shape Layer (domain distorts shape)
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = colors[2];

    ctx.beginPath();

    const distortion = domainRes * 20;

    if (shape === "circle") ctx.arc(cx, cy, r, 0, Math.PI * 2);

    if (shape === "square")
      ctx.rect(cx - r - distortion, cy - r, (r * 2) + distortion, r * 2);

    if (shape === "triangle") {
      ctx.moveTo(cx, cy - r - distortion);
      ctx.lineTo(cx - r, cy + r);
      ctx.lineTo(cx + r + distortion, cy + r);
      ctx.closePath();
    }

    if (shape === "ellipse")
      ctx.ellipse(cx, cy, r * 1.4 + distortion, r * 0.8, 0, 0, Math.PI * 2);

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

export function setCanvasIdentityState(song) {
  identity = song;
  mood = getMoodFromSong(song);
  particles = createParticles(120, mood);
}

export function getCanvasMusicDebugState() {
  return { running, frame, identity, mood };
}

