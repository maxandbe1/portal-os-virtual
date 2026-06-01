// Canvas Engine — Silent Mode with Color Mapping

let running = false;
let frame = 0;
let lastTime = performance.now();

let identity = null;
let meaning = null;
let pattern = null;

// Map songs → colors
const COLOR_MAP = {
  "Blinding Lights – The Weeknd": "#00E5FF",
  "Bad Habit – Steve Lacy": "#FF7AE5",
  "HUMBLE – Kendrick Lamar": "#FF3B30",
  "Nights – Frank Ocean": "#4B8BFF",
  "Other": "#27F3FF"
};

function getColor() {
  if (!identity) return "#27F3FF";
  return COLOR_MAP[identity] || COLOR_MAP["Other"];
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

    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = "#05070A";
    ctx.fillRect(0, 0, w, h);

    const t = frame * 0.05;
    const cx = w / 2;
    const cy = h / 2;
    const r = 40 + Math.sin(t) * 20;

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);

    // 🔥 Color changes based on selected song
    ctx.fillStyle = getColor();
    ctx.fill();

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

export function stopCanvasMusicEngine() {
  running = false;
}

export function getCanvasMusicDebugState() {
  return { running, frame, identity, meaning, pattern };
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

