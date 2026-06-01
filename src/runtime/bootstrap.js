import ConsoleBridge from "../modules/console/bridge.js";
import IdentityBridge from "../modules/identity/bridge.js";
import MemoryBridge from "../modules/memory/bridge.js";
import FirstDomainBridge from "../domains/first-domain/bridge.js";

export function bootstrapPortal() {
  try {
    console.log("%cPortal‑OS V1 Booting…", "color:#27F3FF;font-weight:bold;");

    IdentityBridge.init?.();
    MemoryBridge.init?.();
    FirstDomainBridge.init?.();

    ConsoleBridge.push("Portal‑OS Console Loaded");

    console.log("%cPortal‑OS Ready", "color:#00ff88;font-weight:bold;");
  } catch (err) {
    console.error("Portal‑OS bootstrap error:", err);
    ConsoleBridge.push?.("Bootstrap Error: " + err.message);
  }
}
