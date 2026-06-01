// Canvas Engine — Mood Reactive (Color + Shape + Pulse)

import { getMoodFromSong } from "./mood.js";

let running = false;
let frame = 0;
let lastTime = performance.now();

let identity = null;
let mood = "neutral";

// Mood → color + pulse speed + shape
const MOOD_STYLE = {
  energetic: { color: "#00E5FF", speed: 0.12, shape: "triangle" },
  romantic: { color: "#FF7AE5", speed: 0.06, shape: "blob" },
  aggressive: { color: "#FF3B30", speed: 0.18, shape: "square" },
  melancholy: { color: "#4B8BFF", speed: 0.03, shape: "ellipse" },
  neutral: { color: "#27F3FF", speed: 0.05, shape: "circle" }
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

    const { color, speed, shape } = getStyle();

    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = "#05070A";
    ctx.fillRect(0, 0, w, h);

    const t = frame * speed;
    const cx = w / 2;
    const cy = h / 2;
    const r = 40 + Math.sin(t) * 20;

    ctx.fillStyle = color;

    // 🔥 Shape logic
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

