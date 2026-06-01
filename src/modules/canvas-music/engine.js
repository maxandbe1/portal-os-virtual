
// Canvas Engine — Mood Reactive Version

import { getMoodFromSong } from "./mood.js";

let running = false;
let frame = 0;
let lastTime = performance.now();

let identity = null; // song
let mood = "neutral";

// Mood → color + pulse speed
const MOOD_STYLE = {
  energetic: { color: "#00E5FF", speed: 0.12 },
  romantic: { color: "#FF7AE5", speed: 0.06 },
  aggressive: { color: "#FF3B30", speed: 0.18 },
  melancholy: { color: "#4B8BFF", speed: 0.03 },
  neutral: { color: "#27F3FF", speed: 0.05 }
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

    const { color, speed } = getStyle();

    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = "#05070A";
    ctx.fillRect(0, 0, w, h);

    const t = frame * speed;
    const cx = w / 2;
    const cy = h / 2;
    const r = 40 + Math.sin(t) * 20;

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);

    // 🔥 Mood‑based color
    ctx.fillStyle = color;
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
