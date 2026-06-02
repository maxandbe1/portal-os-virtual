// src/licensing/licenseEngine.js

import { getLicenseById } from "./licenseCatalog.js";

export function attachLicenseToProduct(product, licenseId) {
  const license = getLicenseById(licenseId);
  if (!license) throw new Error("Unknown license: " + licenseId);

  return {
    ...product,
    license: {
      id: license.id,
      name: license.name,
      description: license.description
    }
  };
}

// Given an order, derive license grants
export function getOrderLicenses(order) {
  if (!order) return [];

  const grants = [];

  for (const item of order.items) {
    const product = item.product;
    const licenseId = product.license?.id ?? "personal"; // default
    const license = getLicenseById(licenseId);

    if (!license) continue;

    grants.push({
      productId: product.productId,
      title: product.title,
      licenseId: license.id,
      licenseName: license.name,
      terms: license.terms
    });
  }

  return grants;
}
