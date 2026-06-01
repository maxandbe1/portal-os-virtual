import React, { useEffect, useRef } from "react";
import CanvasMusicBridge from "../modules/canvas-music/bridge.js";

export default function CanvasEngineView() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Resize canvas to container
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Start silent canvas engine
    CanvasMusicBridge.start({ canvas });

    return () => CanvasMusicBridge.stop();
  }, []);

  return (
    <div style={{ width: "100%", height: "300px", marginTop: 20 }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          background: "#05070A",
          borderRadius: 8
        }}
      />
    </div>
  );
}
