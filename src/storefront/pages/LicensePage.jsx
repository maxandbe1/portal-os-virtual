// src/storefront/pages/LicensePage.jsx

import React from "react";
import { useLicensing } from "../../licensing/LicensingProvider.jsx";

export function LicensePage({ onBack }) {
  const { licenseGrants } = useLicensing();

  return (
    <div style={{ padding: 32 }}>
      <button onClick={onBack} style={{ marginBottom: 16 }}>
        ← Back
      </button>

      <h1>Your Licenses</h1>

      {licenseGrants.length === 0 && (
        <div style={{ opacity: 0.7 }}>No licenses yet.</div>
      )}

      {licenseGrants.map((g, idx) => (
        <div
          key={idx}
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            padding: 16,
            marginTop: 12
          }}
        >
          <h3>{g.title}</h3>
          <div style={{ fontSize: 13, opacity: 0.8 }}>
            License: {g.licenseName}
          </div>
          <ul style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
            {g.terms.map(t => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
