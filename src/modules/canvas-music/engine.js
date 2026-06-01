// Canvas Engine — Multi‑Layer Mood Gradient + Shape

import { getMoodFromSong, MOOD_GRADIENTS } from "./mood.js";

let running = false;
let frame = 0;
let lastTime = performance.now();

let identity = null;
let mood = "neutral";

const MOOD_STYLE = {
  energetic: { speed: 0.12, shape: "triangle" },
  romantic: { speed: 0.06, shape: "blob" },
  aggressive: { speed: 0.18, shape: "square" },
  melancholy: { speed: 0.03, shape: "ellipse" },
  neutral: { speed: 0.05, shape: "circle" }
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

  function loop(now) {
    if (!running) return;

    const dt = now - lastTime;
    lastTime = now;
    frame++;

    const { speed, shape } = getStyle();
    const colors = MOOD_GRADIENTS[mood];

    const w = canvas.width;
    const h = canvas.height;

    const t = frame * speed;
    const cx = w / 2;
    const cy = h / 2;
    const r = 40 + Math.sin(t) * 20;

    // 🔵 LAYER 1 — Base Gradient
    const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, w);
    g1.addColorStop(0, colors[0]);
    g1.addColorStop(1, "#05070A");

    ctx.globalAlpha = 0.35;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, w, h);

    // 🟣 LAYER 2 — Mid Gradient (moves with pulse)
    const g2 = ctx.createLinearGradient(
      0,
      Math.sin(t) * 50,
      w,
      h + Math.cos(t) * 50
    );
    g2.addColorStop(0, colors[1]);
    g2.addColorStop(1, "transparent");

    ctx.globalAlpha = 0.25;
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, h);

    // 🔥 LAYER 3 — Shape Layer
    ctx.globalAlpha = 0.9;
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = colors[2];

    ctx.beginPath();

    if (shape === "circle") {
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
    }

    if (shape === "square") {
      ctx.rect(cx - r, cy - r, r * 2, r * 2);
    }

    if (shape === "triangle") {
      ctx.moveTo(cx, cy - r);
      ctx.lineTo(cx - r, cy + r);
      ctx.lineTo(cx + r, cy + r);
      ctx.closePath();
    }

    if (shape === "ellipse") {
      ctx.ellipse(cx, cy, r * 1.4, r * 0.8, 0, 0, Math.PI * 2);
    }

    if (shape === "blob") {
      const wobble = Math.sin(t * 2) * 10;
      ctx.ellipse(cx, cy, r + wobble, r - wobble, 0, 0, Math.PI * 2);
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
}

export function getCanvasMusicDebugState() {
  return { running, frame, identity, mood };
}

