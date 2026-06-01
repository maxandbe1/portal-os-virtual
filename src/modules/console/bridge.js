import { runCommand } from "./engine.js";

export const ConsoleBridge = {
  exec: runCommand,
  push(msg) {
    window.__consolePush?.({ input: null, output: msg });
  },
  clear() {
    runCommand("clear");
  }
};

export default ConsoleBridge;
