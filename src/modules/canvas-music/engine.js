// Canvas Engine — Silent Mode (No Audio Required)

let running = false;
let frame = 0;
let lastTime = performance.now();

let identity = null;
let meaning = null;
let pattern = null;

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

    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = "#05070A";
    ctx.fillRect(0, 0, w, h);

    // Simple pulse animation
    const t = frame * 0.05;
    const cx = w / 2;
    const cy = h / 2;
    const r = 40 + Math.sin(t) * 20;

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(120, 200, 255, 0.8)";
    ctx.fill();

    // Expose debug state
    window.__canvasMusicFrame = frame;
    window.__canvasIdentity = identity;
    window.__canvasMeaning = meaning;
    window.__canvasPattern = pattern;

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

export function stopCanvasMusicEngine() {
  running = false;
}

export function getCanvasMusicDebugState() {
  return {
    running,
    frame,
    identity,
    meaning,
    pattern
  };
}

export function setCanvasIdentityState(v) {
  identity = v;
}

export function setCanvasMeaningState(v) {
  meaning = v;
}

export function setCanvasPatternState(v) {
  pattern = v;
}
