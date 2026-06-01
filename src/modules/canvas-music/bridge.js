// src/modules/canvas-music/bridge.js
// Portal‑OS Canvas Engine — Silent Mode Bridge

import {
  startCanvasMusicEngine,
  stopCanvasMusicEngine,
  getCanvasMusicDebugState,
  setCanvasIdentityState,
  setCanvasMeaningState,
  setCanvasPatternState
} from "./engine.js";

export const CanvasMusicBridge = {
  start: startCanvasMusicEngine,
  stop: stopCanvasMusicEngine,

  // State setters (text‑based, no audio)
  setIdentity: setCanvasIdentityState,
  setMeaning: setCanvasMeaningState,
  setPattern: setCanvasPatternState,

  // Debug info for UI panels
  debug: getCanvasMusicDebugState
};

export default CanvasMusicBridge;
