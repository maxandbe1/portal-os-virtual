// src/storefront/pages/DropPage.jsx

import React, { useEffect, useState } from "react";
import { DropGrid } from "../components/DropGrid.jsx";
import { getActiveDrops, getUpcomingDrops } from "../../publishing/drops/dropEngine.js";

export function DropPage({ onSelectDrop, onBack }) {
  const [active, setActive] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    setActive(getActiveDrops());
    setUpcoming(getUpcomingDrops());
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <button onClick={onBack} style={{ marginBottom: 16 }}>
        ← Back
      </button>

      <h1 style={{ marginBottom: 16 }}>Drops</h1>

      <h3>Live</h3>
      <DropGrid drops={active} onSelect={onSelectDrop} />

      <h3 style={{ marginTop: 24 }}>Upcoming</h3>
      <DropGrid drops={upcoming} onSelect={onSelectDrop} />
    </div>
  );
}
