// src/licensing/LicensingProvider.jsx

import React, { createContext, useContext, useState } from "react";
import { getOrderLicenses } from "./licenseEngine.js";

const LicensingContext = createContext(null);

export function LicensingProvider({ children }) {
  const [licenseGrants, setLicenseGrants] = useState([]);

  function registerOrder(order) {
    const grants = getOrderLicenses(order);
    setLicenseGrants(prev => [...prev, ...grants]);
  }

  const value = {
    licenseGrants,
    registerOrder
  };

  return (
    <LicensingContext.Provider value={value}>
      {children}
    </LicensingContext.Provider>
  );
}

export function useLicensing() {
  const ctx = useContext(LicensingContext);
  if (!ctx) throw new Error("useLicensing must be used within LicensingProvider");
  return ctx;
}
