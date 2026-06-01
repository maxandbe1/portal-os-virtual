import React, { useState } from "react";
import CanvasMusicBridge from "../modules/canvas-music/bridge.js";

export default function SongDropdown() {
  const [song, setSong] = useState("");

  const presetSongs = [
    "Blinding Lights – The Weeknd",
    "Bad Habit – Steve Lacy",
    "HUMBLE – Kendrick Lamar",
    "Nights – Frank Ocean",
    "Other (type manually)"
  ];

  function handleSubmit() {
    if (!song) return;

    // Send the selected song into the canvas engine
    CanvasMusicBridge.setIdentity(song);
    CanvasMusicBridge.setMeaning("pending");
    CanvasMusicBridge.setPattern("pending");
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Select a Song</h3>

      <select
        value={song}
        onChange={(e) => setSong(e.target.value)}
        style={{ padding: 8, width: "100%", marginBottom: 12 }}
      >
        <option value="">Choose a song…</option>
        {presetSongs.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {song === "Other (type manually)" && (
        <input
          type="text"
          placeholder="Enter song name"
          onChange={(e) => setSong(e.target.value)}
          style={{ padding: 8, width: "100%", marginBottom: 12 }}
        />
      )}

      <button onClick={handleSubmit} style={{ padding: "8px 16px" }}>
        Send to Canvas
      </button>
    </div>
  );
}
