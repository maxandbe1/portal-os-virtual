import React from "react";
import ConsoleBridge from "../modules/console/bridge.js";
import FirstDomainBridge from "../domains/first-domain/bridge.js";
import CanvasEngineView from "./CanvasEngineView.jsx";

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Portal‑OS V1</h1>
      <p>Virtual Ecosystem — First Domain Activated</p>

      {/* Render the canvas engine here */}
      <CanvasEngineView />

    </div>
  );
}

export default function App() {
  const domain = FirstDomainBridge.state();

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Portal‑OS V1</h1>
      <p>Virtual Ecosystem — First Domain Activated</p>

      <h3>Domain State</h3>
      <pre style={{ background:"#0A0F18", padding:12, borderRadius:8 }}>
        {JSON.stringify(domain, null, 2)}
      </pre>

      <button onClick={() => ConsoleBridge.push("Ping from UI")}>
        Ping Console
      </button>
    </div>
  );
}
