import { initMemory, getMemory, setMemory } from "./engine.js";

export const MemoryBridge = {
  init: initMemory,
  get: getMemory,
  set: setMemory
};

export default MemoryBridge;
